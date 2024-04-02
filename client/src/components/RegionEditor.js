import React, { useContext } from 'react';
import { Table, Button, Col, Row, Container, Form } from 'react-bootstrap';

import regions from '../initData/regions.js';
import { AppContext } from './AppContext.js';

import {
    createRegion,
    createRegions,
    deleteRegion,
    updateRegion,
} from '../http/regionAPI.js';
import { observer } from 'mobx-react-lite';

const RegionEditor = observer(() => {
    const { regionEditor } = useContext(AppContext);

    const handleInit = (regions) => {
        createRegions(regions)
            .catch((error) => console.error(`Regions creating error: ${error}`))
            .then((data) => (regionEditor.regions = data));
    };

    const handleCreateClick = () => {
        createRegion({ name: 'new', isProduction: false })
            .catch((error) => console.error(`Region creating error: ${error}`))
            .then((data) => (regionEditor.regions = [...regionEditor.regions, data]));
    };

    const handleChange = (event) => {
        const id = event.target.id;
        const isProduction = event.target.checked;
        updateRegion(id, { isProduction })
            .catch((error) => console.error(`Region updating error: ${error}`))
            .then(
                (data) =>
                    (regionEditor.regions = regionEditor.regions.map((region) => {
                        if (region.id === data.id) {
                            return data;
                        } else {
                            return region;
                        }
                    }))
            );
    };

    const handleDeleteClick = (id) => {
        deleteRegion(id)
            .catch((error) => console.error(`Region deleting error: ${error}`))
            .then(
                (data) =>
                    (regionEditor.regions = regionEditor.regions.filter(
                        (region) => region.id !== data.id
                    ))
            );
    };

    const regionsList = regionEditor.regions.map((region) => {
        return (
            <tr key={region.id}>
                <td>{region.id}</td>
                <td>{region.name}</td>
                <td className="align-middle text-center">
                    <Form.Check
                        id={region.id}
                        checked={region.isProduction}
                        onChange={(event) => handleChange(event)}
                    />
                </td>
                <td className="align-middle text-center">
                    <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDeleteClick(region.id)}
                    >
                        ❌
                    </Button>
                </td>
            </tr>
        );
    });

    return (
        <>
            <Container fluid>
                <Row className="border-top border-bottom pb-2 mb-2">
                    <Col sm={9}>
                        <h4>Редактор регионов</h4>
                    </Col>
                    <Col sm={3}>
                        {regionEditor.regions.length === 0 ? (
                            <Button
                                className="w-100 mt-2"
                                variant="outline-primary"
                                onClick={() => handleInit(regions)}
                            >
                                Инициализация списка
                            </Button>
                        ) : (
                            <Button
                                className="w-100 mt-2"
                                variant="outline-primary"
                                onClick={handleCreateClick}
                            >
                                ➕ Создать
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>

            {regionEditor.regions.length === 0 ? (
                <p>В базе данных отсутствуют регионы</p>
            ) : (
                <Table size="sm" hover>
                    <thead>
                        <tr>
                            <th className="align-middle text-center">id</th>
                            <th className="align-middle text-center">
                                Наименование региона
                            </th>
                            <th className="align-middle text-center">Отобр.</th>
                            <th className="align-middle text-center">Опции</th>
                        </tr>
                    </thead>
                    <tbody>{regionsList}</tbody>
                </Table>
            )}
        </>
    );
});

export default RegionEditor;
