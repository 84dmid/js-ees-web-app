import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useEffect } from 'react';
import { Form, Row } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectProgramInfoFieldset2 = observer(() => {
    const { catalog } = useContext(AppContext);

    function createRefs(fieldList) {
        const refs = {};
        fieldList.forEach((fieldName) => {
            refs[fieldName] = useRef(null);
        });
        return refs;
    }

    const fieldNames = [
        'programDeviationsJustification',
        'impactZoneJustification',
        'studyAreaBoundariesJustification',
        'environmentalAssessmentCriteria',
    ];

    const refs = createRefs(fieldNames);

    useEffect(() => {
        Object.keys(refs).forEach((fieldName) => {
            if (refs[fieldName].current) {
                refs[
                    fieldName
                ].current.style.height = `${refs[fieldName].current.scrollHeight}px`;
            }
        });
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
            <Form.Label htmlFor="programDeviationsJustification" className="mb-1 mt-2">
                Обоснование отступлений от требований программы при их наличии
            </Form.Label>
            <Form.Control
                id="programDeviationsJustification"
                ref={refs.programDeviationsJustification}
                as="textarea"
                rows={3}
                value={catalog.generalData.programDeviationsJustification || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'programDeviationsJustification'
                    );
                }}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                onBlur={(event) => formatText(event, 'programDeviationsJustification')}
                isValid={catalog.projectValid.programDeviationsJustification === true}
                isInvalid={catalog.projectValid.programDeviationsJustification === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="impactZoneJustification" className="mb-1 mt-2">
                Обоснование предполагаемых границ зоны воздействия объекта капитального
                строительства
            </Form.Label>
            <Form.Control
                id="impactZoneJustification"
                ref={refs.impactZoneJustification}
                as="textarea"
                rows={3}
                value={catalog.generalData.impactZoneJustification || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'impactZoneJustification');
                }}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                onBlur={(event) => formatText(event, 'impactZoneJustification')}
                isValid={catalog.projectValid.impactZoneJustification === true}
                isInvalid={catalog.projectValid.impactZoneJustification === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="studyAreaBoundariesJustification" className="mb-1 mt-2">
                Обоснование границ изучаемой территории при выполнении
                инженерно-экологических изысканий
            </Form.Label>
            <Form.Control
                id="studyAreaBoundariesJustification"
                ref={refs.studyAreaBoundariesJustification}
                as="textarea"
                rows={3}
                value={catalog.generalData.studyAreaBoundariesJustification || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'studyAreaBoundariesJustification'
                    );
                }}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                onBlur={(event) => formatText(event, 'studyAreaBoundariesJustification')}
                isValid={catalog.projectValid.studyAreaBoundariesJustification === true}
                isInvalid={
                    catalog.projectValid.studyAreaBoundariesJustification === false
                }
                autoComplete="off"
            />

            <Form.Label htmlFor="environmentalAssessmentCriteria" className="mt-2 mb-1">
                Критерии оценки состояния окружающей среды, включая загрязнения отдельных
                компонентов среды (значения, установленные нормативными и/или
                методическими документами) с обоснованием и ссылкой на соответствующие
                документы
            </Form.Label>
            <Form.Control
                id="environmentalAssessmentCriteria"
                ref={refs.environmentalAssessmentCriteria}
                as="textarea"
                rows={3}
                value={catalog.generalData.environmentalAssessmentCriteria || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'environmentalAssessmentCriteria'
                    );
                }}
                onBlur={(event) => formatText(event, 'environmentalAssessmentCriteria')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.environmentalAssessmentCriteria === true}
                isInvalid={catalog.projectValid.environmentalAssessmentCriteria === false}
                autoComplete="off"
            />
        </fieldset>
    );
});

export default ProjectProgramInfoFieldset2;
