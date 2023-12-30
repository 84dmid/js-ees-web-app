import React, { useState } from 'react';
import { Button, ButtonGroup, Form, FloatingLabel } from 'react-bootstrap';

import SurveyItemEditor from './SurveyItemEditor.js';
import DeletingModalWindow from './DeletingModalWindow.js';
import {
    updateSubcategory,
    moveUpSubcategory,
    moveDownSubcategory,
    deleteSubcategory,
    createSurvey,
} from '../http/catalogAPI.js';

const SubcategoryItemEditor = ({
    id,
    name,
    surveys,
    order,
    setCatalogEditingToggle,
    categoryId,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [subcategory, setSubcategory] = useState({ name });
    const [showDeletingWindow, setShowDeletingWindow] = useState(false);

    const surveyList = surveys.map((survey) => {
        return (
            <SurveyItemEditor
                key={survey.id + 'survey'}
                id={survey.id}
                name={survey.name}
                variants={survey.variants}
                order={survey.order}
                setCatalogEditingToggle={setCatalogEditingToggle}
                subcategoryId={id}
            />
        );
    });

    const getForm = (type, key, label) => {
        return (
            <FloatingLabel label={label}>
                <Form.Control
                    type={type}
                    value={subcategory[key]}
                    onChange={(event) => {
                        setSubcategory({ ...subcategory, [key]: event.target.value });
                    }}
                />
            </FloatingLabel>
        );
    };

    const handleEditClick = () => {
        if (isEdit) {
            setIsEdit(false);
            updateSubcategory(id, subcategory)
                .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
                .catch((error) => console.error(`Subcategory updating error: ${error}`));
        } else {
            setIsEdit(true);
        }
    };

    const deleteSubcategoryCallback = () => {
        deleteSubcategory(id)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Subcategory deleting error: ${error}`));
    };

    const handleDeleteClick = () => {
        if (isEdit) return;
        setShowDeletingWindow(true);
    };

    const moveUp = () => {
        moveUpSubcategory(id, categoryId)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Subcategory moving up error: ${error}`));
    };

    const moveDown = () => {
        moveDownSubcategory(id, categoryId)
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Subcategory moving down error: ${error}`));
    };

    const handleCreateClick = () => {
        createSurvey({ subcategoryId: id, name: 'new survey' })
            .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Survey creating error: ${error}`));
    };

    return (
        <>
            <DeletingModalWindow
                show={showDeletingWindow}
                setShow={setShowDeletingWindow}
                deleteFunction={deleteSubcategoryCallback}
                text={`Подтвердите удаление подкатегории: "${name}"`}
            />
            <tr className="table-light">
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
                        getForm('text', 'name', 'Подкатегория')
                    ) : (
                        <>
                            <div style={{ fontSize: '0.875em' }}>Подкатегория</div>
                            <h6>{subcategory.name}</h6>
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
            {surveyList}
        </>
    );
};

export default SubcategoryItemEditor;
