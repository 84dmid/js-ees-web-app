import React, { useState, useRef } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

import DeletingModalWindow from './DeletingModalWindow.js';
import {
    deleteScenario,
    moveDownScenario,
    moveUpScenario,
    updateScenario,
} from '../http/scenarioAPI.js';

const isValid = {
    name(value) {
        return value.trim() !== '';
    },
    description(value) {
        return value.trim() !== '';
    },
};

const defaultValid = {
    name: '',
    description: '',
};

const ScenarioItemEditor = ({
    id,
    name,
    description,
    setScenarioEditingToggle,
    isProduction,
    isObjectTypeLine,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [showDeletingWindow, setShowDeletingWindow] = useState(false);
    const [scenario /*setScenario*/] = useState({ name, description }); // разобраться позже
    const [valid, setValid] = useState(defaultValid);

    const tempScenario = useRef({});

    const cellStyles = (fieldName) => {
        if (!isEdit) return;
        if (valid[fieldName] === true) {
            return { background: '#EAFCE5' };
        } else if (valid[fieldName] === false) {
            return { background: '#FFEBF0' };
        } else {
            return { background: '#F5F5F5' };
        }
    };

    const handleFieldInput = (field, value) => {
        tempScenario[field] = value;
        setValid((prevValid) => ({ ...prevValid, [field]: isValid[field](value) }));
    };

    const handleEditClick = () => {
        if (isEdit) {
            if (valid.name === false || valid.description === false) return;
            updateScenario(id, { ...scenario, ...tempScenario })
                .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
                .catch((error) => console.error(`Updating scenario error: ${error}`));
            setIsEdit(false);
        } else {
            setIsEdit(true);
            setValid(defaultValid);
        }
    };

    const deleteCallback = () => {
        deleteScenario(id)
            .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`deleting scenario error: ${error}`));
    };

    const handleDeleteClick = () => {
        if (isEdit) return;
        setShowDeletingWindow(true);
    };

    const moveUp = () => {
        moveUpScenario(id)
            .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Moving up scenario error: ${error}`));
    };

    const moveDown = () => {
        moveDownScenario(id)
            .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Variant moving down error: ${error}`));
    };

    const handleCheck = (event) => {
        updateScenario(id, { isProduction: event.target.checked })
            .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Updating scenario  error: ${error}`));
    };

    const changeObjectType = (objectTypeData) => {
        updateScenario(id, objectTypeData)
            .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Updating scenario  error: ${error}`));
    };

    const objectTypeCellData =
        isObjectTypeLine === null
            ? 'Не выбрано'
            : isObjectTypeLine
            ? 'Линейный'
            : 'Нелинейный';

    return (
        <>
            <DeletingModalWindow
                show={showDeletingWindow}
                setShow={setShowDeletingWindow}
                deleteFunction={deleteCallback}
                text={`Подтвердите удаление обработчика: "${name}" (${description})`}
            />
            <tr>
                <td className="align-middle">
                    <Form.Check
                        id={'isProduction' + id}
                        onChange={handleCheck}
                        checked={isProduction}
                        disabled={!isEdit}
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
                <td
                    className="align-middle"
                    spellCheck={true}
                    style={cellStyles('name')}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    disabled={isEdit}
                    dangerouslySetInnerHTML={{
                        __html: scenario.name?.replace(/\n/g, '<br>'),
                    }}
                    onInput={(event) => {
                        handleFieldInput('name', event.currentTarget.innerText);
                    }}
                />
                <td
                    className="align-middle"
                    spellCheck={true}
                    style={cellStyles('description')}
                    contentEditable={isEdit}
                    suppressContentEditableWarning={true}
                    disabled={isEdit}
                    dangerouslySetInnerHTML={{
                        __html: scenario.description?.replace(/\n/g, '<br>'),
                    }}
                    onInput={(event) => {
                        handleFieldInput('description', event.currentTarget.innerText);
                    }}
                />
                <td className="align-middle">
                    {isEdit ? (
                        <Form.Group>
                            <Form.Check
                                checked={isObjectTypeLine === false}
                                type="radio"
                                name={'objectType' + id}
                                id={'notLine' + id}
                                label="Нелинейный"
                                onChange={() => {
                                    changeObjectType({ isObjectTypeLine: false });
                                }}
                            />
                            <Form.Check
                                checked={isObjectTypeLine === true}
                                type="radio"
                                name={'objectType' + id}
                                id={'Line' + id}
                                label="Линейный"
                                onChange={() => {
                                    changeObjectType({ isObjectTypeLine: true });
                                }}
                            />
                        </Form.Group>
                    ) : (
                        objectTypeCellData
                    )}
                </td>
                <td className="align-middle">
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

export default ScenarioItemEditor;
