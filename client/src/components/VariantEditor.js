import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Table, Button, ButtonGroup, Form, Row, Col } from 'react-bootstrap';

import {
    fetchVariant,
    fetchObjectTypes,
    fetchUnits,
    updateVariant,
    createVariantProperty,
} from '../http/catalogAPI.js';
import { AppContext } from './AppContext.js';
import VariantPropItemEditor from './VariantPropItemEditor.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const isValid = {
    objectTypeId(value) {
        return /^[0-9]+$/.test(value);
    },
    description(value) {
        return value.trim() !== '';
    },
    normDoc(value) {
        return true;
    },
    justification(value) {
        return true;
    },
    unitId(value) {
        return /^[0-9]+$/.test(value);
    },
    price(value) {
        return /^[0-9]+$/.test(value);
    },
};

const defaultValid = {
    description: '',
    unitId: '',
    objectTypeId: '',
    price: '',
};

const VariantEditor = () => {
    const { isLoading } = useContext(AppContext);
    const { id } = useParams();
    let [variant, setVariant] = useState({});
    const [objectTypes, setObjectTypes] = useState([]);
    const [units, setUnits] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [valid, setValid] = useState(defaultValid);
    const [variantEditingToggle, setVariantEditingToggle] = useState(false);

    useEffect(() => {
        fetchVariant(id)
            .then((data) => {
                setVariant(data);
            })
            .finally(() => setFetching(false));
        // eslint-disable-next-line
    }, [isEdit, variantEditingToggle]);

    useEffect(() => {
        fetchObjectTypes()
            .then((data) => setObjectTypes(data))
            .catch((error) => console.error(`ObjectTypes fetching error: ${error}`));

        fetchUnits()
            .then((data) => setUnits(data))
            .catch((error) => console.error(`Units fetching error: ${error}`));
        // eslint-disable-next-line
    }, []);

    const objectTypeList = objectTypes.map((item) => {
        return (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
        );
    });

    const unitList = units.map((item) => {
        return (
            <option key={item.id} value={item.id}>
                {item.name}
            </option>
        );
    });

    useEffect(() => {
        isLoading.state = fetching ? true : false;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    const variantProps = variant.variantProps.map((prop) => {
        return (
            <VariantPropItemEditor
                key={prop.id}
                prop={prop}
                variantId={variant.id}
                setVariantEditingToggle={setVariantEditingToggle}
            />
        );
    });

    const getVariantPriceByProps = variant.variantProps.reduce(
        (sum, prop) => sum + prop.quantity * prop.price,
        0
    );

    const handleFieldChange = (field, value) => {
        setVariant((prevVariant) => ({ ...prevVariant, [field]: value }));
        setValid((prevValid) => ({ ...prevValid, [field]: isValid[field](value) }));
    };

    const handleEditClick = () => {
        setIsEdit((prev) => !prev);
        if (isEdit) {
            setValid(defaultValid);
        } else {
            setValid({
                description: isValid.description(variant.description),
                unitId: isValid.unitId(variant.unitId),
                objectTypeId: isValid.objectTypeId(variant.objectTypeId),
                price: isValid.price(variant.price),
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        Object.values(valid).every((value) => value);
        updateVariant(variant.id, variant)
            .catch((error) => console.error(`Variant updating error: ${error}`))
            .finally(() => {
                setValid(defaultValid);
                setIsEdit(false);
            });
    };

    const handleCreatePropClick = () => {
        createVariantProperty(variant.id, { description: 'new survey' })
            .then(() => setVariantEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Prop of variant creating error: ${error}`));
    };

    return (
        <Container fluid>
            <Form>
                <Row className="border-top border-bottom pb-2 mb-2">
                    <Col sm={7}>
                        <h3>{variant.survey.name}</h3>
                    </Col>
                    <Col sm={5}>
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
                                    ✏️ Редактировать вариант
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>

                <Form.Group as={Row} className="mb-2">
                    <Form.Label htmlFor="price" column sm={5}>
                        Цена единицы измерения
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control
                            disabled={!isEdit}
                            id="price"
                            type="number"
                            onChange={(e) => handleFieldChange('price', e.target.value)}
                            value={variant.price}
                            isValid={valid.price === true}
                            isInvalid={valid.price === false}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Form.Label htmlFor="unitId" column sm={5}>
                        Единица измерения
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Select
                            disabled={!isEdit}
                            id="unitId"
                            onChange={(e) => handleFieldChange('unitId', e.target.value)}
                            value={variant.unitId}
                            isValid={valid.unitId === true}
                            isInvalid={valid.unitId === false}
                        >
                            <option className="text-muted"></option>
                            {unitList}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Form.Label htmlFor="objectTypeId" column sm={5}>
                        Тип объекта строительства
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Select
                            disabled={!isEdit}
                            id="objectTypeId"
                            onChange={(e) =>
                                handleFieldChange('objectTypeId', e.target.value)
                            }
                            value={variant.objectTypeId}
                            isValid={valid.objectTypeId === true}
                            isInvalid={valid.objectTypeId === false}
                        >
                            <option className="text-muted"></option>
                            {objectTypeList}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Form.Label htmlFor="description" column sm={5}>
                        Наименование варианта
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control
                            disabled={!isEdit}
                            id="description"
                            as="textarea"
                            onChange={(e) =>
                                handleFieldChange('description', e.target.value)
                            }
                            value={variant.description}
                            isValid={valid.description === true}
                            isInvalid={valid.description === false}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Form.Label htmlFor="normDoc" column sm={5}>
                        Документ, обосновывающий включение исследования в состав изысканий
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control
                            disabled={!isEdit}
                            id="normDoc"
                            as="textarea"
                            onChange={(e) => handleFieldChange('normDoc', e.target.value)}
                            value={variant.normDoc}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label htmlFor="justification" column sm={5}>
                        Обоснование принятого объёма исследований
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control
                            disabled={!isEdit}
                            id="justification"
                            as="textarea"
                            onChange={(e) =>
                                handleFieldChange('justification', e.target.value)
                            }
                            value={variant.justification}
                            rows="10"
                        />
                    </Col>
                </Form.Group>
            </Form>

            <>
                <h5 className="mt-4">
                    Единица измерения ({variant.unit.name}) включает в себя следующие
                    параметры:
                </h5>
                <Table bordered size="sm">
                    <thead>
                        <tr className="table-light">
                            <th className="align-middle text-center"></th>
                            <th className="align-middle text-center">
                                Описание параметра
                            </th>
                            <th className="align-middle text-center">Ед. изм.</th>
                            <th
                                className="align-middle text-center"
                                style={{ width: '6em' }}
                            >
                                Цена ед. изм.
                            </th>
                            <th className="align-middle text-center">Кол-во</th>
                            <th
                                className="align-middle text-center"
                                style={{ width: '6em' }}
                            >
                                Цена
                            </th>
                            <th className="align-middle text-center">Опции</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={7} className="text-end">
                                <Button
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={handleCreatePropClick}
                                >
                                    ➕↓ Добавить параметр
                                </Button>
                            </td>
                        </tr>
                        {!!variant.variantProps.length ? (
                            <>
                                {variantProps}

                                <tr>
                                    <th colSpan={5}>Стоимость единицы измерения</th>
                                    <th className="text-center">
                                        {formatNumberWithSpaces(getVariantPriceByProps)} ₽
                                    </th>
                                    <th className="text-center"></th>
                                </tr>
                            </>
                        ) : (
                            <tr>
                                <td colSpan={7}>Параметры отсутствуют</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </>
        </Container>
    );
};

export default VariantEditor;
