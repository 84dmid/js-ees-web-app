import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectTaskFieldset6 = observer(() => {
    const { catalog } = useContext(AppContext);

    const existingAndPotentialSourcesOfEnvironmentalPollutionInfoRef = useRef(null);
    const estimatedTechnogenicImpactsOnEnvironmentRef = useRef(null);
    const plannedParametersOfTechnologicalProcessesRef = useRef(null);
    const possibleEmergenciesInfoRef = useRef(null);
    const surveysAdditionalRequirementsRef = useRef(null);

    useEffect(() => {
        if (existingAndPotentialSourcesOfEnvironmentalPollutionInfoRef.current) {
            existingAndPotentialSourcesOfEnvironmentalPollutionInfoRef.current.style.height = `${existingAndPotentialSourcesOfEnvironmentalPollutionInfoRef.current.scrollHeight}px`;
        }
        if (estimatedTechnogenicImpactsOnEnvironmentRef.current) {
            estimatedTechnogenicImpactsOnEnvironmentRef.current.style.height = `${estimatedTechnogenicImpactsOnEnvironmentRef.current.scrollHeight}px`;
        }
        if (plannedParametersOfTechnologicalProcessesRef.current) {
            plannedParametersOfTechnologicalProcessesRef.current.style.height = `${plannedParametersOfTechnologicalProcessesRef.current.scrollHeight}px`;
        }
        if (possibleEmergenciesInfoRef.current) {
            possibleEmergenciesInfoRef.current.style.height = `${possibleEmergenciesInfoRef.current.scrollHeight}px`;
        }
        if (surveysAdditionalRequirementsRef.current) {
            surveysAdditionalRequirementsRef.current.style.height = `${surveysAdditionalRequirementsRef.current.scrollHeight}px`;
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

            <Form.Label
                htmlFor="existingAndPotentialSourcesOfEnvironmentalPollutionInfo"
                className="mt-2 mb-1"
            >
                Сведения о существующих и возможных источниках загрязнения окружающей
                среды
            </Form.Label>
            <Form.Control
                id="existingAndPotentialSourcesOfEnvironmentalPollutionInfo"
                ref={existingAndPotentialSourcesOfEnvironmentalPollutionInfoRef}
                as="textarea"
                size="sm"
                rows={3}
                value={
                    catalog.generalData
                        .existingAndPotentialSourcesOfEnvironmentalPollutionInfo || ''
                }
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'existingAndPotentialSourcesOfEnvironmentalPollutionInfo'
                    );
                }}
                onBlur={(event) =>
                    formatText(
                        event,
                        'existingAndPotentialSourcesOfEnvironmentalPollutionInfo'
                    )
                }
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={
                    catalog.projectValid
                        .existingAndPotentialSourcesOfEnvironmentalPollutionInfo === true
                }
                isInvalid={
                    catalog.projectValid
                        .existingAndPotentialSourcesOfEnvironmentalPollutionInfo === false
                }
                autoComplete="off"
            />

            <Form.Label
                htmlFor="estimatedTechnogenicImpactsOnEnvironment"
                className="mt-2 mb-1"
            >
                Предполагаемые техногенные воздействия объекта на окружающую среду
            </Form.Label>
            <Form.Control
                id="estimatedTechnogenicImpactsOnEnvironment"
                ref={estimatedTechnogenicImpactsOnEnvironmentRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.estimatedTechnogenicImpactsOnEnvironment || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'estimatedTechnogenicImpactsOnEnvironment'
                    );
                }}
                onBlur={(event) =>
                    formatText(event, 'estimatedTechnogenicImpactsOnEnvironment')
                }
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={
                    catalog.projectValid.estimatedTechnogenicImpactsOnEnvironment === true
                }
                isInvalid={
                    catalog.projectValid.estimatedTechnogenicImpactsOnEnvironment ===
                    false
                }
                autoComplete="off"
            />

            <Form.Label
                htmlFor="plannedParametersOfTechnologicalProcesses"
                className="mt-2 mb-1"
            >
                Общие технические решения и основные параметры технологических процессов,
                планируемых к осуществлению в рамках градостроительной деятельности,
                необходимые для обоснования предполагаемых границ зоны воздействия объекта
            </Form.Label>
            <Form.Control
                id="plannedParametersOfTechnologicalProcesses"
                ref={plannedParametersOfTechnologicalProcessesRef}
                as="textarea"
                size="sm"
                rows={3}
                value={
                    catalog.generalData.plannedParametersOfTechnologicalProcesses || ''
                }
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'plannedParametersOfTechnologicalProcesses'
                    );
                }}
                onBlur={(event) =>
                    formatText(event, 'plannedParametersOfTechnologicalProcesses')
                }
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={
                    catalog.projectValid.plannedParametersOfTechnologicalProcesses ===
                    true
                }
                isInvalid={
                    catalog.projectValid.plannedParametersOfTechnologicalProcesses ===
                    false
                }
                autoComplete="off"
            />

            <Form.Label htmlFor="possibleEmergenciesInfo" className="mt-2 mb-1">
                Сведения о возможных аварийных ситуациях, типах аварий, мероприятиях по их
                предупреждению и ликвидации
            </Form.Label>
            <Form.Control
                id="possibleEmergenciesInfo"
                ref={possibleEmergenciesInfoRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.possibleEmergenciesInfo || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'possibleEmergenciesInfo');
                }}
                onBlur={(event) => formatText(event, 'possibleEmergenciesInfo')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.possibleEmergenciesInfo === true}
                isInvalid={catalog.projectValid.possibleEmergenciesInfo === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="surveysAdditionalRequirements" className="mt-2 mb-1">
                Дополнительные требования к производству изысканий
            </Form.Label>
            <Form.Control
                id="surveysAdditionalRequirements"
                ref={surveysAdditionalRequirementsRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.surveysAdditionalRequirements || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'surveysAdditionalRequirements'
                    );
                }}
                onBlur={(event) => formatText(event, 'surveysAdditionalRequirements')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.surveysAdditionalRequirements === true}
                isInvalid={catalog.projectValid.surveysAdditionalRequirements === false}
                autoComplete="off"
            />
        </fieldset>
    );
});

export default ProjectTaskFieldset6;
