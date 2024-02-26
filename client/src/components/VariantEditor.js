import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Button, ButtonGroup, Form, Row, Col } from 'react-bootstrap';

import {
    fetchVariant,
    fetchObjectTypes,
    updateVariant,
    fetchHandlers,
    fetchCategories,
    fetchSubcategories,
    fetchSurveys,
} from '../http/catalogAPI.js';
import { AppContext } from './AppContext.js';

const isValid = {
    objectTypeId(value) {
        return /^[0-9]+$/.test(value);
    },
    description(value) {
        return value.trim() !== '';
    },
    unit(value) {
        return value.trim() !== '';
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
    handlerId(value) {
        return true;
    },
};

const defaultValid = {
    description: '',
    unit: '',
    objectTypeId: '',
    price: '',
};

const VariantEditor = () => {
    const { isLoading } = useContext(AppContext);
    const { id } = useParams();
    const [variant, setVariant] = useState({});
    const [objectTypes, setObjectTypes] = useState([]);
    const [handlers, setHandlers] = useState([]);
    const [positionsListForDynamicPriceCalc, setPositionsListForDynamicPriceCalc] =
        useState(null);
    const [fetching, setFetching] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [valid, setValid] = useState(defaultValid);

    const getPositionsListByLevelName = async (levelName) => {
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
        if (variant.dynamicPriceIdAndLevel) {
            const levelName = variant.dynamicPriceIdAndLevel.split('.')[0];

            getPositionsListByLevelName(levelName)
                .then((data) => {
                    setPositionsListForDynamicPriceCalc(data);
                })
                .catch((error) =>
                    console.error(`${levelName}(-s) fetching error: ${error}`)
                );
        }
    }, [variant.dynamicPriceIdAndLevel, isEdit]);

    const tempVariant = useRef({});

    useEffect(() => {
        fetchVariant(id)
            .then((data) => {
                setVariant(data);
            })
            .finally(() => setFetching(false));

        fetchObjectTypes()
            .then((data) => setObjectTypes(data))
            .catch((error) => console.error(`ObjectTypes fetching error: ${error}`));

        fetchHandlers()
            .then((data) => setHandlers(data))
            .catch((error) => console.error(`Handlers fetching error: ${error}`));
        // eslint-disable-next-line
    }, [isEdit]);

    useEffect(() => {
        isLoading.state = fetching;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    const objectTypeList = objectTypes.map((item) => {
        return (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
        );
    });

    const handlersList = handlers.map((item) => {
        return (
            <option key={item.id} value={item.id}>
                {item.name} - {item.description}
            </option>
        );
    });

    const handleChangeLevelNameForDynamicPriceCalc = (event) => {
        if (event.target.id !== 'notSelected') {
            setVariant((prevVariant) => ({
                ...prevVariant,
                dynamicPriceIdAndLevel: event.target.id + '.',
            }));
        } else {
            setVariant((prevVariant) => ({
                ...prevVariant,
                dynamicPriceIdAndLevel: null,
            }));
            setPositionsListForDynamicPriceCalc('');
        }
    };

    const handleChangeLevelIdForDynamicPriceCalc = (event) => {
        if (variant.dynamicPriceIdAndLevel === null) return;
        setVariant((prevVariant) => ({
            ...prevVariant,
            dynamicPriceIdAndLevel:
                prevVariant.dynamicPriceIdAndLevel + event.target.value,
        }));
    };

    const handleFieldChange = (field, value) => {
        setVariant((prevVariant) => ({ ...prevVariant, [field]: value }));
        setValid((prevValid) => ({ ...prevValid, [field]: isValid[field](value) }));
    };

    const handleFieldInput = (field, value) => {
        tempVariant[field] = value;
        setValid((prevValid) => ({ ...prevValid, [field]: isValid[field](value) }));
    };

    const handleEditClick = () => {
        if (isEdit) {
            setValid(defaultValid);
        } else {
            setValid({
                description: isValid.description(variant.description),
                unit: isValid.unit(variant.unit),
                objectTypeId: isValid.objectTypeId(variant.objectTypeId),
                price: isValid.price(variant.price),
            });
        }
        setFetching(true);
        setIsEdit((prev) => !prev);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        for (let value of Object.values(valid)) {
            if (!value) return;
        }
        updateVariant(variant.id, { ...variant, ...tempVariant })
            .catch((error) => console.error(`Variant updating error: ${error}`))
            .finally(() => {
                setValid(defaultValid);
                setIsEdit(false);
            });
    };

    return (
        <Container fluid>
            <Form>
                <Row className="border-top border-bottom pb-2 mb-2">
                    <Col sm={9}>
                        <h3>{variant.survey.name}</h3>
                    </Col>
                    <Col sm={3}>
                        <div className="ms-auto pt-1">
                            {isEdit ? (
                                <ButtonGroup className="w-100">
                                    <Button
                                        variant="outline-primary"
                                        onClick={handleSubmit}
                                    >
                                        💾 Сохранить
                                    </Button>
                                    <Button
                                        variant="outline-primary"
                                        onClick={handleEditClick}
                                    >
                                        ✖️ Отменить
                                    </Button>
                                </ButtonGroup>
                            ) : (
                                <Button
                                    className="w-100"
                                    variant="outline-primary"
                                    onClick={handleEditClick}
                                >
                                    ✏️ Редактировать
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>

                <Form.Group className="mb-2">
                    <Form.Label htmlFor="price">Цена единицы измерения</Form.Label>
                    <Form.Control
                        disabled={!isEdit}
                        id="price"
                        type="number"
                        onChange={(e) => handleFieldChange('price', e.target.value)}
                        value={variant.price}
                        isValid={valid.price === true}
                        isInvalid={valid.price === false}
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label htmlFor="unit">Единица измерения</Form.Label>
                    <Form.Control
                        disabled={!isEdit}
                        id="unit"
                        type="text"
                        onChange={(e) => handleFieldChange('unit', e.target.value)}
                        value={variant.unit}
                        isValid={valid.unit === true}
                        isInvalid={valid.unit === false}
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label htmlFor="objectTypeId">
                        Тип объекта строительства
                    </Form.Label>
                    <Form.Select
                        disabled={!isEdit}
                        id="objectTypeId"
                        onChange={(e) =>
                            handleFieldChange('objectTypeId', e.target.value)
                        }
                        value={variant.objectTypeId || ''}
                        isValid={valid.objectTypeId === true}
                        isInvalid={valid.objectTypeId === false}
                    >
                        <option className="text-muted"></option>
                        {objectTypeList}
                    </Form.Select>
                </Form.Group>

                <p className="mb-2 mt-3">Наименование варианта</p>
                <div
                    spellCheck={true}
                    className={
                        isEdit
                            ? valid.description
                                ? 'form-control is-valid'
                                : 'form-control is-invalid'
                            : 'form-control'
                    }
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    disabled={isEdit}
                    style={isEdit ? {} : { background: '#E9ECEF', minHeight: '2em' }}
                    dangerouslySetInnerHTML={{
                        __html: variant.description?.replace(/\n/g, '<br>'),
                    }}
                    onInput={(event) => {
                        handleFieldInput('description', event.currentTarget.innerText);
                    }}
                />

                <Form.Group className="mb-2 mt-3">
                    <Form.Label htmlFor="handlerId">
                        Функция авторасчёта количества единиц измерения
                    </Form.Label>
                    <Form.Select
                        disabled={!isEdit}
                        id="handlerId"
                        onChange={(e) =>
                            handleFieldChange('handlerId', e.target.value || null)
                        }
                        value={variant.handlerId || ''}
                    >
                        <option className="text-muted" value="">
                            -
                        </option>
                        {handlersList}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2 mt-3">
                    <Form.Label htmlFor="dataForDynamicPriceCalc">
                        Данные для динамического определения цены единицы измерения
                    </Form.Label>
                    <Form.Group>
                        <Form.Check
                            disabled={!isEdit}
                            inline
                            label="Не выбрано"
                            id="notSelected"
                            name="levelName"
                            type="checkbox"
                            checked={variant.dynamicPriceIdAndLevel === null}
                            onChange={handleChangeLevelNameForDynamicPriceCalc}
                        />
                        <Form.Check
                            disabled={!isEdit}
                            inline
                            label="Категория"
                            id="category"
                            name="levelName"
                            type="checkbox"
                            checked={
                                variant.dynamicPriceIdAndLevel !== null &&
                                variant.dynamicPriceIdAndLevel.split('.')[0] ===
                                    'category'
                            }
                            onChange={handleChangeLevelNameForDynamicPriceCalc}
                        />
                        <Form.Check
                            disabled={!isEdit}
                            inline
                            label="Субкатегория"
                            id="subcategory"
                            name="levelName"
                            type="checkbox"
                            checked={
                                variant.dynamicPriceIdAndLevel !== null &&
                                variant.dynamicPriceIdAndLevel.split('.')[0] ===
                                    'subcategory'
                            }
                            onChange={handleChangeLevelNameForDynamicPriceCalc}
                        />
                        <Form.Check
                            disabled={!isEdit}
                            inline
                            label="Исследование"
                            id="survey"
                            name="levelName"
                            type="checkbox"
                            checked={
                                variant.dynamicPriceIdAndLevel !== null &&
                                variant.dynamicPriceIdAndLevel.split('.')[0] === 'survey'
                            }
                            onChange={handleChangeLevelNameForDynamicPriceCalc}
                        />
                    </Form.Group>

                    <Form.Select
                        disabled={!isEdit}
                        id="dataForDynamicPriceCalc"
                        onChange={handleChangeLevelIdForDynamicPriceCalc}
                        value={
                            (variant.dynamicPriceIdAndLevel !== null &&
                                variant.dynamicPriceIdAndLevel.split('.')[1]) ||
                            ''
                        }
                    >
                        <option className="text-muted" value="">
                            -
                        </option>
                        {positionsListForDynamicPriceCalc}
                    </Form.Select>
                </Form.Group>

                <p className="mb-2 mt-3">
                    Документ, обосновывающий включение исследования в состав изысканий
                </p>
                <div
                    spellCheck={true}
                    className="form-control"
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    disabled={isEdit}
                    style={isEdit ? {} : { background: '#E9ECEF', minHeight: '2em' }}
                    dangerouslySetInnerHTML={{
                        __html: variant.normDoc?.replace(/\n/g, '<br>'),
                    }}
                    onInput={(event) => {
                        handleFieldInput('normDoc', event.currentTarget.innerText);
                    }}
                />

                <p className="mb-2 mt-3">Обоснование принятого объёма исследований</p>
                <div
                    spellCheck={true}
                    className="form-control"
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    disabled={isEdit}
                    style={isEdit ? {} : { background: '#E9ECEF', minHeight: '2em' }}
                    dangerouslySetInnerHTML={{
                        __html: variant.justification?.replace(/\n/g, '<br>'),
                    }}
                    onInput={(event) => {
                        handleFieldInput('justification', event.currentTarget.innerText);
                    }}
                />

                <p className="mb-2 mt-3">Характеристики одой единицы измерения</p>
                <div
                    spellCheck={true}
                    className="form-control"
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    disabled={isEdit}
                    style={isEdit ? {} : { background: '#E9ECEF', minHeight: '2em' }}
                    dangerouslySetInnerHTML={{
                        __html: variant.properties?.replace(/\n/g, '<br>'),
                    }}
                    onInput={(event) => {
                        handleFieldInput('properties', event.currentTarget.innerText);
                    }}
                />
            </Form>
        </Container>
    );
};

export default VariantEditor;
