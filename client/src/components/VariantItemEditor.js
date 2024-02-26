import React, { useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import DeletingModalWindow from './DeletingModalWindow';
import CreatingVariantModalWindow from './CreatingVariantModalWindow';
import {
    deleteVariant,
    moveDownVariant,
    moveUpVariant,
    updateVariant,
} from '../http/catalogAPI';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const VariantItemEditor = ({
    surveyId,
    id,
    order,
    description,
    unit,
    unitId,
    objectTypeId,
    unitPrice,
    setCatalogEditingToggle,
    isProduction,
    scenarios,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [showDeletingWindow, setShowDeletingWindow] = useState(false);

    const handleEditClick = () => {
        setIsEdit(!isEdit);
    };

    const deleteCallback = () => {
        deleteVariant(id)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Variant deleting error: ${error}`));
    };

    const handleDeleteClick = () => {
        if (isEdit) return;
        setShowDeletingWindow(true);
    };

    const moveUp = () => {
        moveUpVariant(id, surveyId, objectTypeId)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Variant moving up error: ${error}`));
    };

    const moveDown = () => {
        moveDownVariant(id, surveyId, objectTypeId)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Variant moving down error: ${error}`));
    };

    const handleCheck = (event) => {
        updateVariant(id, { isProduction: event.target.checked })
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) =>
                console.error(`Update variant isProduction error: ${error}`)
            );
    };

    // console.log(scenarios);

    return (
        <>
            {isEdit && (
                <CreatingVariantModalWindow
                    show={isEdit}
                    setShow={setIsEdit}
                    updateVariant={updateVariant}
                    surveyId={surveyId}
                    setCatalogEditingToggle={setCatalogEditingToggle}
                    editing={true}
                    variantId={id}
                    unit={unit}
                    objectTypeId={objectTypeId}
                    description={description}
                    unitPrice={unitPrice}
                />
            )}
            {showDeletingWindow && (
                <DeletingModalWindow
                    show={showDeletingWindow}
                    setShow={setShowDeletingWindow}
                    deleteFunction={deleteCallback}
                    text={`Подтвердите удаление варианта исследования: "${description}"`}
                />
            )}
            <tr key={id}>
                <td className="align-middle">
                    <Form.Check
                        id={id + 'check'}
                        onChange={handleCheck}
                        checked={isProduction}
                    />
                </td>
                <td className="align-middle">
                    <ButtonGroup size="sm">
                        <Button onClick={moveDown} variant="outline-secondary">
                            ↓
                        </Button>
                        <Button onClick={moveUp} variant="outline-secondary">
                            ↑
                        </Button>
                    </ButtonGroup>
                </td>

                <td className="align-middle">{description}</td>
                <td className="align-middle text-center">
                    <Form.Check
                        id={id + 'checkScenario'}
                        // onChange={handleCheck}
                        // checked={isProduction}
                    />
                </td>

                <td className="text-center align-middle">{unit}</td>
                <td className="text-end align-middle">
                    <b>{formatNumberWithSpaces(unitPrice)} ₽</b>
                </td>
                <td className="align-middle text-end">
                    <ButtonGroup size="sm" className="w-100">
                        <NavLink
                            to={`/admin/edit/catalog/variant/${id}`}
                            className="btn btn-outline-primary"
                        >
                            {'>>'}
                        </NavLink>
                        <Button variant="outline-primary" onClick={handleEditClick}>
                            {isEdit ? <>💾</> : <>✏️</>}
                        </Button>
                        <Button variant="outline-danger" onClick={handleDeleteClick}>
                            ❌
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        </>
    );
};

export default VariantItemEditor;
