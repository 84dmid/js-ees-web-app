import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, Col, Row, Container } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import HandlerItemEditor from './HandlerItemEditor.js';
import { createHandler, fetchHandlers } from '../http/catalogAPI.js';

const HandlersEditor = () => {
    const [fetching, setFetching] = useState(true);
    const { isLoading } = useContext(AppContext);
    const [handlers, setHandlers] = useState([]);
    const [handlerEditingToggle, setHandlerEditingToggle] = useState(false);

    useEffect(() => {
        fetchHandlers()
            .then((data) => {
                setHandlers(data);
            })
            .catch((error) => console.error(`Handlers fetching error: ${error}`))
            .finally(() => setFetching(false));
    }, [handlerEditingToggle]);

    useEffect(() => {
        isLoading.state = fetching;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    const handleCreateClick = () => {
        createHandler({ name: 'new', description: '-' })
            .then(() => setHandlerEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Handler create error: ${error}`))
            .finally(() => setFetching(false));
    };

    const handlerList = handlers.map((item) => {
        return (
            <HandlerItemEditor
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                setHandlerEditingToggle={setHandlerEditingToggle}
            />
        );
    });

    return (
        <>
            <Container fluid>
                <Row className="border-top border-bottom pb-2 mb-2">
                    <Col sm={9}>
                        <h3>Редактор обработчиков вариантов</h3>
                    </Col>
                    <Col sm={3}>
                        <Button
                            className="w-100 mt-2"
                            variant="outline-primary"
                            onClick={handleCreateClick}
                        >
                            ➕ Создать
                        </Button>
                    </Col>
                </Row>
            </Container>

            <Table size="sm" hover>
                <thead>
                    <tr>
                        <th className="align-middle text-center">Имя</th>
                        <th className="align-middle text-center">Описание</th>
                        <th className="align-middle text-center">Опции</th>
                    </tr>
                </thead>
                <tbody>{!!handlers.length && handlerList}</tbody>
            </Table>
            {!!handlers.length || <p>Обработчики вариантов отсутствуют</p>}
        </>
    );
};

export default HandlersEditor;
