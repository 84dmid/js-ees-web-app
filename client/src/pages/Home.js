import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CalculatorButton from '../components/EESCalculatorComponents/CalculatorButton';

const Home = () => {
    return (
        <Container className="pt-3">
            <Row>
                <Col xl={5}>
                    <h1 className="mb-2">Возможности сайта</h1>
                </Col>
                <Col xl={7}>
                    <div className="w-100" style={{ fontSize: '1.2em' }}>
                        <CalculatorButton
                            name="Рассчитать состав и ориентировочную стоимость изысканий"
                            size="lg"
                            variant="primary"
                            className="w-100 mb-2"
                        />
                    </div>
                </Col>
            </Row>
            {/* <p style={{ fontSize: '1.3em' }}>
                    Сайт создан для упрощения взаимодействий между заказчиками
                    инженерно-экологических изысканий и подрядчиками, а также для
                    стандартизации и повышения качества выполняемых в ходе изысканий
                    работ.
                </p> */}
            {/* <p style={{ fontSize: '1.3em' }}>
                        Мы помогаем заказчику и подрядчику найти друг друга.
                    </p> */}
            <p style={{ fontSize: '1.2em' }}>
                Сайт создан для автоматизации расчётов на этапах составления задания и
                программы изысканий, камеральной обработки лабораторных исследований, а
                также для поиска подрядчиков для выполнения изысканий и проведения
                экспертизы.
            </p>

            <div className="bg-light rounded p-4 pt-3 pb-3 mb-3 border">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Для заказчика</h2>
                </div>
                <ul style={{ fontSize: '1.2em' }}>
                    <li>
                        Авторасчёт состава инженерно-экологических изысканий с
                        обоснованием объёма каждого исследования.
                    </li>
                    <li>
                        Авторасчёт ориентировочной стоимости инженерно-экологических
                        изысканий.
                    </li>
                    <li>
                        Формирование технического задания на инженерно-экологические
                        изыскания.
                    </li>
                    <li>
                        Формирование подробного запроса на коммерческое предложение для
                        инженерно-экологических изысканий.
                    </li>
                    <li>Поиск подрядчика для проведения инженерных изысканий.</li>
                    <li>
                        Поиск подрядчика для проведения экспертизы инженерных изысканий.
                    </li>
                </ul>
            </div>
            <div className=" bg-light rounded p-4 pt-3 pb-3 mb-3 border">
                <h2>Для подрядчика</h2>
                <ul style={{ fontSize: '1.2em' }}>
                    <li>
                        Размещение на сайте в качестве подрядчика (см. вкладку{' '}
                        <Link /*className="text-muted"*/>стать подрядчиком</Link>
                        ).
                    </li>
                    <li>
                        Авторасчёт состава изысканий с обоснованием объёма каждого
                        исследования в <Link>конструкторе изысканий</Link>.
                    </li>
                    <li>
                        Формирование подробного коммерческого предложения по собственному
                        прайс-листу.
                    </li>
                    <li>
                        Формирование технического задания и программы на
                        инженерно-экологические изыскания.
                    </li>

                    <li>Камеральная обработка лабораторных исследований.</li>
                    <li>
                        Формирование таблиц для тома инженерно-экологических изысканий.
                    </li>
                    <li>Поиск субподрядчиков на отдельные виды работ.</li>
                </ul>
            </div>
            <div className=" bg-light rounded p-4 pt-3 pb-3 mb-3 border">
                <h2>Для экспертных организаций и экспертов</h2>
                <ul style={{ fontSize: '1.3em' }}>
                    <li>
                        Размещение на сайте в качестве подрядчика (см. вкладку{' '}
                        <Link /*className="text-muted"*/>стать подрядчиком</Link>
                        ).
                    </li>
                    <li>
                        Проверка правильности расчёта объёма отдельных видов работ в{' '}
                        <Link /*className="text-muted"*/>конструкторе изысканий</Link>.
                    </li>
                    <li>
                        Проверка правильности камеральной обработки результатов
                        исследований (см. вкладку{' '}
                        <Link /*className="text-muted"*/>камеральная обработка</Link>
                        ).
                    </li>
                </ul>
            </div>
            {/* 
                <p className="mb-2">
                    <strong>
                        Исполнители инженерно-экологических изысканий и отдельных видов
                        работ при помощи сайта могут:
                        Подрядные организации и исполнители отдельных видов работ могут:
                    </strong>
                </p> */}
        </Container>
    );
};

export default Home;
