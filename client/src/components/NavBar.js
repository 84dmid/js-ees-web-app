import React, { useContext } from 'react';
import { Container, Navbar, Nav, Button, Spinner } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { logout } from '../http/userAPI.js';

import { AppContext } from './AppContext.js';

const NavBar = observer(() => {
    const { user, isLoading } = useContext(AppContext);

    const navigate = useNavigate();

    const handleLogout = (event) => {
        logout();
        user.logout();
        navigate('/login', { replace: true });
    };

    return (
        <Navbar bg="dark" variant="dark">
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
                    <NavLink to="/" className="nav-link">
                        Каталог
                    </NavLink>
                    <NavLink to="/research_processing" className="nav-link">
                        Обработка результатов исследований
                    </NavLink>
                    <NavLink to="/basket" className="nav-link">
                        Корзина
                    </NavLink>
                    {/* <NavLink to="/contacts" className="nav-link">
                        Контакты
                    </NavLink> */}
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
                            <NavLink to="/login" className="btn btn-primary">
                                Войти
                            </NavLink>
                        </>
                    )}
                    {user.isAuth && (
                        <Button onClick={handleLogout}>Выйти</Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;
