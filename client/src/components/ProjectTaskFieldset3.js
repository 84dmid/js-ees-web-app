import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectTaskFieldset3 = observer(() => {
    const { catalog } = useContext(AppContext);
    const dangerousNaturalProcessesRef = useRef(null);
    const dangerousProductionProcessesRef = useRef(null);
    const objectPurposeRef = useRef(null);

    useEffect(() => {
        if (dangerousNaturalProcessesRef.current) {
            dangerousNaturalProcessesRef.current.style.height = `${dangerousNaturalProcessesRef.current.scrollHeight}px`;
        }
        if (dangerousProductionProcessesRef.current) {
            dangerousProductionProcessesRef.current.style.height = `${dangerousProductionProcessesRef.current.scrollHeight}px`;
        }
        if (objectPurposeRef.current) {
            objectPurposeRef.current.style.height = `${objectPurposeRef.current.scrollHeight}px`;
        }
    }, []);

    const formatText = (event, field) => {
        const text = event.target.value;
        const newText = text
            .split('\n')
            .filter((string) => string.trim() !== '')
            .map((string) => string.trim())
            .map((string) => string.replace(/\s+/g, ' '))
            .join('\n');
        runInAction(() => {
            catalog.generalData[field] = newText;
        });
    };

    const handleChange = (event, value, field) => {
        runInAction(() => {
            catalog.generalData[field] = value;
            catalog.setValid(field, value);
        });
        if (event && event.target.type === 'textarea') {
            event.target.style.height = 'auto';
            event.target.style.height = event.target.scrollHeight + 'px';
        }
    };

    const preventEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    return (
        <fieldset>
            <p className="mb-2">Идентификационные сведения об объекте:</p>
            <Form.Label htmlFor="objectPurpose">1. Назначение объекта</Form.Label>
            <Form.Control
                id="objectPurpose"
                as="textarea"
                ref={objectPurposeRef}
                size="sm"
                rows={1}
                value={catalog.generalData.purpose || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'purpose');
                }}
                onBlur={(event) => formatText(event, 'purpose')}
                isValid={catalog.projectValid.purpose === true}
                isInvalid={catalog.projectValid.purpose === false}
                style={{ overflow: 'hidden', resize: 'none' }}
                autoComplete="off"
                onKeyDown={preventEnter}
            />

            <Form.Label htmlFor="isTransportInfrastructure" className="mt-2 mb-1">
                2. Принадлежность к объектам транспортной инфраструктуры и к другим
                объектам, функционально-технологические особенности которых влияют на их
                безопасность
            </Form.Label>
            <Form.Select
                id="isTransportInfrastructure"
                value={catalog.generalData.isTransportInfrastructure || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'isTransportInfrastructure');
                }}
                isValid={catalog.projectValid.isTransportInfrastructure === true}
                isInvalid={catalog.projectValid.isTransportInfrastructure === false}
            >
                <option></option>
                <option value="Принадлежит">Да</option>
                <option value="Не принадлежит">Нет</option>
            </Form.Select>

            <Form.Label htmlFor="isDangerousNaturalProcesses" className="mt-2 mb-1">
                3. Возможность опасных природных процессов и явлений и техногенных
                воздействий на территории, на которой будут осуществляться строительство,
                реконструкция и эксплуатация здания или сооружения
            </Form.Label>
            <Form.Select
                id="isDangerousNaturalProcesses"
                value={catalog.generalData.isDangerousNaturalProcesses || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'isDangerousNaturalProcesses'
                    );

                    let text;
                    if (event.target.value === 'нет') {
                        text = 'Возможность отсутствует';
                    } else if (event.target.value === 'да') {
                        text = null;
                    } else {
                        text = 'Нет данных';
                    }
                    handleChange(null, text, 'dangerousNaturalProcesses');
                }}
                isValid={catalog.projectValid.isDangerousNaturalProcesses === true}
                isInvalid={catalog.projectValid.isDangerousNaturalProcesses === false}
            >
                <option></option>
                <option value="да">Да</option>
                <option value="нет">Нет</option>
                <option value="нет данных">Нет данных</option>
            </Form.Select>
            {catalog.generalData.isDangerousNaturalProcesses === 'да' && (
                <>
                    <Form.Label htmlFor="dangerousNaturalProcesses" className="mt-2 mb-1">
                        Опишите возможные опасные природные процессы и явления
                    </Form.Label>
                    <Form.Control
                        id="dangerousNaturalProcesses"
                        as="textarea"
                        size="sm"
                        ref={dangerousNaturalProcessesRef}
                        rows={3}
                        value={catalog.generalData.dangerousNaturalProcesses || ''}
                        onChange={(event) => {
                            handleChange(
                                event,
                                event.target.value,
                                'dangerousNaturalProcesses'
                            );
                        }}
                        onBlur={(event) => formatText(event, 'dangerousNaturalProcesses')}
                        isValid={catalog.projectValid.dangerousNaturalProcesses === true}
                        isInvalid={
                            catalog.projectValid.dangerousNaturalProcesses === false
                        }
                        style={{
                            overflow: 'hidden',
                            height: 'auto',
                        }}
                        autoComplete="off"
                    />
                </>
            )}

            <Form.Label htmlFor="isDangerousProductionProcesses" className="mt-2 mb-1">
                4. Принадлежность к опасным производственным объектам
            </Form.Label>
            <Form.Select
                id="isDangerousProductionProcesses"
                value={catalog.generalData.isDangerousProductionProcesses || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'isDangerousProductionProcesses'
                    );
                    let text;
                    if (event.target.value === 'нет') {
                        text = 'Не принадлежит';
                    } else if (event.target.value === 'да') {
                        text = null;
                    } else {
                        text = 'Нет данных';
                    }
                    handleChange(null, text, 'dangerousProductionProcesses');
                }}
                isValid={catalog.projectValid.isDangerousProductionProcesses === true}
                isInvalid={catalog.projectValid.isDangerousProductionProcesses === false}
            >
                <option></option>
                <option value="да">Да</option>
                <option value="нет">Нет</option>
                <option value="нет данных">Нет данных</option>
            </Form.Select>
            {catalog.generalData.isDangerousProductionProcesses === 'да' && (
                <>
                    <Form.Label
                        htmlFor="dangerousProductionProcesses"
                        className="mt-2 mb-1"
                    >
                        К каким опасным производственным объектам относится объект?
                    </Form.Label>
                    <Form.Control
                        id="dangerousProductionProcesses"
                        as="textarea"
                        ref={dangerousProductionProcessesRef}
                        size="sm"
                        rows={3}
                        value={catalog.generalData.dangerousProductionProcesses || ''}
                        onChange={(event) => {
                            handleChange(
                                event,
                                event.target.value,
                                'dangerousProductionProcesses'
                            );
                        }}
                        onBlur={(event) =>
                            formatText(event, 'dangerousProductionProcesses')
                        }
                        isValid={
                            catalog.projectValid.dangerousProductionProcesses === true
                        }
                        isInvalid={
                            catalog.projectValid.dangerousProductionProcesses === false
                        }
                        style={{
                            overflow: 'hidden',
                            height: 'auto',
                        }}
                    />
                </>
            )}

            <Form.Label htmlFor="fireDanger" className="mt-2 mb-1">
                5. Пожарная и взрывопожарная опасность
            </Form.Label>
            <Form.Select
                id="fireDanger"
                value={catalog.generalData.fireDanger || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'fireDanger');
                }}
                isValid={catalog.projectValid.fireDanger === true}
                isInvalid={catalog.projectValid.fireDanger === false}
            >
                <option></option>
                <option value="Не категорируется">Не категорируется</option>
                <option value="повышенная взрывопожароопасность (А)">
                    Повышенная взрывопожароопасность (А)
                </option>
                <option value="Взрывопожароопасность (Б)">
                    Взрывопожароопасность (Б)
                </option>
                <option value="Пожароопасность (В1 - В4)">
                    Пожароопасность (В1 - В4)
                </option>
                <option value="Умеренная пожароопасность (Г)">
                    Умеренная пожароопасность (Г)
                </option>
                <option value="Пониженная пожароопасность (Д)">
                    Пониженная пожароопасность (Д)
                </option>
            </Form.Select>

            <Form.Label htmlFor="isConstantPeoplePresence" className="mt-2 mb-1">
                6. Наличие помещений с постоянным пребыванием людей (более двух часов)
            </Form.Label>
            <Form.Select
                id="isConstantPeoplePresence"
                value={catalog.generalData.isConstantPeoplePresence || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'isConstantPeoplePresence');
                }}
                isValid={catalog.projectValid.isConstantPeoplePresence === true}
                isInvalid={catalog.projectValid.isConstantPeoplePresence === false}
            >
                <option></option>
                <option value="Есть">Да</option>
                <option value="Нет">Нет</option>
            </Form.Select>

            <Form.Label htmlFor="responsibilityLevel" className="mt-2 mb-1">
                7. Уровень ответственности
            </Form.Label>
            <Form.Select
                id="responsibilityLevel"
                value={catalog.generalData.responsibilityLevel || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'responsibilityLevel');
                }}
                isValid={catalog.projectValid.responsibilityLevel === true}
                isInvalid={catalog.projectValid.responsibilityLevel === false}
            >
                <option></option>
                <option value="I - повышенный">I - повышенный</option>
                <option value="II - нормальный">II - нормальный</option>
                <option value="III - пониженный">III - пониженный</option>
            </Form.Select>
        </fieldset>
    );
});

export default ProjectTaskFieldset3;
