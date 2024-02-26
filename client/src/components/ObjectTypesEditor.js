import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, Col, Row, Container, Side } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import ObjectTypeItemEditor from './ObjectTypeItemEditor.js';
import { createObjectType, fetchObjectTypes } from '../http/catalogAPI';

const ObjectTypesEditor = () => {
    const [fetching, setFetching] = useState(true);
    const { isLoading } = useContext(AppContext);
    const [objectTypes, setObjectTypes] = useState([]);
    const [objectTypeEditingToggle, setObjectTypeEditingToggle] = useState(false);

    useEffect(() => {
        fetchObjectTypes()
            .then((data) => {
                setObjectTypes(data);
            })
            .catch((error) => console.error(`ObjectTypes fetching error: ${error}`))
            .finally(() => setFetching(false));
    }, [objectTypeEditingToggle]);

    useEffect(() => {
        isLoading.state = fetching;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    const handleCreateClick = () => {
        createObjectType({ name: 'new type' })
            .then(() => setObjectTypeEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Type create error: ${error}`))
            .finally(() => setFetching(false));
    };

    const objectTypeList = objectTypes.map((item) => {
        return (
            <ObjectTypeItemEditor
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                setObjectTypeEditingToggle={setObjectTypeEditingToggle}
            />
        );
    });

    return (
        <>
            <Container fluid>
                <Row className="border-top border-bottom pb-2 mb-2">
                    <Col sm={9}>
                        <h3>Редактор типов объектов капитального строительства</h3>
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
                        <th></th>
                        <th className="align-middle text-center">Наименование</th>
                        <th className="align-middle text-center">Описание</th>
                        <th className="align-middle text-center">Опции</th>
                    </tr>
                </thead>
                <tbody>{!!objectTypes.length && objectTypeList}</tbody>
            </Table>
            {!!objectTypes.length || <p>Типы объектов отсутствуют</p>}
        </>
    );
};

export default ObjectTypesEditor;
