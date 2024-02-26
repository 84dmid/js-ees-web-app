import React, { useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

import {
    deleteObjectType,
    moveDownObjectType,
    moveUpObjectType,
    updateObjectType,
} from '../http/catalogAPI';
import DeletingModalWindow from './DeletingModalWindow.js';

const ObjectTypeItemEditor = ({ id, name, description, setObjectTypeEditingToggle }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [showDeletingWindow, setShowDeletingWindow] = useState(false);
    const [objectType, setObjectType] = useState({ id, name: name, description });

    const getForm = (type, key) => {
        return (
            <Form.Control
                type={type}
                value={objectType[key]}
                onChange={(event) => {
                    setObjectType({ ...objectType, [key]: event.target.value });
                }}
            />
        );
    };

    const moveUp = () => {
        moveUpObjectType(id)
            .then(() => setObjectTypeEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Object type moving up error: ${error}`));
    };

    const moveDown = () => {
        moveDownObjectType(id)
            .then(() => setObjectTypeEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Object type moving down error: ${error}`));
    };

    const handleEditClick = () => {
        if (isEdit) {
            setIsEdit(false);
            updateObjectType(id, objectType)
                .then(() => setObjectTypeEditingToggle((prevToggle) => !prevToggle))
                .catch((error) => console.error(`Object type updating error: ${error}`));
        } else {
            setIsEdit(true);
        }
    };

    const deleteCallback = () => {
        deleteObjectType(id)
            .then(() => setObjectTypeEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Object type deleting error: ${error}`));
    };

    const handleDeleteClick = (event) => {
        if (isEdit) return;
        setShowDeletingWindow(true);
    };

    return (
        <>
            <DeletingModalWindow
                show={showDeletingWindow}
                setShow={setShowDeletingWindow}
                deleteFunction={deleteCallback}
                text={`Подтвердите удаление типа объекта: "${name}"`}
            />
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
                <td>{isEdit ? getForm('text', 'name') : objectType.name}</td>
                <td>
                    {isEdit ? getForm('text', 'description') : objectType.description}
                </td>
                <td>
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
        </>
    );
};

export default ObjectTypeItemEditor;
