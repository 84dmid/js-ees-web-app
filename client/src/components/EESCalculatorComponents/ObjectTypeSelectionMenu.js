import React, { useContext, useEffect } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { AppContext } from '../AppContext.js';

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

const ObjectTypeSelectionMenu = observer(() => {
    const { EESCalculator } = useContext(AppContext);

    const handleChangeObjectType = (isObjectTypeLine) => {
        EESCalculator.clearParams();
        EESCalculator.quantityCalculatorParams = {
            ...EESCalculator.quantityCalculatorParams.isObjectTypeLine,
            isObjectTypeLine,
        };
        EESCalculator.curScenario = '';
    };

    const handleInputChange = (event, field) => {
        const value = +event.target.value;
        if (!isValid[field](value)) return;
        EESCalculator.quantityCalculatorParams = {
            ...EESCalculator.quantityCalculatorParams,
            [field]: value || null,
        };
    };

    const handleKeyDown = (event) => {
        const allowedCharacters = /[0-9]/;
        const isBackspaceOrDelete = event.key === 'Backspace' || event.key === 'Delete';
        if (!allowedCharacters.test(event.key) && !isBackspaceOrDelete) {
            event.preventDefault();
        }
    };

    return (
        <>
            <Form.Group className={'mt-3 mb-2'}>
                <p className="mb-1">
                    Выберите тип объекта, планируемого к строительству на участке:
                </p>
                <div>
                    <Form.Check
                        inline
                        checked={
                            EESCalculator.quantityCalculatorParams.isObjectTypeLine ===
                            false
                        }
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
                        checked={
                            EESCalculator.quantityCalculatorParams.isObjectTypeLine ===
                            true
                        }
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
                    EESCalculator.quantityCalculatorParams.isObjectTypeLine === false
                        ? ''
                        : 'd-none'
                }
            >
                <Form.Group className={'mt-3 mb-2'}>
                    <p className="mb-1">Введите площадь участка изысканий (кв.м):</p>
                    <FloatingLabel
                        controlId="plotAreaInSqM"
                        label={
                            formatNumberWithSpaces(
                                (EESCalculator.quantityCalculatorParams.plotAreaInSqM ||
                                    0) / 10000,
                                4
                            ) + ' га'
                        }
                    >
                        <Form.Control
                            type="number"
                            value={
                                EESCalculator.quantityCalculatorParams.plotAreaInSqM || ''
                            }
                            onChange={(event) =>
                                handleInputChange(event, 'plotAreaInSqM')
                            }
                            onKeyDown={handleKeyDown}
                            required={
                                !EESCalculator.quantityCalculatorParams.isObjectTypeLine
                                    ? true
                                    : false
                            }
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className={'mt-3 mb-2'}>
                    <p className="mb-1">
                        Выберите количество площадок опробования гунтов на 5 га:
                    </p>

                    <Form.Select
                        id="testingSitesNumberPerFiveHa"
                        value={
                            EESCalculator.quantityCalculatorParams
                                .testingSitesNumberPerFiveHa || ''
                        }
                        onChange={(event) =>
                            handleInputChange(event, 'testingSitesNumberPerFiveHa')
                        }
                        required={
                            !EESCalculator.quantityCalculatorParams.isObjectTypeLine
                                ? true
                                : false
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
                    EESCalculator.quantityCalculatorParams.isObjectTypeLine === true
                        ? ''
                        : 'd-none'
                }
            >
                <Form.Group className={'mt-3 mb-2'}>
                    <p className="mb-1">Укажите протяженность трассы изысканий (м):</p>

                    <FloatingLabel
                        controlId="trackLengthInM"
                        label={
                            formatNumberWithSpaces(
                                (EESCalculator.quantityCalculatorParams.trackLengthInM ||
                                    0) / 1000,
                                3
                            ) + ' км'
                        }
                    >
                        <Form.Control
                            type="number"
                            value={
                                EESCalculator.quantityCalculatorParams.trackLengthInM ||
                                ''
                            }
                            onChange={(event) =>
                                handleInputChange(event, 'trackLengthInM')
                            }
                            onKeyDown={handleKeyDown}
                            required={
                                EESCalculator.quantityCalculatorParams.isObjectTypeLine
                                    ? true
                                    : false
                            }
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className={'mt-3 mb-2'}>
                    <p className="mb-1">Укажите ширину трассы изысканий (м):</p>
                    <Form.Control
                        id="trackWidthInM"
                        type="number"
                        value={EESCalculator.quantityCalculatorParams.trackWidthInM || ''}
                        onChange={(event) => handleInputChange(event, 'trackWidthInM')}
                        onKeyDown={handleKeyDown}
                        required={
                            EESCalculator.quantityCalculatorParams.isObjectTypeLine
                                ? true
                                : false
                        }
                    />
                </Form.Group>

                <Form.Group className={'mt-3 mb-2'}>
                    <Form.Label htmlFor="trackAreaInHa" className="mb-1">
                        Расчётная площадь трассы изысканий:
                    </Form.Label>
                    <Form.Control
                        id="trackAreaInHa"
                        disabled
                        type="text"
                        value={
                            formatNumberWithSpaces(
                                (EESCalculator.quantityCalculatorParams.trackLengthInM ||
                                    0) / 1000,
                                3
                            ) +
                            ' км × ' +
                            (EESCalculator.quantityCalculatorParams.trackWidthInM || 0) +
                            ' м = ' +
                            formatNumberWithSpaces(
                                ((EESCalculator.quantityCalculatorParams.trackLengthInM ||
                                    0) *
                                    (EESCalculator.quantityCalculatorParams
                                        .trackWidthInM || 0)) /
                                    10000,
                                4
                            ) +
                            ' га'
                        }
                    />
                </Form.Group>
            </div>
        </>
    );
});

export default ObjectTypeSelectionMenu;
