import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    const emailStyle = {
        textDecoration: 'none',
        color: 'inherit',
    };

    const footerStyle = {
        opacity: 0.7,
    };

    return (
        <footer className="p-2 bg-dark text-light mt-auto">
            <Container fluid>
                <Row>
                    <Col>
                        <p className="m-0" style={footerStyle}>
                            Email:{' '}
                            <a
                                href="mailto:lynx_84@inbox.ru"
                                style={emailStyle}
                                onMouseOver={(e) =>
                                    (e.target.style.textDecoration = 'underline')
                                }
                                onMouseOut={(e) =>
                                    (e.target.style.textDecoration = 'none')
                                }
                            >
                                lynx_84@inbox.ru
                            </a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
