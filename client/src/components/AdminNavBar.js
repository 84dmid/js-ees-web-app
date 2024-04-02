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
                    Редактор сценариев
                </NavLink>
                <NavLink to="/admin/edit/region" className="nav-link">
                    Редактор регионов
                </NavLink>
                <NavLink to="/admin/statistics" className="nav-link ">
                    Статистика
                </NavLink>
            </Nav>
        </Navbar>
    );
};

export default AdminNavBar;
