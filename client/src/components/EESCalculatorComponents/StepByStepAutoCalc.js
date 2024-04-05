import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import ObjectTypeSelectionMenu from './ObjectTypeSelectionMenu.js';
import ScenarioSelectionMenu from './ScenarioSelectionMenu.js';
import { AppContext } from '../AppContext.js';
import basketAPI from '../../http/basketAPI.js';
import { quantityCalculators } from '../../calculators/quantityCalculators.js';
import { fetchVariantsByIds } from '../../http/catalogAPI.js';
import RegionSelectionMenu from './RegionsSelectionMenu.js';
import CalculationInfoShortList from './CalculationInfoShortList.js';

const StepByStepAutoCalc = observer(({ isShow, setIsShow }) => {
    const { EESCalculator, catalog } = useContext(AppContext);
    const [stepNumber, setStepNumber] = useState(1);
    const [isFetching, setIsFetching] = useState(false);

    const calculateEESProject = (scenario) => {
        if (!EESCalculator.isParamsValid) return;
        setIsFetching(true);

        const variantIds = scenario.variantIds;
        fetchVariantsByIds(variantIds)
            .then((data) => {
                const variantsListForBasket = data.map((item) => {
                    const quantity = item.quantityCalculatorName
                        ? quantityCalculators[item.quantityCalculatorName](
                              EESCalculator.quantityCalculatorParams
                          ).number
                        : item.defaultQuantity || 1;
                    return { id: item.id, quantity };
                });
                return variantsListForBasket;
            })
            .catch((error) => console.error(`Fetching variants error: ${error}`))
            .then((variantsListForBasket) => {
                return basketAPI.appendVariantsList({
                    ...EESCalculator.quantityCalculatorParams,
                    regionId: EESCalculator.regionId,
                    variants: variantsListForBasket,
                    calcData: EESCalculator.quantityCalculatorParams,
                });
            })
            .catch((error) =>
                console.error(`Appending in basket variants list error: ${error}`)
            )
            .then((data) => {
                catalog.calcData = data.calcData;
                catalog.projectVariants = data.basketVariants;
                catalog.regionId = data.regionId;
            })
            .then(() => (EESCalculator.curScenario = ''))
            .then(() => setIsFetching(false));
    };

    const handleHide = () => {
        setIsShow(false);
        EESCalculator.quantityCalculatorParams = catalog.calcData;
        EESCalculator.regionId = null;
        setStepNumber(1);
    };

    const getPrevStep = () => {
        setStepNumber((prevStep) => prevStep - 1);
    };

    const handleNextStep = () => {
        if (stepNumber === 2) {
            calculateEESProject([]);
        } else if (stepNumber === 3) {
            calculateEESProject(EESCalculator.curScenario);
        }
        if (!isFetching) {
            setStepNumber((prevStep) => prevStep + 1);
        }
    };

    const getContentByStepNumber = (stepNumber) => {
        switch (stepNumber) {
            case 1:
                return <RegionSelectionMenu isBigMenu={true} />;
            case 2:
                return <ObjectTypeSelectionMenu defaultTestingSitesNumberPerFiveHa={2} />;
            case 3:
                return <ScenarioSelectionMenu />;
            case 4:
                return (
                    <div>
                        <p className="fw-bold mb-1">Результаты расчёта (коротко)</p>

                        <CalculationInfoShortList />

                        <p className="mt-3 mb-2">
                            Для просмотра полного перечня исследований и их обоснований,
                            формирования запроса на коммерческое предложение, формирования
                            коммерческого предложения, технического задания и программы
                            изысканий, ссылки на расчёт перейдите в проект изысканий.
                        </p>
                        <p className="mt-1">
                            Для для редактирования состава работ перейдите в конструктор.
                        </p>
                        {/* <p>
                            На основании результатов расчёта вы можете сформировать
                            техническое задание и запрос коммерческого предложения (КП),
                            запросить КП можно у представленных на сайте подрядчиков, либо
                            получить ссылку на запрос КП и направить её в любую известную
                            вам организацию.
                        </p>
                        <p>
                            Мы рекомендуем запрашивать коммерческие предложения у
                            подрядчиков, осуществляющих деятельность в регионе
                            расположения участка. При необходимости, они смогут
                            скорректировать состав работ с учётом требований местной
                            экспертизы.
                        </p> */}
                    </div>
                );
            default:
                return null;
        }
    };

    const getButtonsByStepNumber = (stepNumber) => {
        switch (stepNumber) {
            case 1:
                return (
                    <>
                        <Button style={{ width: '7em' }} onClick={handleHide}>
                            Выйти{' '}
                        </Button>
                        <Button
                            style={{ width: '7em' }}
                            disabled={!EESCalculator.regionId && stepNumber === 1}
                            onClick={handleNextStep}
                        >
                            Вперёд 🠞
                        </Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <Button style={{ width: '7em' }} onClick={getPrevStep}>
                            🠜 Назад{' '}
                        </Button>
                        <Button
                            style={{ width: '7em' }}
                            disabled={!EESCalculator.isParamsValid}
                            onClick={handleNextStep}
                        >
                            Вперёд 🠞
                        </Button>
                    </>
                );
            case 3:
                return (
                    <>
                        <Button style={{ width: '7em' }} onClick={getPrevStep}>
                            🠜 Назад{' '}
                        </Button>
                        <Button
                            style={{ width: '7em' }}
                            disabled={!EESCalculator.curScenario.id}
                            onClick={handleNextStep}
                        >
                            Вперёд 🠞
                        </Button>
                    </>
                );
            case 4:
                return (
                    <>
                        <Link
                            to="/project"
                            className="btn btn-primary"
                            onClick={() => {
                                EESCalculator.clearParams();
                                EESCalculator.regionId = null;
                            }}
                        >
                            В конструктор
                        </Link>
                        <Link
                            to="/project"
                            className="btn btn-primary"
                            onClick={() => {
                                EESCalculator.clearParams();
                                EESCalculator.regionId = null;
                            }}
                        >
                            В проект изысканий
                        </Link>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Modal
            show={isShow}
            onHide={handleHide}
            size="lg"
            fullscreen="lg-down"
            backdrop="static"
            keyboard={false}
            scrollable={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {stepNumber !== 4 ? (
                        <>Расчёт состава изысканий (шаг {stepNumber} из 3)</>
                    ) : (
                        <>Расчёт завершён</>
                    )}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>{getContentByStepNumber(stepNumber)}</Modal.Body>

            <Modal.Footer
            // className={
            //     stepNumber === 4
            //         ? 'd-flex justify-content-center'
            //         : 'd-flex justify-content-between'
            // }
            >
                {getButtonsByStepNumber(stepNumber)}
            </Modal.Footer>
        </Modal>
    );
});

export default StepByStepAutoCalc;
