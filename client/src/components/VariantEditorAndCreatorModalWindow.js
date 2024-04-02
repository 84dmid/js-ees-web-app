import React, { useEffect, useState, useRef } from 'react';

import {
    Modal,
    Button,
    ButtonGroup,
    Form,
    FloatingLabel,
    Row,
    Col,
} from 'react-bootstrap';

import {
    fetchVariant,
    updateVariant,
    fetchCategories,
    fetchSubcategories,
    fetchSurveys,
    createVariant,
} from '../http/catalogAPI.js';
import { getQuantityCalculators } from '../calculators/quantityCalculators.js';

const isValid = {
    description(value) {
        if (value === null) return false;
        return value?.trim() !== '';
    },
    unit(value) {
        if (value === null) return false;
        return value?.trim() !== '';
    },
    defaultQuantity(value) {
        return value === null || /^[0-9]*\.?[0-9]+$/.test(value);
    },
    price(value) {
        return /^[0-9]+$/.test(value);
    },
    normDoc(value) {
        return true;
    },
    justification(value) {
        return true;
    },
    properties(value) {
        return true;
    },
    quantityCalculatorName() {
        return true;
    },
};

const defaultValid = {
    description: null,
    unit: null,
    price: null,
};

const defaultVariant = {
    isObjectTypeLine: null,
    description: '',
    unit: null,
    price: null,
    dynamicPriceIdAndLevel: null,

    justification: '',
};

const VariantEditorAndCreatorModalWindow = ({
    id,
    show,
    setShow,
    surveyId,
    surveyName,
    setCatalogEditingToggle,
    isEditorWindow,
}) => {
    const [variant, setVariant] = useState({});
    const [variantsListForDynamicPriceCalc, setVariantsListForDynamicPriceCalc] =
        useState(null);
    const [fetching, setFetching] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [valid, setValid] = useState(defaultValid);
    const [isEditor, setIsEditor] = useState(isEditorWindow);
    const tempVariant = useRef({});

    useEffect(() => {
        if (isEditor) {
            fetchVariant(id || variant.id)
                .then((data) => {
                    console.log(data);
                    setVariant(data);
                })
                .catch((error) => console.error(`Variant fetching error: ${error}`))
                .finally(() => setFetching(false));
        } else {
            setVariant({ surveyId, ...defaultVariant });
            setValid(defaultValid);
            setIsEditing(true);
            setFetching(false);
        }
        // eslint-disable-next-line
    }, [isEditing]);

    const getVariantsListByLevelName = async (levelName) => {
        try {
            let list = {
                category: await fetchCategories(),
                subcategory: await fetchSubcategories(),
                survey: await fetchSurveys(),
            };
            return list[levelName].map((item) => {
                return (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                );
            });
        } catch (error) {
            console.error(`${levelName}(-s) fetching error: ${error}`);
        }
    };

    useEffect(() => {
        if (variant.priceAndQuantityCalcData) {
            const levelName = variant.priceAndQuantityCalcData.levelName;

            getVariantsListByLevelName(levelName)
                .then((data) => {
                    setVariantsListForDynamicPriceCalc(data);
                })
                .catch((error) =>
                    console.error(`${levelName}(-s) fetching error: ${error}`)
                );
        }
    }, [variant.priceAndQuantityCalcData]);

    if (fetching) {
        return null;
    }

    // const handleChangeLevelNameForDynamicPriceCalc = (event) => {
    //     if (event.target.id !== 'notSelected') {
    //         setVariant((prevVariant) => ({
    //             ...prevVariant,
    //             dynamicPriceIdAndLevel: event.target.id + '.',
    //         }));
    //     } else {
    //         setVariant((prevVariant) => ({
    //             ...prevVariant,
    //             dynamicPriceIdAndLevel: null,
    //         }));
    //         setVariantsListForDynamicPriceCalc('');
    //     }
    // };
    const handleChangeLevelNameForDynamicPriceCalc = (event) => {
        if (event.target.id !== 'notSelected') {
            console.log(event.target.id);
            setVariant((prevVariant) => ({
                ...prevVariant,
                priceAndQuantityCalcData: {
                    levelName: event.target.id,
                },
            }));
        } else {
            setVariant((prevVariant) => ({
                ...prevVariant,
                priceAndQuantityCalcData: null,
            }));
            setVariantsListForDynamicPriceCalc('');
        }
    };

    const handleChangeLevelIdForDynamicPriceCalc = (event) => {
        if (variant.priceAndQuantityCalcData === null) return;
        setVariant((prevVariant) => ({
            ...prevVariant,
            priceAndQuantityCalcData: {
                levelName: prevVariant.priceAndQuantityCalcData.levelName,
                levelId: event.target.value,
            },
        }));
    };

    const handleChangeLevelPriceShareForDynamicPriceCalc = (event) => {
        if (variant.priceAndQuantityCalcData === null) return;
        setVariant((prevVariant) => ({
            ...prevVariant,
            priceAndQuantityCalcData: {
                levelName: prevVariant.priceAndQuantityCalcData.levelName,
                levelId: prevVariant.priceAndQuantityCalcData.levelId,
                priceShare: event.target.value,
            },
        }));
    };

    const handleFieldChange = (field, value) => {
        let isObjectTypeLine = variant.isObjectTypeLine;
        if (field === 'quantityCalculatorName') {
            if (value === '' || value === null) return;
            const calculatorIsObjectTypeLine = getQuantityCalculators().find(
                (item) => item.calcName === value
            ).isObjectTypeLine;
            if (calculatorIsObjectTypeLine !== isObjectTypeLine) {
                isObjectTypeLine = calculatorIsObjectTypeLine;
            }
        }
        setVariant((prevVariant) => ({
            ...prevVariant,
            [field]: value !== '' ? value : null,
            isObjectTypeLine,
        }));
        setValid((prevValid) => ({
            ...prevValid,
            [field]: isValid[field](value !== '' ? value : null),
        }));
    };

    const handleFieldInput = (field, value) => {
        tempVariant[field] = value;
        setValid((prevValid) => ({ ...prevValid, [field]: isValid[field](value) }));
    };

    const handleEditClick = () => {
        if (isEditing) {
            setValid(defaultValid);
        } else {
            setValid({
                description: isValid.description(variant.description),
                unit: isValid.unit(variant.unit),
                price: isValid.price(variant.price),
                defaultQuantity: isValid.defaultQuantity(variant.defaultQuantity),
            });
        }
        setIsEditing((prev) => !prev);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        for (let value of Object.values(valid)) {
            if (!value) return;
        }
        if (isEditor) {
            updateVariant(variant.id, { ...variant, ...tempVariant })
                .catch((error) => console.error(`Variant updating error: ${error}`))
                .finally(() => {
                    setValid(defaultValid);
                    setIsEditing(false);
                });
        } else {
            createVariant({ ...variant, ...tempVariant })
                .then((data) => {
                    setVariant(data);
                    setIsEditing(false);
                    setIsEditor(true);
                    setValid(defaultValid);
                })
                .catch((error) => console.error(`Variant creating error: ${error}`));
        }
    };

    const changeObjectTypeLine = (isObjectTypeLine) => {
        let quantityCalculatorName = variant.quantityCalculatorName;
        if (variant.quantityCalculatorName) {
            const calculatorIsObjectTypeLine = getQuantityCalculators().find(
                (item) => item.calcName === variant.quantityCalculatorName
            ).isObjectTypeLine;
            if (calculatorIsObjectTypeLine !== isObjectTypeLine) {
                quantityCalculatorName = null;
            }
        }
        setVariant((prevVariant) => ({
            ...prevVariant,
            isObjectTypeLine,
            quantityCalculatorName,
        }));
    };

    const quantityCalculatorsList = getQuantityCalculators()
        .filter((item) => item.isObjectTypeLine === variant.isObjectTypeLine)
        .map((item) => (
            <option key={item.calcName} value={item.calcName}>
                {item.title}
            </option>
        ));

    const handleHide = () => {
        setShow(false);
        setValid(defaultValid);
        setCatalogEditingToggle((prevToggle) => !prevToggle);
    };

    const getButtonBloc = () => {
        if (isEditing && !isEditor) {
            return (
                <Button
                    className="w-100"
                    variant="outline-primary"
                    onClick={handleSubmit}
                >
                    Создать вариант
                </Button>
            );
        } else if (isEditing) {
            return (
                <ButtonGroup className="w-100">
                    <Button
                        className="w-50"
                        variant="outline-primary"
                        onClick={handleSubmit}
                    >
                        💾 Сохранить изменения
                    </Button>
                    <Button
                        className="w-50"
                        variant="outline-primary"
                        onClick={handleEditClick}
                    >
                        ✖️ Отменить изменения
                    </Button>
                </ButtonGroup>
            );
        } else {
            return (
                <Button
                    className="w-100"
                    variant="outline-primary"
                    onClick={handleEditClick}
                >
                    ✏️ Редактировать вариант
                </Button>
            );
        }
    };

    return (
        <Modal size="lg" fullscreen="lg-down" show={show} onHide={handleHide}>
            <Modal.Header closeButton className="pb-1">
                <Modal.Title>{surveyName}</Modal.Title>
            </Modal.Header>
            <Modal.Header className="pb-1 pt-1">{getButtonBloc()}</Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="mb-3">
                        <p className="mb-2">
                            Наименование варианта расчёта количества единиц измерения{' '}
                            <span className="text-danger">*</span>
                        </p>
                        <div
                            spellCheck={true}
                            className={
                                isEditing && valid.description !== null
                                    ? valid.description
                                        ? 'form-control is-valid'
                                        : 'form-control is-invalid'
                                    : 'form-control'
                            }
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            disabled={isEditing}
                            style={
                                isEditing
                                    ? {}
                                    : { background: '#E9ECEF', minHeight: '2em' }
                            }
                            dangerouslySetInnerHTML={{
                                __html: variant.description?.replace(/\n/g, '<br>'),
                            }}
                            onInput={(event) => {
                                handleFieldInput(
                                    'description',
                                    event.currentTarget.innerText
                                );
                            }}
                        />
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="unit">
                            Единица измерения <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            disabled={!isEditing}
                            id="unit"
                            type="text"
                            onChange={(e) => handleFieldChange('unit', e.target.value)}
                            value={variant.unit || ''}
                            isValid={valid.unit === true}
                            isInvalid={valid.unit === false}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2 mt-3 border rounded">
                        <Form.Label htmlFor="dataForDynamicPriceCalc">
                            Данные для динамического определения цены единицы измерения и
                            дефолтного значения количества
                        </Form.Label>
                        <Form.Group as={Row} className="mb-2">
                            <Col>
                                <Form.Check
                                    disabled={!isEditing}
                                    inline
                                    label="Не выбрано"
                                    id="notSelected"
                                    name="levelName"
                                    type="checkbox"
                                    checked={variant.priceAndQuantityCalcData === null}
                                    onChange={handleChangeLevelNameForDynamicPriceCalc}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    disabled={!isEditing}
                                    label="Категория"
                                    id="category"
                                    name="levelName"
                                    type="checkbox"
                                    checked={
                                        variant.priceAndQuantityCalcData !== null &&
                                        variant.priceAndQuantityCalcData.levelName ===
                                            'category'
                                    }
                                    onChange={handleChangeLevelNameForDynamicPriceCalc}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    disabled={!isEditing}
                                    label="Подкатегория"
                                    id="subcategory"
                                    name="levelName"
                                    type="checkbox"
                                    checked={
                                        variant.priceAndQuantityCalcData !== null &&
                                        variant.priceAndQuantityCalcData.levelName ===
                                            'subcategory'
                                    }
                                    onChange={handleChangeLevelNameForDynamicPriceCalc}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    disabled={!isEditing}
                                    label="Исследование"
                                    id="survey"
                                    name="levelName"
                                    type="checkbox"
                                    checked={
                                        variant.priceAndQuantityCalcData !== null &&
                                        variant.priceAndQuantityCalcData.levelName ===
                                            'survey'
                                    }
                                    onChange={handleChangeLevelNameForDynamicPriceCalc}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Select
                            disabled={!isEditing}
                            id="dataForDynamicPriceCalc"
                            onChange={handleChangeLevelIdForDynamicPriceCalc}
                            value={
                                (variant.priceAndQuantityCalcData !== null &&
                                    variant.priceAndQuantityCalcData.levelId) ||
                                ''
                            }
                        >
                            <option className="text-muted" value="">
                                -
                            </option>
                            {variantsListForDynamicPriceCalc}
                        </Form.Select>

                        <Form.Group className="mt-2" as={Row}>
                            <Col>
                                <Form.Label htmlFor="priceShare">
                                    Доля от стоимости установленного уровня:
                                </Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    disabled={!isEditing}
                                    id="priceShare"
                                    size="sm"
                                    type="number"
                                    value={
                                        variant.priceAndQuantityCalcData.priceShare || ''
                                    }
                                    onChange={
                                        handleChangeLevelPriceShareForDynamicPriceCalc
                                    }
                                />
                            </Col>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label htmlFor="defaultQuantity">
                            Количество единиц измерения по умолчанию (фиксированное)
                        </Form.Label>
                        <Form.Control
                            disabled={!isEditing}
                            id="defaultQuantity"
                            type="number"
                            onChange={(e) =>
                                handleFieldChange('defaultQuantity', e.target.value)
                            }
                            value={variant.defaultQuantity || ''}
                            isValid={valid.defaultQuantity === true}
                            isInvalid={valid.defaultQuantity === false}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <p className="mb-2 mt-3">
                            Тип объекта капитального строительства, для которого подходит
                            обоснование объёма работ
                        </p>
                        {isEditor ? (
                            <Form.Control
                                disabled={true}
                                value={
                                    variant.isObjectTypeLine === null
                                        ? 'Не установлен'
                                        : variant.isObjectTypeLine === true
                                        ? 'Линейный'
                                        : 'Нелинейный'
                                }
                                id="objectType"
                            />
                        ) : (
                            <>
                                <Form.Check
                                    disabled={!isEditor ? !isEditing : true}
                                    checked={variant.isObjectTypeLine === null}
                                    inline
                                    type="radio"
                                    name={'objectType' + id}
                                    id={'notInstalled' + id}
                                    label="Не установлен"
                                    onChange={() => {
                                        changeObjectTypeLine(null);
                                    }}
                                />
                                <Form.Check
                                    disabled={!isEditing}
                                    checked={variant.isObjectTypeLine === true}
                                    inline
                                    type="radio"
                                    name={'objectType' + id}
                                    id={'Line' + id}
                                    label="Линейный"
                                    onChange={() => {
                                        changeObjectTypeLine(true);
                                    }}
                                />
                                <Form.Check
                                    disabled={!isEditing}
                                    checked={variant.isObjectTypeLine === false}
                                    inline
                                    type="radio"
                                    name={'objectType' + id}
                                    id={'notLine' + id}
                                    label="Нелинейный"
                                    onChange={() => {
                                        changeObjectTypeLine(false);
                                    }}
                                />
                            </>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-2 mt-3">
                        <Form.Label htmlFor="quantityCalculatorName">
                            Калькулятор количества единиц измерения
                        </Form.Label>
                        <Form.Select
                            disabled={!isEditing}
                            id="quantityCalculatorName"
                            onChange={(e) =>
                                handleFieldChange(
                                    'quantityCalculatorName',
                                    e.target.value || null
                                )
                            }
                            value={variant.quantityCalculatorName || ''}
                        >
                            <option className="text-muted" value="">
                                -
                            </option>
                            {quantityCalculatorsList}
                        </Form.Select>
                    </Form.Group>

                    <p className="mb-2 mt-3">Параметры единицы измерения</p>
                    <div
                        spellCheck={true}
                        className="form-control"
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        disabled={isEditing}
                        style={
                            isEditing ? {} : { background: '#E9ECEF', minHeight: '2em' }
                        }
                        dangerouslySetInnerHTML={{
                            __html: variant.properties?.replace(/\n/g, '<br>'),
                        }}
                        onInput={(event) => {
                            handleFieldInput('properties', event.currentTarget.innerText);
                        }}
                    />

                    <p className="mb-2 mt-3">
                        Обоснование включения исследования в состав изысканий
                    </p>
                    <div
                        spellCheck={true}
                        className="form-control"
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        disabled={isEditing}
                        style={
                            isEditing ? {} : { background: '#E9ECEF', minHeight: '2em' }
                        }
                        dangerouslySetInnerHTML={{
                            __html: variant.normDoc?.replace(/\n/g, '<br>'),
                        }}
                        onInput={(event) => {
                            handleFieldInput('normDoc', event.currentTarget.innerText);
                        }}
                    />

                    <p className="mb-2 mt-3">Обоснование принятого объёма работ</p>
                    <div
                        spellCheck={true}
                        className="form-control"
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        disabled={isEditing}
                        style={
                            isEditing ? {} : { background: '#E9ECEF', minHeight: '2em' }
                        }
                        dangerouslySetInnerHTML={{
                            __html: variant.justification?.replace(/\n/g, '<br>'),
                        }}
                        onInput={(event) => {
                            handleFieldInput(
                                'justification',
                                event.currentTarget.innerText
                            );
                        }}
                    />
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default VariantEditorAndCreatorModalWindow;
