import React, { useState } from 'react';
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

const User = () => {
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
                        </Col>
                        <Col>
                            <Nav className="w-100 d-flex justify-content-between flex-column flex-sm-row">
                                <NavLink to="/" className="nav-link">
                                    Каталог
                                </NavLink>
                                <NavLink to="/basket" className="nav-link">
                                    Корзина
                                </NavLink>
                                <NavLink to="/admin" className="nav-link">
                                    Панель управления
                                </NavLink>
                                <NavLink to="/user" className="nav-link">
                                    Личный кабинет
                                </NavLink>
                                <Button className="mt-sm-0">Выйти</Button>
                            </Nav>
                        </Col>
                    </Row>
                </Stack>
            </Container>
        </Navbar>
    );
};

export default User;

// return (
//     <Navbar bg="dark" variant="dark" className="mb-2 d-flex flex-column flex-md-row">
//         <div className="d-flex">
//             <NavLink to="/" className="navbar-brand m-2">
//                 Инженерно-экологические изыскания
//             </NavLink>
//         </div>
//         <Nav className="w-100 d-flex flex-column flex-md-row">
//             <NavLink to="/" className="nav-link">
//                 Каталог
//             </NavLink>
//             <NavLink to="/basket" className="nav-link">
//                 Корзина
//             </NavLink>
//             <NavLink to="/admin" className="nav-link">
//                 Панель управления
//             </NavLink>
//             <NavLink to="/user" className="nav-link">
//                 Личный кабинет
//             </NavLink>
//         </Nav>
//         <Button className="mt-md-0 mt-2">Выйти</Button>
//     </Navbar>
// );
