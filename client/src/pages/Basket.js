import React, { useContext } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import BasketCatalog from '../components/BasketCatalog.js';
import { AppContext } from '../components/AppContext.js';
import basketAPI from '../http/basketAPI.js';

const Basket = observer(() => {
    const { basket } = useContext(AppContext);

    const clearBasket = () => {
        basketAPI.clear().then((data) => (basket.variants = data.basketVariants));
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
                <Col>
                    <h2>Корзина</h2>
                </Col>
                <Col>
                    <div className="d-flex justify-content-end">
                        <ButtonGroup>
                            <Button onClick={clearBasket} variant="outline-primary">
                                Очистить корзину
                            </Button>
                            <Button variant="outline-primary">Создать проект</Button>
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <BasketCatalog />
                </Col>
            </Row>
        </Container>
    );
});

export default Basket;
