import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AdminNavBar = () => {
    return (
        <Navbar className="bg-body-tertiary justify-content-between">
            <Nav variant="underline" className="flex-column">
                <NavLink to="/admin/statistics" className="nav-link ">
                    Статистика
                </NavLink>
                <NavLink to="/admin/edit/catalog" className="nav-link">
                    Редактор каталога
                </NavLink>
            </Nav>
        </Navbar>
    );
};

export default AdminNavBar;
