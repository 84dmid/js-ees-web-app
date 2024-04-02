import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectTaskFieldset5 = observer(() => {
    const { catalog } = useContext(AppContext);
    const pollutedAreaDataRef = useRef(null);
    const environmentalRestrictionsZoneDataRef = useRef(null);
    const surveysGoalsRef = useRef(null);
    const surveyTasksRef = useRef(null);
    const surveysTypeRef = useRef(null);

    useEffect(() => {
        if (pollutedAreaDataRef.current) {
            pollutedAreaDataRef.current.style.height = `${pollutedAreaDataRef.current.scrollHeight}px`;
        }
        if (environmentalRestrictionsZoneDataRef.current) {
            environmentalRestrictionsZoneDataRef.current.style.height = `${environmentalRestrictionsZoneDataRef.current.scrollHeight}px`;
        }
        if (surveysGoalsRef.current) {
            surveysGoalsRef.current.style.height = `${surveysGoalsRef.current.scrollHeight}px`;
        }
        if (surveyTasksRef.current) {
            surveyTasksRef.current.style.height = `${surveyTasksRef.current.scrollHeight}px`;
        }
        if (surveysTypeRef.current) {
            surveysTypeRef.current.style.height = `${surveysTypeRef.current.scrollHeight}px`;
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
            <p className="m-0">
                <Form.Text>
                    <span className="text-danger">* </span>
                    Все поля предзаполнены, вы можете вносить изменения или оставить как
                    есть.
                </Form.Text>
            </p>

            <Form.Label htmlFor="surveysType" className="mt-2 mb-1">
                Вид инженерных изысканий
            </Form.Label>
            <Form.Control
                id="surveysType"
                ref={surveysTypeRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.surveysType || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'surveysType');
                }}
                onBlur={(event) => formatText(event, 'surveysType')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.surveysType === true}
                isInvalid={catalog.projectValid.surveysType === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="surveysGoals" className="mt-2 mb-1">
                Цели инженерно-экологических изысканий
            </Form.Label>
            <Form.Control
                id="surveysGoals"
                ref={surveysGoalsRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.surveysGoals || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'surveysGoals');
                }}
                onBlur={(event) => formatText(event, 'surveysGoals')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.surveysGoals === true}
                isInvalid={catalog.projectValid.surveysGoals === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="surveyTasks" className="mt-2 mb-1">
                Задачи инженерно-экологических изысканий
            </Form.Label>
            <Form.Control
                id="surveyTasks"
                ref={surveyTasksRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.surveyTasks || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'surveyTasks');
                }}
                onBlur={(event) => formatText(event, 'surveyTasks')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.surveyTasks === true}
                isInvalid={catalog.projectValid.surveyTasks === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="pollutedAreaData" className="mb-1 mt-2">
                Наличие в границах участка изысканий территорий с ранее выявленным
                загрязнением окружающей среды
            </Form.Label>
            <Form.Control
                id="pollutedAreaData"
                ref={pollutedAreaDataRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.pollutedAreaData || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'pollutedAreaData');
                }}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                onBlur={(event) => formatText(event, 'pollutedAreaData')}
                isValid={catalog.projectValid.pollutedAreaData === true}
                isInvalid={catalog.projectValid.pollutedAreaData === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="environmentalRestrictionsZoneData" className="mt-2 mb-1">
                Наличие на участке зон с особым режимом природопользования (зон
                экологических ограничений)
            </Form.Label>
            <Form.Control
                id="environmentalRestrictionsZoneData"
                ref={environmentalRestrictionsZoneDataRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.environmentalRestrictionsZoneData || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'environmentalRestrictionsZoneData'
                    );
                }}
                onBlur={(event) => formatText(event, 'environmentalRestrictionsZoneData')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.environmentalRestrictionsZoneData === true}
                isInvalid={
                    catalog.projectValid.environmentalRestrictionsZoneData === false
                }
                autoComplete="off"
            />
        </fieldset>
    );
});

export default ProjectTaskFieldset5;
