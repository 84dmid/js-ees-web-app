import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import FilterBar from '../components/FilterBar.js';
import Catalog from '../components/Catalog.js';
import VariantAutoCalculator from '../components/VariantAutoCalculator.js';
import CalculatorButton from '../components/EESCalculatorComponents/CalculatorButton.js';
import CalculationInfoShortList from '../components/EESCalculatorComponents/CalculationInfoShortList.js';
import CalculationClearButton from '../components/EESCalculatorComponents/CalculationClearButton.js';

const Constructor = observer(() => {
    return (
        <Container fluid>
            <Row>
                <Col lg={3} className="pb-2 pt-2 bg-body-tertiary">
                    {/* <VariantAutoCalculator /> */}
                    <CalculatorButton
                        name="Рассчитать изыскания"
                        className="w-100 mb-2 text-start"
                        fontSize="1.2em"
                    />
                    <CalculationClearButton
                        variant="secondary"
                        className="w-100 mb-2 text-start"
                        fontSize="1.2em"
                    />
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
