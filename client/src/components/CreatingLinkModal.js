import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreatingLinkModal = ({ show, setShow, link }) => {
    const handleClose = () => setShow(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link).catch((error) => {
            console.error('Ошибка копирования ссылки: ', error);
        });
        setShow(false);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ссылка на проект изысканий</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    style={{ resize: 'none' }}
                    as="textarea"
                    readOnly
                    value={link}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Выйти
                </Button>
                <Button variant="primary" onClick={handleCopy}>
                    Копировать ссылку
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatingLinkModal;
