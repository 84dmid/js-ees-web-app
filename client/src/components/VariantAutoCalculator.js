import React, { useState, useContext, useEffect } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import { observer } from 'mobx-react-lite';
import basketAPI from '../http/basketAPI.js';
import { fetchSurveyScenario, fetchSurveyScenarios } from '../http/surveyScenarioAPI.js';
import { fetchVariantsByIds } from '../http/catalogAPI.js';
import variantHandlers from '../handlers/variantHandlers.js';

function formatNumberWithSpaces(number, maximumFractionDigits) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: maximumFractionDigits,
    });
}

const convertBasketParamsInParams = (basket) => {
    return {
        isObjectTypeLine: basket.isObjectTypeLine,
        plotAreaInSqM: basket.isObjectTypeLine === false ? basket.lendAreaInSqM : null,
        trackWidthInM: basket.trackWidthInM,
        trackLengthInM: basket.trackLengthInM,
        trackAreaInSqM: basket.isObjectTypeLine === true ? basket.lendAreaInSqM : null,
        testingSitesNumberPerFiveHa: basket.testingSitesNumberPerFiveHa,
    };
};

const convertParamsToCalcParams = (params) => {
    return {
        isObjectTypeLine: params.isObjectTypeLine,
        lendAreaInSqM: params.isObjectTypeLine
            ? params.trackAreaInSqM
            : params.plotAreaInSqM,
        testingSitesNumberPerFiveHa: params.isObjectTypeLine
            ? null
            : params.testingSitesNumberPerFiveHa,
        trackLengthInM: params.isObjectTypeLine ? params.trackLengthInM : null,
        trackWidthInM: params.isObjectTypeLine ? params.trackWidthInM : null,
    };
};

const isParamsValid = (params) => {
    const {
        isObjectTypeLine,
        plotAreaInSqM,
        trackWidthInM,
        trackLengthInM,
        trackAreaInSqM,
        testingSitesNumberPerFiveHa,
    } = params;
    if (
        isObjectTypeLine === false &&
        plotAreaInSqM > 0 &&
        testingSitesNumberPerFiveHa > 0
    ) {
        return true;
    } else if (
        isObjectTypeLine === true &&
        trackAreaInSqM > 0 &&
        trackLengthInM > 0 &&
        trackWidthInM > 0
    ) {
        return true;
    } else {
        return false;
    }
};

const isValid = {
    plotAreaInSqM(value) {
        return value === 0 || /^[1-9][0-9]{0,7}$/.test(value);
    },
    testingSitesNumberPerFiveHa(value) {
        return /^[0-5]$/.test(value);
    },
    trackLengthInM(value) {
        return value === 0 || /^[1-9][0-9]{0,7}$/.test(value);
    },
    trackWidthInM(value) {
        return value === 0 || /^[1-9][0-9]{0,2}$/.test(value);
    },
};

const VariantAutoCalculator = observer(() => {
    const { basket } = useContext(AppContext);

    const [params, setParams] = useState(convertBasketParamsInParams(basket));
    const [surveyScenarios, setSurveyScenarios] = useState([]);
    let surveyScenarioVariantIds = [];

    useEffect(() => {
        if (params.isObjectTypeLine !== null)
            fetchSurveyScenarios({
                isObjectTypeLine: params.isObjectTypeLine,
                isProduction: true,
            })
                .then((data) => {
                    setSurveyScenarios(data);
                })
                .catch((error) =>
                    console.error(`Fetching survey scenarios error: ${error}`)
                );
    }, [params.isObjectTypeLine]);

    const clearBasket = () => {
        basketAPI
            .clear()
            .then((data) => {
                basket.isObjectTypeLine = data.isObjectTypeLine;
                basket.lendAreaInSqM = data.lendAreaInSqM;
                basket.trackWidthInM = data.trackWidthInM;
                basket.trackLengthInM = data.trackLengthInM;
                basket.testingSitesNumberPerFiveHa = data.testingSitesNumberPerFiveHa;
                basket.variants = data.basketVariants;
            })
            .catch((error) => console.error(`Clearing basket error: ${error}`))
            .then(() => {
                setParams(convertBasketParamsInParams(basket));
            });
    };

    const handleChangeSurveyScenario = (event) => {
        const scenarioId = parseInt(event.target.id);
        fetchSurveyScenario(scenarioId)
            .then((data) => (surveyScenarioVariantIds = data.variantIds))
            .catch((error) => console.error(`Fetching survey scenario error: ${error}`));
    };

    const handleInputChange = (event, field) => {
        const value = +event.target.value;
        if (!isValid[field](value)) return;
        if (field === 'trackLengthInM') {
            setParams({
                ...params,
                trackLengthInM: value,
                trackAreaInSqM: value * params.trackWidthInM,
            });
        } else if (field === 'trackWidthInM') {
            setParams({
                ...params,
                trackWidthInM: value,
                trackAreaInSqM: value * params.trackLengthInM,
            });
        } else {
            setParams({
                ...params,
                [field]: value || null,
            });
        }
    };

    const handleKeyDown = (event) => {
        const allowedCharacters = /[0-9]/;
        const isBackspaceOrDelete = event.key === 'Backspace' || event.key === 'Delete';
        if (!allowedCharacters.test(event.key) && !isBackspaceOrDelete) {
            event.preventDefault();
        }
    };

    const handleSubmit = (event, variantIds) => {
        event.preventDefault();
        if (!isParamsValid(params)) return;
        fetchVariantsByIds(variantIds)
            .then((data) => {
                const variantsListForBasket = data.map((item) => {
                    const quantity = item.handler
                        ? variantHandlers[item.handler.name](
                              convertParamsToCalcParams(params)
                          )
                        : 1;
                    return { id: item.id, quantity };
                });
                return variantsListForBasket;
            })
            .catch((error) => console.error(`Fetching variants error: ${error}`))
            .then((variantsListForBasket) => {
                return basketAPI.appendVariantsList({
                    ...convertParamsToCalcParams(params),
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
            });
    };

    const surveyScenariosRadioBoxList = surveyScenarios.map((item) => {
        const label = (
            <>
                {item.name}{' '}
                <sup>
                    <abbr title={item.description}>(?)</abbr>
                </sup>
            </>
        );
        return (
            <Form.Check
                key={item.id + 'scenario'}
                type="radio"
                name="surveyScenario"
                id={item.id + 'scenario'}
                label={label}
                onChange={handleChangeSurveyScenario}
            />
        );
    });

    return (
        <Form
            className="mb-5"
            onSubmit={(event) => handleSubmit(event, surveyScenarioVariantIds)}
        >
            <fieldset>
                <legend>Авторасчёт состава изысканий и объёма исследований</legend>
                <Form.Group>
                    <p className="mb-1">
                        Выберите тип объекта, планируемый к строительству на участке
                        изысканий:
                    </p>
                    <Form.Check
                        checked={params.isObjectTypeLine === false}
                        type="radio"
                        name="objectType"
                        id="notLine"
                        label="Нелинейный объект"
                        onChange={() => {
                            setParams({
                                ...convertBasketParamsInParams(basket),
                                isObjectTypeLine: false,
                            });
                        }}
                    />
                    <Form.Check
                        checked={params.isObjectTypeLine === true}
                        type="radio"
                        name="objectType"
                        id="line"
                        label="Линейный объект"
                        onChange={() => {
                            setParams({
                                ...convertBasketParamsInParams(basket),
                                isObjectTypeLine: true,
                            });
                        }}
                    />
                </Form.Group>

                <div className={params.isObjectTypeLine === false ? '' : 'd-none'}>
                    <Form.Group className={'mt-2 mb-2'}>
                        <p className="mb-0">Введите площадь участка изысканий (кв.м)</p>
                        <FloatingLabel
                            controlId="plotAreaInSqM"
                            label={
                                params.plotAreaInSqM
                                    ? formatNumberWithSpaces(
                                          params.plotAreaInSqM / 10000,
                                          4
                                      ) + ' га'
                                    : ''
                            }
                        >
                            <Form.Control
                                type="number"
                                value={params.plotAreaInSqM || ''}
                                onChange={(event) =>
                                    handleInputChange(event, 'plotAreaInSqM')
                                }
                                onKeyDown={handleKeyDown}
                                required={!params.isObjectTypeLine ? true : false}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className={'mt-2 mb-2'}>
                        <p className="mb-0">
                            Выберите количество площадок опробования гунтов на 5 га
                        </p>

                        <Form.Select
                            id="testingSitesNumberPerFiveHa"
                            value={params.testingSitesNumberPerFiveHa || ''}
                            onChange={(event) =>
                                handleInputChange(event, 'testingSitesNumberPerFiveHa')
                            }
                            required={!params.isObjectTypeLine ? true : false}
                        >
                            <option value=""></option>
                            <option value="1">
                                1 площадка на 5 га (однородный почвенный покров)
                            </option>
                            <option value="2">
                                2 площадки на 5 га (однородный почвенный покров)
                            </option>
                            <option value="3">
                                3 площадки на 5 га (однородный почвенный покров)
                            </option>
                            <option value="4">
                                4 площадки на 5 га (однородный почвенный покров)
                            </option>
                            <option value="5">
                                5 площадок на 5 га (неоднородный почвенный покров)
                            </option>
                        </Form.Select>

                        <Form.Text>
                            * при однородном почвенном покрове рекомендуется установить 2
                            площадки на 5 га
                        </Form.Text>
                    </Form.Group>
                </div>

                <div className={params.isObjectTypeLine === true ? '' : 'd-none'}>
                    <Form.Group className={'mt-2 mb-2'}>
                        <p className="mb-0">Укажите протяженность трассы изысканий (м)</p>

                        <FloatingLabel
                            controlId="trackLengthInM"
                            label={
                                params.trackLengthInM
                                    ? formatNumberWithSpaces(
                                          params.trackLengthInM / 1000,
                                          3
                                      ) + ' км'
                                    : ''
                            }
                        >
                            <Form.Control
                                type="number"
                                value={params.trackLengthInM || ''}
                                onChange={(event) =>
                                    handleInputChange(event, 'trackLengthInM')
                                }
                                onKeyDown={handleKeyDown}
                                required={params.isObjectTypeLine ? true : false}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className={'mt-2 mb-2'}>
                        <p className="mb-0">Укажите ширину трассы изысканий (м)</p>
                        <Form.Control
                            id="trackWidthInM"
                            type="number"
                            value={params.trackWidthInM || ''}
                            onChange={(event) =>
                                handleInputChange(event, 'trackWidthInM')
                            }
                            onKeyDown={handleKeyDown}
                            required={params.isObjectTypeLine ? true : false}
                        />
                    </Form.Group>

                    <Form.Text>
                        Расчётная площадь трассы изысканий -{' '}
                        {formatNumberWithSpaces(params.trackAreaInSqM / 10000, 4)} га
                    </Form.Text>
                </div>

                <div className={params.isObjectTypeLine !== null ? '' : 'd-none'}>
                    <Form.Group className={'mt-2 mb-2'}>
                        <p className="mb-1">
                            Выберите один из базовых вариантов состава изысканий:
                        </p>
                        {surveyScenariosRadioBoxList}
                        <Form.Text>
                            * также состав изысканий можно устанавливать вручную в
                            каталоге
                        </Form.Text>
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="outline-primary"
                        className="w-100 mt-2 mb-2"
                    >
                        Рассчитать объемы исследований
                    </Button>

                    <Button
                        onClick={clearBasket}
                        variant="outline-primary"
                        className="w-100"
                    >
                        Сбросить параметры авторасчёта и очистить корзину
                    </Button>
                </div>
            </fieldset>
        </Form>
    );
});

export default VariantAutoCalculator;
