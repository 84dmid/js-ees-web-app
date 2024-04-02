import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { AppContext } from './AppContext';
import ProjectProgram from './ProjectProgram';
import ProjectProgramInfoFieldset1 from './ProjectProgramInfoFieldset1';
import ProjectProgramInfoFieldset2 from './ProjectProgramInfoFieldset2';

const ProjectProgramModalEditor = observer(({ show, setShow }) => {
    const { catalog } = useContext(AppContext);
    const [stepNumber, setStepNumber] = useState(1);

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const getPrevStep = () => {
        if (stepNumber === 1) return;
        setStepNumber((prevStep) => prevStep - 1);
    };

    const handleNextStep = () => {
        setStepNumber((prevStep) => prevStep + 1);
    };

    return (
        <Modal size="lg" fullscreen="sm-down" show={show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="text-muted">
                    Формирование программы изысканий (шаг {stepNumber} из 4 )
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {stepNumber === 1 && <ProjectProgramInfoFieldset1 />}
                    {stepNumber === 2 && <ProjectProgramInfoFieldset2 />}
                    {stepNumber === 3 && <ProjectProgram />}
                </Form>
            </Modal.Body>
            <Modal.Footer className="bg-light">
                <>
                    <Button style={{ width: '7em' }} onClick={getPrevStep}>
                        🠜 Назад{' '}
                    </Button>
                    <Button style={{ width: '7em' }} onClick={handleNextStep}>
                        Вперёд 🠞
                    </Button>
                </>

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

export default ProjectProgramModalEditor;
