import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { AppContext } from '../components/AppContext.js';
import { fetchSurveys } from '../http/catalogAPI.js';
import SurveyFilterBar from '../components/SurveyFilterBar.js';

const SurveyCatalog = observer(() => {
    const { catalog, isLoading } = useContext(AppContext);

    const [surveysFetching, setSurveysFetching] = useState(true);

    useEffect(() => {
        fetchSurveys()
            .then((data) => (catalog.surveys = data))
            .finally(() => setSurveysFetching(false));
        // eslint-disable-next-line
    }, []);

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
                    <h3 className="text-muted"> Каталог исследований</h3>
                    {surveysFetching ? (isLoading.state = true) : <div>surveysBar</div>}
                </Col>
            </Row>
        </Container>
    );
});

export default SurveyCatalog;
