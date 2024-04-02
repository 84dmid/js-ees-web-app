import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectTaskFieldset7 = observer(() => {
    const { catalog } = useContext(AppContext);

    const scientificSupportRequirementsRef = useRef(null);
    const accuracyRequirementsRef = useRef(null);
    const prepareProposalsAndRecommendationRef = useRef(null);
    const qualityControlRequirementsRef = useRef(null);
    const surveyResultsCompositionFormAndFormatRequirementsRef = useRef(null);

    useEffect(() => {
        if (scientificSupportRequirementsRef.current) {
            scientificSupportRequirementsRef.current.style.height = `${scientificSupportRequirementsRef.current.scrollHeight}px`;
        }
        if (accuracyRequirementsRef.current) {
            accuracyRequirementsRef.current.style.height = `${accuracyRequirementsRef.current.scrollHeight}px`;
        }
        if (prepareProposalsAndRecommendationRef.current) {
            prepareProposalsAndRecommendationRef.current.style.height = `${prepareProposalsAndRecommendationRef.current.scrollHeight}px`;
        }
        if (qualityControlRequirementsRef.current) {
            qualityControlRequirementsRef.current.style.height = `${qualityControlRequirementsRef.current.scrollHeight}px`;
        }
        if (surveyResultsCompositionFormAndFormatRequirementsRef.current) {
            surveyResultsCompositionFormAndFormatRequirementsRef.current.style.height = `${surveyResultsCompositionFormAndFormatRequirementsRef.current.scrollHeight}px`;
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

            <Form.Label htmlFor="scientificSupportRequirements" className="mt-2 mb-1">
                Требования о необходимости научного сопровождения инженерно-экологических
                изысканий
            </Form.Label>
            <Form.Control
                id="scientificSupportRequirements"
                ref={scientificSupportRequirementsRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.scientificSupportRequirements || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'scientificSupportRequirements'
                    );
                }}
                onBlur={(event) => formatText(event, 'scientificSupportRequirements')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.scientificSupportRequirements === true}
                isInvalid={catalog.projectValid.scientificSupportRequirements === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="accuracyRequirements" className="mt-2 mb-1">
                Требования к точности и обеспеченности необходимых данных и характеристик
                при инженерно-экологических изысканиях, превышающие предусмотренные
                требованиями НД обязательного применения
            </Form.Label>
            <Form.Control
                id="accuracyRequirements"
                ref={accuracyRequirementsRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.accuracyRequirements || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'accuracyRequirements');
                }}
                onBlur={(event) => formatText(event, 'accuracyRequirements')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.accuracyRequirements === true}
                isInvalid={catalog.projectValid.accuracyRequirements === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="prepareProposalsAndRecommendation" className="mt-2 mb-1">
                Требования о подготовке предложений и рекомендаций для принятия решений по
                организации инженерной защиты территории, зданий и сооружений от опасных
                природных и техногенных процессов и устранению или ослаблению их влияния
            </Form.Label>
            <Form.Control
                id="prepareProposalsAndRecommendation"
                ref={prepareProposalsAndRecommendationRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.prepareProposalsAndRecommendation || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'prepareProposalsAndRecommendation'
                    );
                }}
                onBlur={(event) => formatText(event, 'prepareProposalsAndRecommendation')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.prepareProposalsAndRecommendation === true}
                isInvalid={
                    catalog.projectValid.prepareProposalsAndRecommendation === false
                }
                autoComplete="off"
            />

            <Form.Label htmlFor="qualityControlRequirements" className="mt-2 mb-1">
                Требования по обеспечению контроля качества при выполнении
                инженерно-экологических изысканий
            </Form.Label>
            <Form.Control
                id="qualityControlRequirements"
                ref={qualityControlRequirementsRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.qualityControlRequirements || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'qualityControlRequirements');
                }}
                onBlur={(event) => formatText(event, 'qualityControlRequirements')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.qualityControlRequirements === true}
                isInvalid={catalog.projectValid.qualityControlRequirements === false}
                autoComplete="off"
            />

            <Form.Label
                htmlFor="surveyResultsCompositionFormAndFormatRequirements"
                className="mt-2 mb-1"
            >
                Требования к составу, форме и формату предоставления результатов
                инженерных изысканий, порядку их передачи заказчику
            </Form.Label>
            <Form.Control
                id="surveyResultsCompositionFormAndFormatRequirements"
                ref={surveyResultsCompositionFormAndFormatRequirementsRef}
                as="textarea"
                size="sm"
                rows={3}
                value={
                    catalog.generalData
                        .surveyResultsCompositionFormAndFormatRequirements || ''
                }
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'surveyResultsCompositionFormAndFormatRequirements'
                    );
                }}
                onBlur={(event) =>
                    formatText(event, 'surveyResultsCompositionFormAndFormatRequirements')
                }
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={
                    catalog.projectValid
                        .surveyResultsCompositionFormAndFormatRequirements === true
                }
                isInvalid={
                    catalog.projectValid
                        .surveyResultsCompositionFormAndFormatRequirements === false
                }
                autoComplete="off"
            />
        </fieldset>
    );
});

export default ProjectTaskFieldset7;
