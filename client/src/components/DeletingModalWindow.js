import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeletingModalWindow = ({ show, setShow, text, deleteFunction }) => {
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Запрос на удаление</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{text}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => deleteFunction()} variant="outline-danger">
                    Удалить
                </Button>
                <Button onClick={() => setShow(false)} variant="outline-primary">
                    Не удалять
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeletingModalWindow;
