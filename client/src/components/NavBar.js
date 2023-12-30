import React, { useContext } from 'react';
import { Container, Navbar, Nav, Button, Spinner } from 'react-bootstrap';
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
        <Navbar bg="dark" variant="dark" className="mb-2">
            <Container fluid>
                <NavLink to="/" className="navbar-brand">
                    Инженерно-экологические изыскания
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
                </NavLink>
                <Nav className="ml-auto">
                    <NavLink to="/" className="nav-link text-center">
                        Каталог
                    </NavLink>
                    {/* <NavLink to="/research_processing" className="nav-link text-center">
                        Обработка результатов исследований
                    </NavLink> */}
                    <NavLink to="/basket" className="nav-link text-center">
                        Корзина{' '}
                        {basket.count ? (
                            <span style={{ fontSize: '0.8em', whiteSpace: 'nowrap' }}>
                                <br /> {basket.count} /{' '}
                                {formatNumberWithSpaces(basket.sum)} ₽
                            </span>
                        ) : (
                            ''
                        )}
                    </NavLink>
                    {user.isAuth && user.isAdmin && (
                        <NavLink to="/admin" className="nav-link text-center">
                            Панель управления
                        </NavLink>
                    )}
                    {user.isAuth ? (
                        <>
                            <NavLink to="/user" className="nav-link text-center">
                                Личный кабинет
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="btn btn-primary">
                                Войти
                            </NavLink>
                        </>
                    )}
                    {user.isAuth && <Button onClick={handleLogout}>Выйти</Button>}
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;
