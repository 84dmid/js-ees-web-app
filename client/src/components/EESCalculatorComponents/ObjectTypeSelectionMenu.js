import React, { useContext, useEffect } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { AppContext } from '../AppContext.js';
import { convertBasketParamsToEESCalculatorStoreParams } from './EESCalculatorConverters.js';
import { fetchScenarios } from '../../http/scenarioAPI.js';

function formatNumberWithSpaces(number, maximumFractionDigits) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: maximumFractionDigits,
    });
}

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

const ObjectTypeSelectionMenu = observer(
    ({ defaultTestingSitesNumberPerFiveHa = undefined }) => {
        const { basket, EESCalculator } = useContext(AppContext);

        useEffect(() => {
            if (defaultTestingSitesNumberPerFiveHa) {
                const newBasket = {
                    ...convertBasketParamsToEESCalculatorStoreParams(basket),
                    testingSitesNumberPerFiveHa: defaultTestingSitesNumberPerFiveHa,
                };
                EESCalculator.params = newBasket;
            } else {
                EESCalculator.params =
                    convertBasketParamsToEESCalculatorStoreParams(basket);
            }
            if (EESCalculator.params.isObjectTypeLine !== null) {
                fetchScenarios({
                    isObjectTypeLine: EESCalculator.params.isObjectTypeLine,
                    isProduction: true,
                })
                    .then((data) => {
                        EESCalculator.scenarios = data;
                    })
                    .catch((error) =>
                        console.error(`Fetching scenarios error: ${error}`)
                    );
            }
        }, []);

        const handleInputChange = (event, field) => {
            const value = +event.target.value;
            if (!isValid[field](value)) return;
            if (field === 'trackLengthInM') {
                EESCalculator.params = {
                    ...EESCalculator.params,
                    trackLengthInM: value,
                    trackAreaInSqM: value * EESCalculator.params.trackWidthInM,
                };
            } else if (field === 'trackWidthInM') {
                EESCalculator.params = {
                    ...EESCalculator.params,
                    trackWidthInM: value,
                    trackAreaInSqM: value * EESCalculator.params.trackLengthInM,
                };
            } else {
                EESCalculator.params = {
                    ...EESCalculator.params,
                    [field]: value || null,
                };
            }
        };

        const handleKeyDown = (event) => {
            const allowedCharacters = /[0-9]/;
            const isBackspaceOrDelete =
                event.key === 'Backspace' || event.key === 'Delete';
            if (!allowedCharacters.test(event.key) && !isBackspaceOrDelete) {
                event.preventDefault();
            }
        };

        const handleChangeObjectType = (isObjectTypeLine) => {
            if (defaultTestingSitesNumberPerFiveHa) {
                const newBasket = {
                    ...convertBasketParamsToEESCalculatorStoreParams(basket),
                    testingSitesNumberPerFiveHa: defaultTestingSitesNumberPerFiveHa,
                };
                EESCalculator.params = {
                    ...newBasket,
                    isObjectTypeLine,
                };
            } else {
                EESCalculator.params = {
                    ...convertBasketParamsToEESCalculatorStoreParams(basket),
                    isObjectTypeLine,
                };
            }
            EESCalculator.curScenario = '';
            fetchScenarios({
                isObjectTypeLine: isObjectTypeLine,
                isProduction: true,
            })
                .then((data) => {
                    EESCalculator.scenarios = data;
                })
                .catch((error) => console.error(`Fetching scenarios error: ${error}`));
        };

        return (
            <>
                <Form.Group className={'mt-3 mb-2'}>
                    <p className="mb-1">
                        Выберите тип объекта, планируемый к строительству на участке:
                    </p>
                    <div>
                        <Form.Check
                            inline
                            checked={EESCalculator.params.isObjectTypeLine === false}
                            type="radio"
                            name="objectType"
                            id="notLine"
                            label="Нелинейный объект"
                            onChange={() => handleChangeObjectType(false)}
                        />
                        <Button
                            size="sm"
                            variant="outline-secondary"
                            className="pt-0 pb-0 mb-1"
                        >
                            ?
                        </Button>
                    </div>
                    <div>
                        <Form.Check
                            inline
                            checked={EESCalculator.params.isObjectTypeLine === true}
                            type="radio"
                            name="objectType"
                            id="line"
                            label="Линейный объект"
                            onChange={() => handleChangeObjectType(true)}
                        />
                        <Button
                            size="sm"
                            variant="outline-secondary"
                            className="pt-0 pb-0 mb-1"
                        >
                            ?
                        </Button>
                    </div>
                </Form.Group>

                <div
                    className={
                        EESCalculator.params.isObjectTypeLine === false ? '' : 'd-none'
                    }
                >
                    <Form.Group className={'mt-3 mb-2'}>
                        <p className="mb-1">Введите площадь участка изысканий (кв.м):</p>
                        <FloatingLabel
                            controlId="plotAreaInSqM"
                            label={
                                // EESCalculator.params.plotAreaInSqM
                                //     ?
                                formatNumberWithSpaces(
                                    EESCalculator.params.plotAreaInSqM / 10000,
                                    4
                                ) + ' га'
                                // : 0 + ' га'
                            }
                        >
                            <Form.Control
                                type="number"
                                value={EESCalculator.params.plotAreaInSqM || ''}
                                onChange={(event) =>
                                    handleInputChange(event, 'plotAreaInSqM')
                                }
                                onKeyDown={handleKeyDown}
                                required={
                                    !EESCalculator.params.isObjectTypeLine ? true : false
                                }
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                        style={{
                            display: !defaultTestingSitesNumberPerFiveHa ? true : 'none',
                        }}
                        className={'mt-3 mb-2'}
                    >
                        <p className="mb-1">
                            Выберите количество площадок опробования гунтов на 5 га:
                        </p>

                        <Form.Select
                            id="testingSitesNumberPerFiveHa"
                            value={EESCalculator.params.testingSitesNumberPerFiveHa || ''}
                            onChange={(event) =>
                                handleInputChange(event, 'testingSitesNumberPerFiveHa')
                            }
                            required={
                                !EESCalculator.params.isObjectTypeLine ? true : false
                            }
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

                <div
                    className={
                        EESCalculator.params.isObjectTypeLine === true ? '' : 'd-none'
                    }
                >
                    <Form.Group className={'mt-3 mb-2'}>
                        <p className="mb-1">
                            Укажите протяженность трассы изысканий (м):
                        </p>

                        <FloatingLabel
                            controlId="trackLengthInM"
                            label={
                                // EESCalculator.params.trackLengthInM
                                //     ?
                                formatNumberWithSpaces(
                                    EESCalculator.params.trackLengthInM / 1000,
                                    3
                                ) + ' км'
                                // : 0 + ' км'
                            }
                        >
                            <Form.Control
                                type="number"
                                value={EESCalculator.params.trackLengthInM || ''}
                                onChange={(event) =>
                                    handleInputChange(event, 'trackLengthInM')
                                }
                                onKeyDown={handleKeyDown}
                                required={
                                    EESCalculator.params.isObjectTypeLine ? true : false
                                }
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className={'mt-3 mb-2'}>
                        <p className="mb-1">Укажите ширину трассы изысканий (м):</p>
                        <Form.Control
                            id="trackWidthInM"
                            type="number"
                            value={EESCalculator.params.trackWidthInM || ''}
                            onChange={(event) =>
                                handleInputChange(event, 'trackWidthInM')
                            }
                            onKeyDown={handleKeyDown}
                            required={
                                EESCalculator.params.isObjectTypeLine ? true : false
                            }
                        />
                    </Form.Group>

                    <Form.Group className={'mt-3 mb-2'}>
                        <p className="mb-1">Расчётная площадь трассы изысканий:</p>
                        <FloatingLabel
                            controlId="trackAreaInHa"
                            label={
                                formatNumberWithSpaces(
                                    EESCalculator.params.trackLengthInM / 1000,
                                    3
                                ) +
                                ' км × ' +
                                (EESCalculator.params.trackWidthInM || 0) +
                                ' м = ' +
                                formatNumberWithSpaces(
                                    EESCalculator.params.trackAreaInSqM / 10000,
                                    4
                                ) +
                                ' га'
                            }
                        >
                            <Form.Control
                                disabled
                                type="text"
                                value={
                                    formatNumberWithSpaces(
                                        EESCalculator.params.trackAreaInSqM / 10000,
                                        4
                                    ) + ' га'
                                }
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Text></Form.Text>
                </div>
            </>
        );
    }
);

export default ObjectTypeSelectionMenu;
