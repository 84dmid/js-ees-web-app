import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ContractorsFilterBar from '../components/ContractorsFilterBar';
import ContractorsList from '../components/ContractorsList';
import { useEffect, useState } from 'react';

const Contractors = () => {
    const [fluid, setFluid] = useState(window.innerWidth <= 1800);

    useEffect(() => {
        const handleResize = () => {
            const isWindowSmall = window.innerWidth <= 1800;
            console.log(window.innerWidth);
            if (isWindowSmall !== fluid) {
                setFluid(isWindowSmall);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [fluid]);

    return (
        <div className={` ${fluid ? 'container-fluid' : 'container'}`}>
            <Row>
                <Col lg={3} className="bg-body-tertiary border">
                    <ContractorsFilterBar />
                </Col>
                <Col lg={9}>
                    <ContractorsList />
                </Col>
            </Row>
        </div>
    );
};

export default Contractors;
