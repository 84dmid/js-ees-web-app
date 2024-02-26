import React, { useContext } from 'react';
import {
    Container,
    Navbar,
    Nav,
    Button,
    Spinner,
    Row,
    Col,
    Stack,
} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import userAPI from '../http/userAPI.js';
import { AppContext } from './AppContext.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const NavBar = observer(() => {
    const { basket, user, isLoading } = useContext(AppContext);

    const navigate = useNavigate();

    const handleLogout = (event) => {
        userAPI.logout();
        user.logout();
        navigate('/login', { replace: true });
    };

    return (
        <Navbar bg="dark" variant="dark" className="mb-2 d-flex flex-column flex-sm-row">
            <Container fluid>
                <Stack>
                    <Row>
                        <Col lg={5}>
                            <Navbar.Brand>
                                <NavLink to="/" className="navbar-brand m-2 align-middle">
                                    Инженерно-экологические изыскания
                                </NavLink>
                            </Navbar.Brand>
                            <div
                                style={{
                                    width: '20px',
                                    marginLeft: '10px',
                                    display: 'inline-block',
                                }}
                            >
                                <Spinner
                                    animation={isLoading.state ? 'grow' : false}
                                    variant="secondary"
                                    size="sm"
                                />
                            </div>
                        </Col>
                        <Col>
                            <Nav className="w-100 d-flex justify-content-between flex-column flex-sm-row">
                                <NavLink to="/" className="nav-link">
                                    Каталог
                                </NavLink>

                                <NavLink to="/basket" className="nav-link">
                                    Корзина
                                    {basket.count ? (
                                        <span
                                            style={{
                                                fontSize: '0.8em',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            <br /> {basket.count} /{' '}
                                            {formatNumberWithSpaces(basket.sum)} ₽
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </NavLink>
                                {user.isAuth && user.isAdmin && (
                                    <NavLink to="/admin" className="nav-link">
                                        Панель управления
                                    </NavLink>
                                )}
                                {user.isAuth ? (
                                    <>
                                        <NavLink to="/user" className="nav-link">
                                            Личный кабинет
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink
                                            to="/login"
                                            className="btn btn-primary mt-sm-0"
                                        >
                                            Войти
                                        </NavLink>
                                    </>
                                )}

                                {user.isAuth && (
                                    <Button className="mt-sm-0" onClick={handleLogout}>
                                        Выйти
                                    </Button>
                                )}
                            </Nav>
                        </Col>
                    </Row>
                </Stack>
            </Container>
        </Navbar>
    );
});

export default NavBar;
