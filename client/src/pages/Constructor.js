import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import FilterBar from '../components/FilterBar.js';
import Catalog from '../components/Catalog.js';
import VariantAutoCalculator from '../components/VariantAutoCalculator.js';

const Constructor = observer(() => {
    return (
        <Container fluid>
            <Row>
                <Col lg={3} className="mb-3 bg-body-tertiary">
                    <VariantAutoCalculator />
                    <FilterBar />
                </Col>
                <Col lg={9} className="mb-3">
                    <Catalog />
                </Col>
            </Row>
        </Container>
    );
});

export default Constructor;
