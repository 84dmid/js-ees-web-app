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
    NavDropdown,
    Dropdown,
} from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import styles from './styles.css';
import userAPI from '../http/userAPI.js';
import { AppContext } from './AppContext.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const customStyles = {
    '&::after': {
        display: 'none !important',
    },
};

const NavBar = observer(() => {
    const { catalog, user, isLoading } = useContext(AppContext);

    const navigate = useNavigate();

    const handleLogout = (event) => {
        userAPI.logout();
        user.logout();
        navigate('/login', { replace: true });
    };

    return (
        <Navbar
            style={{ fontSize: '1.2em' }}
            // bg="dark"
            // variant="dark"
            bg="dark"
            data-bs-theme="dark"
            className="pb-0 pt-0"
        >
            <Container fluid>
                <Link to="/" className="nav-link">
                    <div
                        className="rounded-circle text-light bg-danger m-2"
                        style={{
                            top: '-9px',
                            right: '0px',
                            width: '2.2em',
                            height: '2.2em',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1.5em',
                            padding: '8px',
                        }}
                    >
                        ИИ
                    </div>
                </Link>
                <Nav className="d d-lg-none justify-content-between w-100 align-items-center">
                    <NavLink
                        to="/"
                        className="navbar-brand"
                        style={{
                            fontSize: '1.2em',
                            whiteSpace: 'normal',
                        }}
                    >
                        Инженерно-экологические изыскания
                    </NavLink>

                    <NavDropdown
                        align="end"
                        title={<List color="rgba(255, 255, 255, 0.8)" size={50} />}
                        id="navBarDropDawn"
                        // className="dropdown-toggle"
                        // style={customStyles}
                    >
                        <div style={{ fontSize: '1.1em' }}>
                            <Link className="dropdown-item" to="/constructor">
                                Конструктор изысканий
                            </Link>
                            <Link to="/project" className="dropdown-item">
                                Проект изысканий
                            </Link>

                            <Link to="/office_processing" className="dropdown-item">
                                Камеральная обработка
                            </Link>
                            <Link to="/tender" className="dropdown-item">
                                Тендер
                            </Link>
                            <Link to="/contractors" className="dropdown-item">
                                Подрядчики
                            </Link>
                            <NavDropdown.Divider />
                            <Link to="/cooperation" className="dropdown-item">
                                Стать подрядчиком
                            </Link>
                            <NavDropdown.Divider />
                            {user.isAuth && user.isAdmin && (
                                <Link to="/admin" className="dropdown-item">
                                    Админ-панель
                                </Link>
                            )}

                            {user.isAuth ? (
                                <>
                                    <Link to="/user" className="dropdown-item">
                                        Личный кабинет
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/signup" className="dropdown-item">
                                        Зарегистрироваться
                                    </Link>
                                    <Link to="/login" className="dropdown-item">
                                        Войти
                                    </Link>
                                </>
                            )}

                            {user.isAuth && (
                                <Link onClick={handleLogout} className="dropdown-item">
                                    Выйти
                                </Link>
                            )}
                        </div>
                    </NavDropdown>
                </Nav>

                <Stack className="d-none d-lg-inline">
                    <Row>
                        <Col mb={4}>
                            <Navbar.Brand>
                                <NavLink
                                    to="/"
                                    className="navbar-brand m-2 align-middle"
                                    style={{ fontSize: '1.2em' }}
                                >
                                    <span className="d-none d-sm-inline">
                                        Инженерно-экологические изыскания
                                    </span>
                                    <span className="d-inline d-sm-none">
                                        Экологические изыскания
                                    </span>
                                </NavLink>
                            </Navbar.Brand>
                        </Col>
                        <Col mb={8}>
                            <Nav className="justify-content-end flex-column flex-sm-row">
                                {user.isAuth && user.isAdmin && (
                                    <NavLink to="/admin" className="nav-link pt-1 pb-1 ">
                                        Админ-панель
                                    </NavLink>
                                )}

                                {user.isAuth ? (
                                    <>
                                        <NavLink
                                            to="/user"
                                            className="nav-link pt-1 pb-1 "
                                        >
                                            Личный кабинет
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink
                                            to="/signup"
                                            className="nav-link pt-1 pb-1 "
                                        >
                                            Зарегистрироваться
                                        </NavLink>
                                        <NavLink
                                            to="/login"
                                            className="nav-link pt-1 pb-1 "
                                        >
                                            Войти
                                        </NavLink>
                                    </>
                                )}

                                {user.isAuth && (
                                    <Button
                                        className="nav-link pt-1 pb-1 text-start"
                                        variant="dark"
                                        onClick={handleLogout}
                                    >
                                        Выйти
                                    </Button>
                                )}
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Nav className="w-100 d-flex justify-content flex-column flex-sm-row">
                                <NavLink
                                    to="/constructor"
                                    className="nav-link pt-1 pb-1"
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    <span className="d-none d-xl-inline">
                                        Конструктор изысканий
                                    </span>
                                    <span className="d-inline d-xl-none">
                                        Конструктор
                                    </span>
                                </NavLink>
                                <NavLink
                                    to="/project"
                                    className="nav-link pt-1 pb-1 position-relative"
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    Проект изысканий
                                    <div
                                        style={{
                                            position: 'absolute',
                                            border: '1.5px solid rgba(255, 0, 0, 0.7)', // Установка границы и цвета границы                                            border: '1px solid rgba(250, 255, 255, 0.1)',
                                            top: '-7px',
                                            right: '0px',
                                            display:
                                                catalog.projectVariants.length > 0
                                                    ? 'block'
                                                    : 'none',
                                            fontSize: '0.5em',
                                        }}
                                        className="bg-dark rounded p-2 p-2 pt-0 pb-0"
                                    >
                                        {catalog.projectVariants.length} /{' '}
                                        {formatNumberWithSpaces(catalog.projectPrice)} ₽
                                    </div>
                                </NavLink>

                                <NavLink to="/contractors" className="nav-link pt-1 pb-1">
                                    Подрядчики
                                </NavLink>
                                <NavLink
                                    to="/office_processing"
                                    className="nav-link pt-1 pb-1"
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    Камеральная обработка
                                </NavLink>
                                <NavLink to="/tender" className="nav-link pt-1 pb-1">
                                    Тендер
                                </NavLink>
                                <NavLink
                                    to="/cooperation"
                                    className="nav-link pt-1 pb-1"
                                    style={{ whiteSpace: 'nowrap' }}
                                    // className="btn btn-outline-light pt-1 pb-1"
                                >
                                    Стать подрядчиком
                                </NavLink>
                            </Nav>
                        </Col>
                    </Row>
                </Stack>
            </Container>
        </Navbar>
    );
});

export default NavBar;
