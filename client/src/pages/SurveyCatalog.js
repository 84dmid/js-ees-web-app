import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import FilterBar from '../components/FilterBar.js';
import Catalog from '../components/Catalog.js';

const SurveyCatalog = observer(() => {
    return (
        <Container fluid>
            <Row className="mt-2">
                <Col md={3} className="mb-3">
                    <FilterBar />
                </Col>
                <Col md={9} className="mb-3">
                    <Catalog />
                </Col>
            </Row>
        </Container>
    );
});

export default SurveyCatalog;
