import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectTaskFieldset1 = observer(() => {
    const { catalog } = useContext(AppContext);
    const workBasisRef = useRef(null);

    useEffect(() => {
        if (workBasisRef.current) {
            workBasisRef.current.style.height = `${workBasisRef.current.scrollHeight}px`;
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

    return (
        <fieldset>
            {/* <legend></legend> */}
            <Form.Label htmlFor="workBasis" className="mb-1">
                Основание для выполнения работ
            </Form.Label>
            <Form.Control
                id="workBasis"
                ref={workBasisRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.workBasis || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'workBasis');
                }}
                onBlur={(event) => formatText(event, 'workBasis')}
                isValid={catalog.projectValid.workBasis === true}
                isInvalid={catalog.projectValid.workBasis === false}
                placeholder="Реквизиты договора, государственного контракта и т.п..."
                style={{ overflow: 'hidden' }}
                autoComplete="off"
            />

            <Form.Label htmlFor="urbanDevelopmentActivityType" className="mt-2 mb-1">
                Вид градостроительной деятельности
            </Form.Label>
            <Form.Select
                id="urbanDevelopmentActivityType"
                value={catalog.generalData.urbanDevelopmentActivityType || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'urbanDevelopmentActivityType'
                    );
                    handleChange(null, null, 'surveyStage');
                }}
                isValid={catalog.projectValid.urbanDevelopmentActivityType === true}
                isInvalid={catalog.projectValid.urbanDevelopmentActivityType === false}
            >
                <option></option>
                <option value="Территориальное планирование, градостроительное зонирование, планировка территории">
                    Территориальное планирование, градостроительное зонирование,
                    планировка территории
                </option>
                <option value="Архитектурно-строительное проектирование">
                    Архитектурно-строительное проектирование
                </option>
                <option value="Строительство">Строительство</option>
                <option value="Реконструкция">Реконструкция</option>
            </Form.Select>

            {catalog.generalData.urbanDevelopmentActivityType ===
                'Архитектурно-строительное проектирование' && (
                <>
                    <Form.Label htmlFor="surveyStage" className="mt-2 mb-1">
                        Этап проведения инженерных изысканий
                    </Form.Label>
                    <Form.Select
                        id="surveyStage"
                        value={catalog.generalData.surveyStage || ''}
                        onChange={(event) => {
                            handleChange(event, event.target.value, 'surveyStage');
                        }}
                        isValid={catalog.projectValid.surveyStage === true}
                        isInvalid={catalog.projectValid.surveyStage === false}
                    >
                        <option></option>
                        <option value="Первый этап">Первый этап</option>
                        <option value="Второй этап">Второй этап</option>
                    </Form.Select>
                </>
            )}
        </fieldset>
    );
});

export default ProjectTaskFieldset1;
