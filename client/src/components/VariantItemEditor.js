import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import DeletingModalWindow from './DeletingModalWindow';
import VariantEditorAndCreatorModalWindow from './VariantEditorAndCreatorModalWindow';
import {
    deleteVariant,
    moveDownVariant,
    moveUpVariant,
    updateVariant,
} from '../http/catalogAPI';
import { AppContext } from './AppContext';
import { appendVariantToScenario, removeVariantFromScenario } from '../http/scenarioAPI';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const getIsVisible = (variantIsObjectTypeLint, scenarioIsObjectTypeLine) => {
    if (variantIsObjectTypeLint === null || scenarioIsObjectTypeLine === null)
        return true;
    if (variantIsObjectTypeLint === scenarioIsObjectTypeLine) {
        return true;
    } else {
        return false;
    }
};

const VariantItemEditor = observer(
    ({
        surveyId,
        surveyName,
        id,
        order,
        description,
        unit,
        isObjectTypeLine,
        unitPrice,
        setCatalogEditingToggle,
        isProduction,
    }) => {
        const { catalogEditor } = useContext(AppContext);
        const [isEdit, setIsEdit] = useState(false);
        const [showDeletingWindow, setShowDeletingWindow] = useState(false);
        const [isScenario, setIsScenario] = useState('');
        const [isVisible, setIsVisible] = useState('');

        useEffect(() => {
            if (Object.keys(catalogEditor.curScenario).length === 0) return;
            setIsScenario(catalogEditor.curScenario?.variantIds.includes(id));
            // eslint-disable-next-line
        }, [catalogEditor.curScenario]);

        useEffect(() => {
            if (Object.keys(catalogEditor.curScenario).length === 0) {
                setIsVisible(true);
            } else {
                setIsVisible(
                    getIsVisible(
                        isObjectTypeLine,
                        catalogEditor.curScenario.isObjectTypeLine
                    )
                );
            }
            // eslint-disable-next-line
        }, [catalogEditor.curScenario]);

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
            moveUpVariant(id, surveyId)
                .then(() => setCatalogEditingToggle((prevToggle) => !prevToggle))
                .catch((error) => console.error(`Variant moving up error: ${error}`));
        };

        const moveDown = () => {
            moveDownVariant(id, surveyId)
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

        const isDataForChangeScenarioCorrect = () => {
            if (isObjectTypeLine === null) return true;
            return catalogEditor.curScenario.isObjectTypeLine === isObjectTypeLine;
        };

        const handleChangeScenarioVariants = (event) => {
            if (!catalogEditor.curScenario.id) return;
            if (event.target.checked) {
                if (!isDataForChangeScenarioCorrect()) return;
                appendVariantToScenario(catalogEditor.curScenario.id, id)
                    .then((data) => {
                        // setIsScenario(true);
                        catalogEditor.curScenario = data;
                    })
                    .catch((error) => {
                        // alert(error.response.data.message);
                        console.error(error.response.data.message);
                        console.error(`Appending variant to scenario error: ${error}`);
                    });
            } else {
                removeVariantFromScenario(catalogEditor.curScenario.id, id)
                    .then((data) => {
                        // setIsScenario(false);
                        catalogEditor.curScenario = data;
                    })
                    .catch((error) =>
                        console.error(`Removing variant from scenario error: ${error}`)
                    );
            }
        };

        return (
            <>
                {isEdit && (
                    <VariantEditorAndCreatorModalWindow
                        show={isEdit}
                        setShow={setIsEdit}
                        updateVariant={updateVariant}
                        surveyId={surveyId}
                        setCatalogEditingToggle={setCatalogEditingToggle}
                        isEditorWindow={true}
                        id={id}
                        unit={unit}
                        isObjectTypeLine={isObjectTypeLine}
                        description={description}
                        unitPrice={unitPrice}
                        surveyName={surveyName}
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
                <tr key={id} style={{ display: isVisible ? 'table-row' : 'none' }}>
                    <td className="align-middle" style={{ width: '4em' }}>
                        <ButtonGroup size="sm">
                            <Button onClick={moveDown} variant="outline-secondary">
                                ↓
                            </Button>
                            <Button onClick={moveUp} variant="outline-secondary">
                                ↑
                            </Button>
                        </ButtonGroup>
                    </td>
                    <td className="align-middle" style={{ width: '2em' }}>
                        <Form.Check
                            id={id + 'check'}
                            onChange={handleCheck}
                            checked={isProduction}
                        />
                    </td>

                    <td className="align-middle">{description}</td>
                    <td className="align-middle text-center" style={{ width: '3em' }}>
                        <Form.Check
                            disabled={catalogEditor.curScenario.id ? false : true}
                            id={id + 'checkScenario'}
                            checked={isScenario}
                            onChange={handleChangeScenarioVariants}
                        />
                    </td>

                    <td className="text-center align-middle">{unit}</td>
                    <td
                        className="text-center align-middle"
                        style={{ width: '9em', whiteSpace: 'nowrap' }}
                    >
                        <b>{formatNumberWithSpaces(unitPrice)} ₽</b>
                    </td>
                    <td className="align-middle text-end" style={{ width: '5em' }}>
                        <ButtonGroup size="sm" className="w-100">
                            <Button
                                variant={isEdit ? 'primary' : 'outline-primary'}
                                onClick={handleEditClick}
                            >
                                ?
                            </Button>
                            <Button variant="outline-danger" onClick={handleDeleteClick}>
                                ❌
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            </>
        );
    }
);

export default VariantItemEditor;
