import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, Col, Row, Container } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import { createScenario, fetchScenarios } from '../http/scenarioAPI.js';
import SurveyScenarioItemEditor from './ScenarioItemEditor.js';

const ScenariosEditor = () => {
    const [fetching, setFetching] = useState(true);
    const { isLoading } = useContext(AppContext);
    const [scenarios, setScenarios] = useState([]);
    const [scenarioEditingToggle, setScenarioEditingToggle] = useState(false);

    useEffect(() => {
        fetchScenarios()
            .then((data) => {
                setScenarios(data);
            })
            .catch((error) => console.error(`Survey scenarios fetching error: ${error}`))
            .finally(() => setFetching(false));
    }, [scenarioEditingToggle]);

    useEffect(() => {
        isLoading.state = fetching;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    const handleCreateClick = () => {
        createScenario({ name: 'new', description: '-' })
            .then(() => setScenarioEditingToggle((prevToggle) => !prevToggle))
            .catch((error) => console.error(`Survey scenario creating error: ${error}`))
            .finally(() => setFetching(false));
    };

    const scenariosList = scenarios.map((item) => {
        return (
            <SurveyScenarioItemEditor
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                isObjectTypeLine={item.isObjectTypeLine}
                isProduction={item.isProduction}
                setScenarioEditingToggle={setScenarioEditingToggle}
            />
        );
    });

    return (
        <>
            <Container fluid>
                <Row className="border-top border-bottom pb-2 mb-2">
                    <Col sm={9}>
                        <h4>Редактор вариантов состава изысканий (сценариев)</h4>
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
                        <th></th>
                        <th className="align-middle text-center">
                            Наименование сценария
                        </th>
                        <th className="align-middle text-center">Описание</th>
                        <th className="align-middle text-center">Тип объекта</th>
                        <th className="align-middle text-center">Опции</th>
                    </tr>
                </thead>
                <tbody>{!!scenarios.length && scenariosList}</tbody>
            </Table>
            {!!scenarios.length || <p>Варианты составов отсутствуют</p>}
        </>
    );
};

export default ScenariosEditor;
