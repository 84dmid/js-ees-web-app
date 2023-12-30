import React, { useState } from 'react';
import { Form, Button, ButtonGroup, FloatingLabel } from 'react-bootstrap';

import VariantItemEditor from './VariantItemEditor.js';
import DeletingModalWindow from './DeletingModalWindow.js';
import {
    createVariant,
    deleteSurvey,
    moveDownSurvey,
    moveUpSurvey,
    updateSurvey,
} from '../http/catalogAPI.js';
import CreatingVariantModalWindow from './CreatingVariantModalWindow.js';

const SurveyItemEditor = ({
    id,
    order,
    name,
    variants,
    setCatalogEditingToggle,
    subcategoryId,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [survey, setSurvey] = useState({ name });
    const [showDeletingWindow, setShowDeletingWindow] = useState(false);
    const [showCreatingVariantWindow, setShowCreatingVariantWindow] = useState(false);

    const variantsList = [];
    let curObjectTypeId;
    variants.forEach((variant) => {
        if (variant.objectType && curObjectTypeId !== variant.objectType.id) {
            curObjectTypeId = variant.objectType.id;
            variantsList.push(
                <tr key={variant.objectType.id + 'objectType'}>
                    <td></td>
                    <td colSpan={6}>
                        <Form.Text>{variant.objectType.description}:</Form.Text>
                    </td>
                </tr>
            );
        }
        variantsList.push(
            <VariantItemEditor
                key={variant.id + 'variant'}
                id={variant.id}
                surveyId={id}
                description={variant.description}
                unit={variant.unit?.name}
                unitId={variant.unit?.id}
                objectTypeId={variant.objectType.id}
                unitPrice={variant.price}
                order={variant.order}
                setCatalogEditingToggle={setCatalogEditingToggle}
            />
        );
    });

    const getForm = (type, key, label) => {
        return (
            <FloatingLabel label={label}>
                <Form.Control
                    type={type}
                    value={survey[key]}
                    onChange={(event) => {
                        setSurvey({ ...survey, [key]: event.target.value });
                    }}
                />
            </FloatingLabel>
        );
    };

    const handleEditClick = () => {
        if (isEdit) {
            setIsEdit(false);
            updateSurvey(id, survey)
                .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
                .catch((error) => console.error(`Survey updating error: ${error}`));
        } else {
            setIsEdit(true);
        }
    };

    const deleteCallback = () => {
        deleteSurvey(id)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Survey deleting error: ${error}`));
    };

    const handleDeleteClick = () => {
        if (isEdit) return;
        setShowDeletingWindow(true);
    };

    const moveUp = () => {
        moveUpSurvey(id, subcategoryId)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Survey moving up error: ${error}`));
    };

    const moveDown = () => {
        moveDownSurvey(id, subcategoryId)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Survey moving down error: ${error}`));
    };

    const handleCreateClick = () => {
        setShowCreatingVariantWindow(true);
    };

    return (
        <>
            <CreatingVariantModalWindow
                show={showCreatingVariantWindow}
                setShow={setShowCreatingVariantWindow}
                createVariant={createVariant}
                surveyId={id}
                setCatalogEditingToggle={setCatalogEditingToggle}
            />
            <DeletingModalWindow
                show={showDeletingWindow}
                setShow={setShowDeletingWindow}
                deleteFunction={deleteCallback}
                text={`Подтвердите удаление вида исследований: "${name}"`}
            />
            <tr className="table-secondary">
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
                <td className="align-middle">{order}</td>
                <td colSpan={3} className="align-middle">
                    {isEdit ? (
                        getForm('text', 'name', 'Вид исследования')
                    ) : (
                        <>
                            <b>{survey.name}</b>
                        </>
                    )}
                </td>
                <td className="align-middle text-end">
                    <ButtonGroup size="sm" className="w-100">
                        <Button
                            onClick={handleCreateClick}
                            size="sm"
                            variant="outline-primary text-start"
                        >
                            ➕↓
                        </Button>
                        <Button variant="outline-primary" onClick={handleEditClick}>
                            {isEdit ? <>💾</> : <>✏️</>}
                        </Button>
                        <Button variant="outline-danger" onClick={handleDeleteClick}>
                            ❌
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
            {variantsList}
        </>
    );
};

export default SurveyItemEditor;
