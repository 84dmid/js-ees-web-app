import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import AdminNavBar from '../components/AdminNavBar.js';

const Admin = () => {
    return (
        <Container fluid>
            {/* <h3>Панель управления</h3> */}
            <Row className="mt-3 mb-3">
                <Col lg={3}>
                    <AdminNavBar />
                </Col>
                <Col lg={9}>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;
