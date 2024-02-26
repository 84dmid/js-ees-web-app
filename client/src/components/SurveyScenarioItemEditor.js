import React, { useState, useRef } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

import DeletingModalWindow from './DeletingModalWindow.js';
import {
    deleteSurveyScenario,
    moveDownSurveyScenario,
    moveUpSurveyScenario,
    updateSurveyScenario,
} from '../http/surveyScenarioAPI.js';

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

const SurveyScenarioItemEditor = ({
    id,
    name,
    description,
    setScenarioEditingToggle,
    isProduction,
    isObjectTypeLine,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [showDeletingWindow, setShowDeletingWindow] = useState(false);
    const [surveyScenario, setSurveyScenario] = useState({ name, description });
    const [valid, setValid] = useState(defaultValid);

    const tempSurveyScenario = useRef({});

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
        tempSurveyScenario[field] = value;
        setValid((prevValid) => ({ ...prevValid, [field]: isValid[field](value) }));
    };

    const getForm = (type, key) => {
        return (
            <Form.Control
                type={type}
                as={type === 'textarea' ? 'textarea' : undefined}
                value={surveyScenario[key]}
                onChange={(event) => {
                    setSurveyScenario({ ...surveyScenario, [key]: event.target.value });
                }}
            />
        );
    };

    const handleEditClick = () => {
        if (isEdit) {
            if (valid.name === false || valid.description === false) return;
            updateSurveyScenario(id, { ...surveyScenario, ...tempSurveyScenario })
                .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
                .catch((error) =>
                    console.error(`Survey scenario updating error: ${error}`)
                );
            setIsEdit(false);
        } else {
            setIsEdit(true);
            setValid(defaultValid);
        }
    };

    const deleteCallback = () => {
        deleteSurveyScenario(id)
            .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Survey scenario deleting error: ${error}`));
    };

    const handleDeleteClick = () => {
        if (isEdit) return;
        setShowDeletingWindow(true);
    };

    const moveUp = () => {
        moveUpSurveyScenario(id)
            .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Survey scenario moving up error: ${error}`));
    };

    const moveDown = () => {
        moveDownSurveyScenario(id)
            .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Variant moving down error: ${error}`));
    };

    const handleCheck = (event) => {
        updateSurveyScenario(id, { isProduction: event.target.checked })
            .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Survey scenario updating error: ${error}`));
    };

    const changeObjectType = (objectTypeData) => {
        updateSurveyScenario(id, objectTypeData)
            .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Survey scenario updating error: ${error}`));
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
                        __html: surveyScenario.name?.replace(/\n/g, '<br>'),
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
                        __html: surveyScenario.description?.replace(/\n/g, '<br>'),
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

export default SurveyScenarioItemEditor;
