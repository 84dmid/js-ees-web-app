import React, { useContext, useState } from 'react';
import { Form, Modal, Row, Col, Pagination, Button } from 'react-bootstrap';

import regions from '../initData/regions';
// import VariantAutoCalculator from './VariantAutoCalculator';
import ObjectTypeSelectionMenu from './EESCalculatorComponents/ObjectTypeSelectionMenu';
import ScenarioSelectionMenu from './EESCalculatorComponents/ScenarioSelectionMenu';
import { observer } from 'mobx-react-lite';
import { AppContext } from './AppContext';
import { isEESCalculatorStoreParamsValid } from './EESCalculatorComponents/isEESCalculatorStoreParamsValid';
import basketAPI from '../http/basketAPI';
import { quantityCalculators } from '../calculators/quantityCalculators';
import { convertEESCalculatorStoreParamsToQuantityCalculatorParams } from './EESCalculatorComponents/EESCalculatorConverters';
import { fetchVariantsByIds } from '../http/catalogAPI';
import { Link } from 'react-router-dom';

const initCalcParams = {
    regionId: null,
    regionName: null,
};

const StepByStepAutoCalc = observer(({ isShow, setIsShow }) => {
    const { EESCalculator, basket } = useContext(AppContext);
    const [stepNumber, setStepNumber] = useState(1);
    const [calcParams, setCalcParams] = useState(initCalcParams);
    const [activeChar, setActiveChar] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const handleChangeRegion = (id, name) => {
        setCalcParams((prevParams) => ({
            ...prevParams,
            regionId: id,
            regionName: name,
        }));
        setActiveChar(name.charAt().toUpperCase());
    };

    const getRegionsListMenu = (regions) => {
        const regionsList = [];
        const productionRegions = regions.filter(
            (region) => region.isProduction === true
        );
        const firstChars = new Set();
        productionRegions.forEach((region) => {
            firstChars.add(region.name.charAt().toUpperCase());
        });
        const sortedFirstChars = Array.from(firstChars).sort();
        const paginationList = sortedFirstChars.map((char) => (
            <Pagination.Item
                key={char + 'pagination'}
                active={calcParams.regionName?.charAt() === char}
                onClick={() => setActiveChar(char)}
            >
                {char}
            </Pagination.Item>
        ));

        regionsList.push(
            <Pagination size="sm" key="pagination" className="d-flex flex-wrap ">
                {paginationList}
            </Pagination>
        );
        regionsList.push(
            <p key="regionHeader" className="mb-3">
                Выберите регион расположения участка изысканий:
            </p>
        );

        (activeChar ? [activeChar] : sortedFirstChars).forEach((char) => {
            const regionsGroup = [];
            regionsGroup.push(
                <p style={{ fontSize: '1.1em' }} className="mt-3 mb-2" key={char}>
                    <b>{char}</b>
                </p>
            );
            productionRegions
                .filter((region) => region.name.charAt().toUpperCase() === char)
                .forEach((region) => {
                    regionsGroup.push(
                        <Form.Check
                            type="radio"
                            key={region.id}
                            id={region.id}
                            label={region.name}
                            checked={region.id === calcParams.regionId}
                            onChange={() => handleChangeRegion(region.id, region.name)}
                        />
                    );
                });
            regionsList.push(<div key={char + 'regionGroup'}>{regionsGroup}</div>);
        });
        return regionsList;
    };

    const handleHide = () => {
        setIsShow(false);
        setCalcParams(initCalcParams);
        setActiveChar('');
        setStepNumber(1);
    };

    const calculateEESComposition = (scenario, params) => {
        if (!isEESCalculatorStoreParamsValid(params)) return;
        const variantIds = scenario.variantIds;
        fetchVariantsByIds(variantIds)
            .then((data) => {
                const variantsListForBasket = data.map((item) => {
                    const quantity = item.quantityCalculatorName
                        ? quantityCalculators[item.quantityCalculatorName](
                              convertEESCalculatorStoreParamsToQuantityCalculatorParams(
                                  params
                              )
                          )
                        : item.defaultQuantity || 1;
                    return { id: item.id, quantity };
                });
                return variantsListForBasket;
            })
            .catch((error) => console.error(`Fetching variants error: ${error}`))
            .then((variantsListForBasket) => {
                return basketAPI.appendVariantsList({
                    ...convertEESCalculatorStoreParamsToQuantityCalculatorParams(params),
                    variants: variantsListForBasket,
                });
            })
            .catch((error) =>
                console.error(`Appending in basket variants list error: ${error}`)
            )
            .then((data) => {
                basket.isObjectTypeLine = data.isObjectTypeLine;
                basket.lendAreaInSqM = data.lendAreaInSqM;
                basket.trackWidthInM = data.trackWidthInM;
                basket.trackLengthInM = data.trackLengthInM;
                basket.testingSitesNumberPerFiveHa = data.testingSitesNumberPerFiveHa;
                basket.variants = data.basketVariants;
            })
            .then(() => (EESCalculator.curScenario = ''))
            .then(() => setIsFetching(false));
    };

    const getNextStep = async () => {
        if (stepNumber === 2) {
            setIsFetching(true);
            calculateEESComposition([], EESCalculator.params);
        } else if (stepNumber === 3) {
            setIsFetching(true);
            calculateEESComposition(EESCalculator.curScenario, EESCalculator.params);
        }
        console.log(isFetching);
        if (!isFetching) {
            setStepNumber((prevStep) => prevStep + 1);
        }
    };

    const getButtons = () => {
        if (stepNumber !== 4) {
            return (
                <>
                    {stepNumber > 1 ? (
                        <Button style={{ width: '7em' }} onClick={getPrevStep}>
                            🠜 Назад{' '}
                        </Button>
                    ) : (
                        <Button style={{ width: '7em' }} onClick={handleHide}>
                            Выйти{' '}
                        </Button>
                    )}

                    <Button
                        style={{ width: '7em' }}
                        disabled={
                            (!calcParams.regionId && stepNumber === 1) ||
                            (!isEESCalculatorStoreParamsValid(EESCalculator.params) &&
                                stepNumber === 2)
                        }
                        onClick={getNextStep}
                    >
                        Вперёд 🠞
                    </Button>
                </>
            );
        } else {
            return (
                <Link to="/basket" className="btn btn-primary btn-lg">
                    Перейти в проект изысканий
                </Link>
            );
        }
    };

    const getPrevStep = () => {
        setStepNumber((prevStep) => prevStep - 1);
    };

    return (
        <Modal
            dialogClassName="modalHeight"
            show={isShow}
            onHide={handleHide}
            size="lg"
            fullscreen="sm-down"
            backdrop="static"
            keyboard={false}
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
            <Modal.Body>
                {stepNumber === 1 && getRegionsListMenu(regions)}

                {stepNumber === 2 && (
                    <ObjectTypeSelectionMenu defaultTestingSitesNumberPerFiveHa={2} />
                )}

                {stepNumber === 3 && <ScenarioSelectionMenu />}

                {stepNumber === 4 && (
                    <div>
                        <p>
                            Поздравляем, вы завершили расчёт! Если вы проектируете типовой
                            объект, то полученный состав работ в большинстве случаев
                            должен успешно пройти экспертизу. На основании результатов
                            расчёта, на вкладке <Link>проект изысканий</Link>, вы можете
                            сформировать подробный запрос на коммерческое предложение и
                            направить его исполнителям, в том числе, не зарегистрированным
                            на данном сайте.
                        </p>
                        <p>
                            Документы, нормирующие состав изысканий, достаточно
                            противоречивы, требования экспертов могут разниться от региона
                            к региону, особенно это касается исследований грунтов.
                            Вследствие этого, команда сайта настоятельно рекомендует
                            запрашивать коммерческие предложения у подрядчиков, работающих
                            в регионе расположения участка изысканий. Они, на основании
                            своего опыта работы с местной экспертизой, при необходимости
                            смогут скорректировать состав работ.
                        </p>
                        <p>
                            Корректировать состав работ можно в{' '}
                            <Link> конструкторе изысканий</Link>.
                        </p>
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer
                className={
                    stepNumber === 4
                        ? 'd-flex justify-content-center'
                        : 'd-flex justify-content-between'
                }
            >
                {getButtons()}
            </Modal.Footer>
        </Modal>
    );
});

export default StepByStepAutoCalc;
