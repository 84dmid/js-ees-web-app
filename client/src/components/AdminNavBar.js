import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AdminNavBar = () => {
    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Nav variant="underline" className="flex-column">
                <NavLink to="/admin/edit/catalog" className="nav-link">
                    Редактор каталога
                </NavLink>
                <NavLink to="/admin/edit/surveyScenarios" className="nav-link">
                    Редактор базовых вариантов состава изысканий
                </NavLink>
                <NavLink to="/admin/edit/objectTypes" className="nav-link">
                    Редактор типов объекта
                </NavLink>
                <NavLink to="/admin/edit/handlers" className="nav-link">
                    Редактор обработчиков количества единиц измерения
                </NavLink>
                <NavLink to="/admin/statistics" className="nav-link ">
                    Статистика
                </NavLink>
            </Nav>
        </Navbar>
    );
};

export default AdminNavBar;
