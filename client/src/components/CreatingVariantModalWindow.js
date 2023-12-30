import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { fetchObjectTypes, fetchUnits } from '../http/catalogAPI';

const isValid = {
    objectTypeId(value) {
        return /^[0-9]+$/.test(value);
    },
    description(value) {
        return value.trim() !== '';
    },
    unitId(value) {
        return /^[0-9]+$/.test(value);
    },
    price(value) {
        return /^[0-9]+$/.test(value);
    },
};

const CreatingVariantModalWindow = ({
    show,
    setShow,
    createVariant,
    updateVariant,
    surveyId,
    setCatalogEditingToggle,
    editing,
    variantId,
    unitId,
    objectTypeId,
    description,
    unitPrice,
}) => {
    const defaultValid = {
        objectTypeId: null,
        description: null,
        unitId: null,
        price: null,
    };
    const defaultVariant = {
        objectTypeId: '',
        description: '',
        unitId: '',
        price: '',
        surveyId,
    };

    const [objectTypes, setObjectTypes] = useState([]);
    const [units, setUnits] = useState([]);
    const [variant, setVariant] = useState(
        editing
            ? {
                  description,
                  unitId,
                  objectTypeId,
                  price: unitPrice,
                  surveyId,
              }
            : defaultVariant
    );
    const [valid, setValid] = useState(
        editing
            ? {
                  description: isValid.description(description),
                  unitId: isValid.unitId(unitId),
                  objectTypeId: isValid.objectTypeId(objectTypeId),
                  price: isValid.price(unitPrice),
              }
            : defaultValid
    );

    useEffect(() => {
        fetchObjectTypes()
            .then((data) => setObjectTypes(data))
            .catch((error) => console.error(`ObjectTypes fetching error: ${error}`));

        fetchUnits()
            .then((data) => setUnits(data))
            .catch((error) => console.error(`Units fetching error: ${error}`));
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

    const handleFieldChange = (field, value) => {
        setVariant((prevVariant) => ({ ...prevVariant, [field]: value }));
        setValid((prevValid) => ({ ...prevValid, [field]: isValid[field](value) }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        for (let value of Object.values(valid)) {
            if (!value) return;
        }

        if (editing) {
            updateVariant(variantId, variant)
                .then(() => {
                    console.log('test1');
                    setCatalogEditingToggle((prevToggle) => !prevToggle);
                    setShow(false);
                    setValid(defaultValid);
                    setVariant(defaultVariant);
                })
                .catch((error) => console.error(`Variant updating error: ${error}`));
        } else {
            createVariant(variant)
                .then(() => {
                    setCatalogEditingToggle((prevToggle) => !prevToggle);
                    setShow(false);
                    setValid(defaultValid);
                    setVariant(defaultVariant);
                })
                .catch((error) => console.error(`Variant creating error: ${error}`));
        }
    };

    const handleHide = () => {
        setShow(false);
        setValid(defaultValid);
        setVariant(defaultVariant);
    };

    if (!objectTypes.length) return null;

    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {editing ? <>Редактирование</> : <>Создание</>} варианта исследования
                </Modal.Title>
            </Modal.Header>

            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="description">Описание варианта</Form.Label>
                        <Form.Control
                            id="description"
                            as="textarea"
                            onChange={(e) =>
                                handleFieldChange('description', e.target.value)
                            }
                            value={variant.description}
                            isValid={valid.description === true}
                            isInvalid={valid.description === false}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="objectTypeId">
                            Тип объекта строительства
                        </Form.Label>
                        <Form.Select
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
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="unitId">Ед. изм.</Form.Label>
                        <Form.Select
                            id="unitId"
                            onChange={(e) => handleFieldChange('unitId', e.target.value)}
                            value={variant.unitId}
                            isValid={valid.unitId === true}
                            isInvalid={valid.unitId === false}
                        >
                            <option className="text-muted"></option>
                            {unitList}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="price">Цена ед. изм.</Form.Label>
                        <Form.Control
                            id="price"
                            type="number"
                            onChange={(e) => handleFieldChange('price', e.target.value)}
                            value={variant.price}
                            isValid={valid.price === true}
                            isInvalid={valid.price === false}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" variant="outline-primary">
                        Сохранить
                    </Button>
                    <Button onClick={handleHide} variant="outline-primary">
                        Не сохранять
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CreatingVariantModalWindow;
