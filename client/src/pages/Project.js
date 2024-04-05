import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import BasketCatalog from '../components/BasketCatalog.js';
import { AppContext } from '../components/AppContext.js';
import basketAPI from '../http/basketAPI.js';
import ProjectTools from '../components/ProjectTools.js';

const Project = observer(() => {
    const { catalog } = useContext(AppContext);

    const clearBasket = () => {
        basketAPI
            .clear()
            .catch((error) => console.error(`Clearing basket error: ${error}`))
            .then((data) => {
                catalog.calcData = data;
                catalog.projectVariants = data.basketVariants;
            });
    };

    if (!catalog.projectVariants.length) {
        return (
            <Container fluid>
                <h1>Проект изысканий</h1>
                <p>Проект не заполнен, произведите расчёт состав изысканий.</p>
            </Container>
        );
    }

    return (
        <Container fluid>
            <Row>
                <Col lg={3} className="mb-3 bg-body-tertiary">
                    {<ProjectTools />}
                </Col>
                <Col lg={9} className="mb-3">
                    <Row>
                        <Col lg={5}>
                            <h1>Проект изысканий</h1>
                        </Col>
                        <Col lg={7}>
                            <div className="d-flex justify-content-between align-items-center">
                                <Link
                                    // size="lg"
                                    className="btn btn-outline-primary w-100 m-1"
                                    to="/constructor"
                                >
                                    Редактировать
                                </Link>
                                {/* <Button className="w-100 m-1" variant="outline-primary">
                                    Сохранить{' '}
                                </Button> */}
                                <Button
                                    className="w-100 m-1"
                                    onClick={clearBasket}
                                    variant="outline-primary"
                                >
                                    Очистить
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <BasketCatalog />
                </Col>
            </Row>
        </Container>
    );
});

export default Project;
