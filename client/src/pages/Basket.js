import React, { useContext } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import BasketCatalog from '../components/BasketCatalog.js';
import { AppContext } from '../components/AppContext.js';
import basketAPI from '../http/basketAPI.js';

const Basket = observer(() => {
    const { basket } = useContext(AppContext);

    const clearBasket = () => {
        basketAPI
            .clear()
            .catch((error) => console.error(`Clearing basket error: ${error}`))
            .then((data) => {
                basket.isObjectTypeLine = data.isObjectTypeLine;
                basket.lendAreaInSqM = data.lendAreaInSqM;
                basket.trackWidthInM = data.trackWidthInM;
                basket.trackLengthInM = data.trackLengthInM;
                basket.testingSitesNumberPerFiveHa = data.testingSitesNumberPerFiveHa;
                basket.variants = data.basketVariants;
            });
    };

    if (!basket.variants.length) {
        return (
            <Container fluid>
                <h2>Корзина</h2>
                <p>Корзина пуста</p>
            </Container>
        );
    }

    return (
        <Container fluid>
            <Row>
                <Col lg={2} className="mb-3 bg-body-tertiary">
                    <div>
                        <p className="lead">
                            <strong>Инструменты заказчика изысканий</strong>
                        </p>
                        <Button variant="outline-primary" className="mb-2 mt-2 w-100">
                            Получить ссылку на состав проекта
                        </Button>
                        <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                            Сформировать техническое задание на изыскания
                        </Button>
                        <Button variant="outline-primary" className="mb-2 mt-2 w-100">
                            Сформировать запрос на КП
                        </Button>
                        <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                            Получить ссылку на запрос КП
                        </Button>
                        <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                            Запросить КП через сайт
                        </Button>
                        <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                            Разместить запрос КП на тендере сайта
                        </Button>
                    </div>
                    <div>
                        <p className="lead">
                            <strong>Инструменты исполнителя изысканий</strong>
                        </p>
                    </div>
                    <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                        Сформировать КП
                    </Button>
                    <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                        Получить ссылку на КП
                    </Button>
                    <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                        Сформировать программу изысканий
                    </Button>
                    <Button variant="outline-secondary" className="mb-2 mt-2 w-100">
                        Сформировать таблицы для тома ИЭИ
                    </Button>
                </Col>
                <Col lg={10} className="mb-3">
                    {' '}
                    <Row>
                        <Col>
                            <h1>Проект изысканий</h1>
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-end">
                                <ButtonGroup>
                                    <Button
                                        onClick={clearBasket}
                                        variant="outline-primary"
                                    >
                                        Очистить проект
                                    </Button>
                                    <Button variant="outline-primary">
                                        Сохранить проект
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </Col>
                    </Row>
                    <BasketCatalog />
                </Col>
            </Row>
        </Container>
    );
});

export default Basket;
