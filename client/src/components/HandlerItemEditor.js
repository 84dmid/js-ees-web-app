import React, { useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

import DeletingModalWindow from './DeletingModalWindow.js';
import { deleteHandler, updateHandler } from '../http/catalogAPI.js';

const HandlerItemEditor = ({ id, name, description, setHandlerEditingToggle }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [showDeletingWindow, setShowDeletingWindow] = useState(false);
    const [handler, setHandler] = useState({ name, description });

    const getForm = (type, key) => {
        return (
            <Form.Control
                type={type}
                as={type === 'textarea' ? 'textarea' : undefined}
                value={handler[key]}
                onChange={(event) => {
                    setHandler({ ...handler, [key]: event.target.value });
                }}
            />
        );
    };

    const handleEditClick = () => {
        if (isEdit) {
            setIsEdit(false);
            updateHandler(id, handler)
                .then(() => setHandlerEditingToggle((prevToggle) => !prevToggle))
                .catch((error) => console.error(`Handler updating error: ${error}`));
        } else {
            setIsEdit(true);
        }
    };

    const deleteCallback = () => {
        deleteHandler(id)
            .then(() => setHandlerEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Handler deleting error: ${error}`));
    };

    const handleDeleteClick = () => {
        if (isEdit) return;
        setShowDeletingWindow(true);
    };

    return (
        <>
            <DeletingModalWindow
                show={showDeletingWindow}
                setShow={setShowDeletingWindow}
                deleteFunction={deleteCallback}
                text={`Подтвердите удаление обработчика: "${name}" (${description})`}
            />
            <tr>
                <td>{isEdit ? getForm('text', 'name') : handler.name}</td>
                <td>
                    {isEdit ? getForm('textarea', 'description') : handler.description}
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

export default HandlerItemEditor;
