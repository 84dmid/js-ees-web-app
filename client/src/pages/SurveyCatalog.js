import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { AppContext } from '../components/AppContext.js';
import SurveyFilterBar from '../components/SurveyFilterBar.js';
import SurveyList from '../components/SurveyList.js';

const SurveyCatalog = observer(() => {
    const { catalog } = useContext(AppContext);

    return (
        <Container fluid>
            <Row className="mt-2">
                <Col md={3} className="mb-3">
                    <SurveyFilterBar
                        categories={catalog.categories}
                        subcategories={catalog.subcategories}
                        objectTypes={catalog.objectTypes}
                    />
                </Col>
                <Col md={9} className="mb-3">
                    <SurveyList />
                </Col>
            </Row>
        </Container>
    );
});

export default SurveyCatalog;
