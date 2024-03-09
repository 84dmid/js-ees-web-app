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
import VariantEditorAndCreatorModalWindow from './VariantEditorAndCreatorModalWindow.js';
// import VariantEditorAndCreatorModalWindow from './CreatingVariantModalWindow.js';
import CatalogEditorSubheadings from './CatalogEditorSubheadings.js';
import CatalogEditorSubheadingsForObjectTypes from './CatalogEditorSubheadingsForObjectTypes.js';

const SurveyItemEditor = ({
    id,
    order,
    name,
    variants,
    setCatalogEditingToggle,
    subcategoryId,
    filter,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [survey, setSurvey] = useState({ name });
    const [showDeletingWindow, setShowDeletingWindow] = useState(false);
    const [showCreatingVariantWindow, setShowCreatingVariantWindow] = useState(false);

    const variantsList = [];
    let curObjectType;
    variants.forEach((variant) => {
        if (variant.isObjectTypeLine !== curObjectType) {
            curObjectType = variant.isObjectTypeLine;
            variantsList.push(
                <CatalogEditorSubheadingsForObjectTypes
                    key={variant.id + 'objectTypeTextTableRow'}
                    isObjectTypeLine={curObjectType}
                />
            );
        }
        variantsList.push(
            <VariantItemEditor
                key={variant.id + 'variant'}
                id={variant.id}
                surveyId={id}
                surveyName={name}
                description={variant.description}
                unit={variant.unit}
                isObjectTypeLine={variant.isObjectTypeLine}
                unitPrice={variant.price}
                order={variant.order}
                isProduction={variant.isProduction}
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
            {showCreatingVariantWindow && (
                <VariantEditorAndCreatorModalWindow
                    show={showCreatingVariantWindow}
                    setShow={setShowCreatingVariantWindow}
                    createVariant={createVariant}
                    surveyId={id}
                    surveyName={name}
                    setCatalogEditingToggle={setCatalogEditingToggle}
                />
            )}
            {showDeletingWindow && (
                <DeletingModalWindow
                    show={showDeletingWindow}
                    setShow={setShowDeletingWindow}
                    deleteFunction={deleteCallback}
                    text={`Подтвердите удаление вида исследований: "${name}"`}
                />
            )}

            <tr>
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
                <td colSpan={4} className="align-middle">
                    {isEdit ? (
                        getForm('text', 'name', 'Вид исследования')
                    ) : (
                        <>
                            <b style={{ fontSize: '0.95em' }}>{survey.name}</b>
                        </>
                    )}
                </td>
                <td className="align-middle">
                    <Button
                        className="w-100 text-start"
                        onClick={handleCreateClick}
                        size="sm"
                        variant="outline-primary"
                    >
                        ➕ Вариант
                    </Button>
                </td>
                <td className="align-middle text-end">
                    <ButtonGroup size="sm" className="w-100">
                        <Button variant="outline-primary" onClick={handleEditClick}>
                            {isEdit ? <>💾</> : <>✏️</>}
                        </Button>
                        <Button variant="outline-danger" onClick={handleDeleteClick}>
                            ❌
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
            {filter.isVariantsHidden || <CatalogEditorSubheadings />}
            {filter.isVariantsHidden || variantsList}
        </>
    );
};

export default SurveyItemEditor;
