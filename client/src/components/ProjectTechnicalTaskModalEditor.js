import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import styles from './styles.css';

import basketAPI from '../http/basketAPI';
import { AppContext } from './AppContext';
import ProjectTaskFieldset1 from './ProjectTaskFieldset1';
import ProjectTaskFieldset2 from './ProjectTaskFieldset2';
import ProjectTaskFieldset3 from './ProjectTaskFieldset3';
import ProjectTaskFieldset4 from './ProjectTaskFieldset4';
import ProjectTaskFieldset5 from './ProjectTaskFieldset5';
import ProjectTaskFieldset6 from './ProjectTaskFieldset6';
import ProjectTechnicalTask from './ProjectTechnicalTask';
import ProjectTaskFieldset7 from './ProjectTaskFieldset7';
import ProjectTaskFieldset8 from './ProjectTaskFieldset8';
import ProjectContractorFieldset from './ProjectContractorFieldset';
import ProjectCustomerFieldset from './ProjectCustomerFieldset';
import ExampleDOCX from './ExampleDOCX';

const ProjectTechnicalTaskModalEditor = observer(({ show, setShow }) => {
    const { catalog } = useContext(AppContext);
    const [stepNumber, setStepNumber] = useState(0);
    const [isShowingTask, setIsShowingTask] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const getPrevStep = () => {
        if (stepNumber === 0) return;
        setStepNumber((prevStep) => prevStep - 1);
    };

    const isFieldsetValid = (fields) => {
        const validationResult = fields.map((field) =>
            catalog.setValid(field, catalog.generalData[field] || '')
        );
        const invalidFieldsNumber = validationResult.filter(
            (item) => item === false
        ).length;
        return invalidFieldsNumber > 0 ? false : true;
    };

    const fieldset = {
        1: ['workBasis', 'urbanDevelopmentActivityType', 'surveyStage'],
        2: [
            'name',
            'address',
            'cadastralNumber',
            'boundariesAreaData',
            'boundariesTrackData',
            'technicalCharacteristic',
        ],
        3: [
            'purpose',
            'isTransportInfrastructure',
            'isDangerousNaturalProcesses',
            'dangerousNaturalProcesses',
            'isDangerousProductionProcesses',
            'dangerousProductionProcesses',
            'fireDanger',
            'isConstantPeoplePresence',
            'responsibilityLevel',
        ],
        4: ['landUseAndLandowners', 'negativeImpactOnEnvironmentCategory'],
        5: [
            'pollutedAreaData',
            'environmentalRestrictionsZoneData',
            'surveysGoals',
            'surveyTasks',
            'surveysType',
            'existingAndPotentialSourcesOfEnvironmentalPollutionInfo',
        ],
        6: [
            'existingAndPotentialSourcesOfEnvironmentalPollutionInfo',
            'estimatedTechnogenicImpactsOnEnvironment',
            'plannedParametersOfTechnologicalProcesses',
            'possibleEmergenciesInfo',
            'surveysAdditionalRequirements',
        ],
        7: [
            'scientificSupportRequirements',
            'accuracyRequirements',
            'prepareProposalsAndRecommendation',
            'qualityControlRequirements',
            'surveyResultsCompositionFormAndFormatRequirements',
        ],
        8: ['regulatoryDocumentsList', 'customerSuppliedData'],
    };

    const handleNextStep = () => {
        if (stepNumber === 1 && !isFieldsetValid(fieldset['1'])) return;
        if (stepNumber === 2 && !isFieldsetValid(fieldset['2'])) return;
        if (stepNumber === 3 && !isFieldsetValid(fieldset['3'])) return;
        if (stepNumber === 4 && !isFieldsetValid(fieldset['4'])) return;
        if (stepNumber === 5 && !isFieldsetValid(fieldset['5'])) return;
        if (stepNumber === 6 && !isFieldsetValid(fieldset['6'])) return;
        if (stepNumber === 7 && !isFieldsetValid(fieldset['7'])) return;
        if (stepNumber === 8 && !isFieldsetValid(fieldset['8'])) return;

        if (stepNumber >= 1 && stepNumber <= 8) {
            basketAPI
                .updateParams({ generalData: catalog.generalData })
                .then(() => setStepNumber((prevStep) => prevStep + 1))
                .catch((error) =>
                    console.error(
                        `Updating project params (general data) error: ${error}`
                    )
                );
        } else if (stepNumber === 9) {
            basketAPI
                .updateParams({ customerData: catalog.customerData })
                .then(() => setStepNumber((prevStep) => prevStep + 1))
                .catch((error) =>
                    console.error(
                        `Updating project params (customer data) error: ${error}`
                    )
                );
        } else if (stepNumber === 10) {
            basketAPI
                .updateParams({ contractorData: catalog.contractorData })
                .then(() => setStepNumber((prevStep) => prevStep + 1))
                .catch((error) =>
                    console.error(
                        `Updating project params (contractor data) error: ${error}`
                    )
                );
        }
    };

    const getButtonBlock = () => {
        if (stepNumber === 0) {
            return (
                <>
                    {isShowingTask ? (
                        <ExampleDOCX />
                    ) : (
                        <Button onClick={() => setIsShowingTask(true)}>
                            Предпросмотр и скачивание
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            setIsShowingTask(false);
                            setStepNumber(1);
                        }}
                    >
                        Перейти в редактор
                    </Button>
                </>
            );
        } else if (stepNumber >= 1 && stepNumber <= 11) {
            return (
                <>
                    <Button style={{ width: '7em' }} onClick={getPrevStep}>
                        🠜 Назад{' '}
                    </Button>
                    <Button style={{ width: '7em' }} onClick={handleNextStep}>
                        Вперёд 🠞
                    </Button>
                </>
            );
        }
    };

    const firstStepContent = isShowingTask ? (
        <ProjectTechnicalTask />
    ) : (
        <div style={{ fontSize: '1.1em' }}>
            {/* <p>
                Для формирования технического задания прейдите в редактор. Также вы можете
                скачать задание, если вы его заполнили, или бланк задания, если не
                заполняли.
            </p> */}
            <p>
                Для формирования и редактирования технического задания прейдите в
                редактор.
            </p>
        </div>
    );

    return (
        <Modal
            size="lg"
            fullscreen="lg-down"
            show={show}
            onHide={handleClose}
            scrollable={true}
        >
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="text-muted">
                    Формирование технического задания (шаг {stepNumber} из 11 )
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {stepNumber === 0 && firstStepContent}
                    {stepNumber === 1 && <ProjectTaskFieldset1 />}
                    {stepNumber === 2 && <ProjectTaskFieldset2 />}
                    {stepNumber === 3 && <ProjectTaskFieldset3 />}
                    {stepNumber === 4 && <ProjectTaskFieldset4 />}
                    {stepNumber === 5 && <ProjectTaskFieldset5 />}
                    {stepNumber === 6 && <ProjectTaskFieldset6 />}
                    {stepNumber === 7 && <ProjectTaskFieldset7 />}
                    {stepNumber === 8 && <ProjectTaskFieldset8 />}

                    {stepNumber === 9 && <ProjectCustomerFieldset />}
                    {stepNumber === 10 && <ProjectContractorFieldset />}
                    {stepNumber === 11 && <ProjectTechnicalTask />}
                </Form>
            </Modal.Body>
            <Modal.Footer className="bg-light">
                {getButtonBlock()}

                {/* <Button variant="secondary" onClick={handleClose}>
                    Выйти без сохранения
                </Button>
                <Button variant="primary" onClick={() => {}}>
                    Предпросмотр ТЗ
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Сохранить изменения
                </Button>
                <Button variant="outline-primary" onClick={() => {}}>
                    Сформировать задание
                </Button> */}
            </Modal.Footer>
        </Modal>
    );
});

export default ProjectTechnicalTaskModalEditor;
