import React, { useState } from 'react';
import { Button, Card, Col, Row, Stack, Table } from 'react-bootstrap';
import img from './963e7f53-3fb1-40e6-a6ef-5f45802cb72d.jpg';

import {
    ChevronCompactDown,
    ChevronCompactUp,
    PersonFill,
    PeopleFill,
} from 'react-bootstrap-icons';

const ContractorsList = () => {
    const [showingCooperationTerms, setShowingCooperationTerms] = useState(false);

    const showCooperationTerms = () => {
        setShowingCooperationTerms(!showingCooperationTerms);
    };
    return (
        <div>
            <h1>Подрядчики</h1>
            <Card body={true} className="bg-light mt-3 mb-3">
                <Stack direction="horizontal" className="align-items-start" gap={3}>
                    <PersonFill size={60} color="grey" />
                    {/* <Card.Img
                        style={{ width: '60px', height: 'auto' }}
                        variant="top"
                        src={img}
                    /> */}
                    <div>
                        <h2
                            className="mb-1 h4"
                            onMouseOver={(e) =>
                                (e.target.style.textDecoration = 'underline')
                            }
                            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                            onClick={() => console.log('test')}
                        >
                            Ерёмин Дмитрий
                        </h2>
                        <p className="text-muted m-0">Самозанятый</p>
                    </div>
                </Stack>
                <Table className="mt-3 mb-1" variant="light" size="sm">
                    <thead>
                        <tr className="align-middle">
                            <th>
                                <h3 className="mb-0 h5">Компетенции</h3>
                            </th>
                            <th className="text-center small">Членство в СРО</th>
                            <th
                                className="text-end small"
                                style={{ paddingRight: '1em' }}
                            >
                                Цена
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Геодезические изыскания (ИГДИ)</td>
                            <td className="text-center">+</td>
                            <td className="text-end text-nowrap">95 000 ₽</td>
                        </tr>
                        <tr>
                            <td>Геологические изыскания (ИГИ)</td>
                            <td className="text-center position-relative">
                                +{' '}
                                <span
                                    className="text-danger position-absolute"
                                    style={{ paddingLeft: '0.25em' }}
                                >
                                    *
                                </span>
                            </td>
                            <td className="text-end text-nowrap">187 000 ₽</td>
                        </tr>
                        <tr>
                            <td>Экологические изыскания (ИЭИ)</td>
                            <td className="text-center">+</td>
                            <td className="text-end text-nowrap">125 000 ₽</td>
                        </tr>
                        <tr>
                            <td>
                                <span
                                    style={{
                                        wordBreak: 'break-all',
                                    }}
                                >
                                    Гидрометеорологические
                                </span>{' '}
                                изыскания (ИГМИ)
                            </td>

                            <td className="text-center">+</td>
                            <td className="text-end text-nowrap">125 000 ₽</td>
                        </tr>
                    </tbody>
                </Table>
                <p className="mb-3">
                    <span className="text-danger">*</span>{' '}
                    <small className="text-muted">
                        Подрядчик использует выписку членства СРО партнёрской организации.
                    </small>
                </p>

                <h3 className="mb-0 h5">
                    <span className="pt-1">Условия сотрудничества</span>{' '}
                    <Button
                        variant="outline-primary"
                        size="sm"
                        // variant="outline-secondary"
                        onClick={showCooperationTerms}
                    >
                        {showingCooperationTerms ? (
                            <ChevronCompactUp size={20} />
                        ) : (
                            <ChevronCompactDown size={20} />
                        )}
                    </Button>
                </h3>

                {showingCooperationTerms && (
                    <div className="bg-white p-1 mt-2 rounded border">
                        adfasdf adfasdfasdf
                        <br />
                        adfasdfadff afda dff adfadf
                        <br />
                        afd afd a falsea dff a false
                    </div>
                )}

                <Row>
                    <Col lg={6}></Col>
                    <Col>
                        <Button variant="outline-primary" className="w-100 mt-3">
                            Запросить КП
                        </Button>
                    </Col>
                </Row>
            </Card>
            <Card body={true} className="bg-light mt-3 mb-3">
                <Stack direction="horizontal" className="align-items-start" gap={3}>
                    <PeopleFill size={60} color="grey" />
                    {/* <Card.Img
                        style={{ width: '60px', height: 'auto' }}
                        variant="top"
                        src={img}
                    /> */}
                    <div>
                        <h2
                            className="mb-1 h4"
                            onMouseOver={(e) =>
                                (e.target.style.textDecoration = 'underline')
                            }
                            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                            onClick={() => console.log('test')}
                        >
                            ООО "Ерёмины"
                        </h2>
                        <p className="text-muted m-0">Юридическое лицо</p>
                    </div>
                </Stack>
                <Table className="mt-3 mb-1" variant="light" size="sm">
                    <thead>
                        <tr className="align-middle">
                            <th>
                                <h3 className="mb-0 h5">Компетенции</h3>
                            </th>
                            <th className="text-center small">Членство в СРО</th>
                            <th className="text-end small">
                                Цена <span className="text-danger">*</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Геодезические изыскания (ИГДИ)</td>
                            <td className="text-center">+</td>
                            <td className="text-end text-nowrap">95 000 ₽</td>
                        </tr>
                        <tr>
                            <td>Геологические изыскания (ИГИ)</td>
                            <td className="text-center position-relative">
                                +{' '}
                                <span
                                    className="text-danger position-absolute"
                                    style={{ paddingLeft: '0.25em' }}
                                >
                                    *
                                </span>
                            </td>
                            <td className="text-end text-nowrap">187 000 ₽</td>
                        </tr>
                        <tr>
                            <td>Экологические изыскания (ИЭИ)</td>
                            <td className="text-center">+</td>
                            <td className="text-end text-nowrap">125 000 ₽</td>
                        </tr>
                        <tr>
                            <td>
                                <span
                                    style={{
                                        wordBreak: 'break-all',
                                    }}
                                >
                                    Гидрометеорологические
                                </span>{' '}
                                изыскания (ИГМИ)
                            </td>

                            <td className="text-center">+</td>
                            <td className="text-end text-nowrap">125 000 ₽</td>
                        </tr>
                    </tbody>
                </Table>
                <p className="mb-3">
                    <span className="text-danger">*</span>{' '}
                    <small className="text-muted">
                        Подрядчик использует выписку членства СРО партнёрской организации.
                    </small>
                </p>

                <h3 className="mb-0 h5">
                    <span className="pt-1">Условия сотрудничества</span>{' '}
                    <Button
                        variant="outline-primary"
                        size="sm"
                        // variant="outline-secondary"
                        onClick={showCooperationTerms}
                    >
                        {showingCooperationTerms ? (
                            <ChevronCompactUp size={20} />
                        ) : (
                            <ChevronCompactDown size={20} />
                        )}
                    </Button>
                </h3>

                {showingCooperationTerms && (
                    <div className="bg-white p-1 mt-2 rounded border">
                        adfasdf adfasdfasdf
                        <br />
                        adfasdfadff afda dff adfadf
                        <br />
                        afd afd a falsea dff a false
                    </div>
                )}

                <Row>
                    <Col lg={6}></Col>
                    <Col>
                        <Button variant="outline-primary" className="w-100 mt-3">
                            Запросить КП
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/*             
            <Card className="bg-light p-3 mt-3 mb-3">
                <Row>
                    <Col sm={10}>
                        <Stack
                            direction="horizontal"
                            className="align-items-start"
                            gap={3}
                        >
                            <Card.Img
                                style={{ width: '60px', height: 'auto' }}
                                variant="top"
                                src={img}
                            />
                            <div>
                                <h2
                                    className="mb-1 h4"
                                    onMouseOver={(e) =>
                                        (e.target.style.textDecoration = 'underline')
                                    }
                                    onMouseOut={(e) =>
                                        (e.target.style.textDecoration = 'none')
                                    }
                                    onClick={() => console.log('test')}
                                >
                                    Ерёмин Дмитрий
                                </h2>
                                <p className="text-muted m-0">
                                    Физическое лицо <span>/ самозанятый</span>
                                </p>
                            </div>
                        </Stack>
                    </Col>
                    <Col className="align-items-center">
                        <Button className="w-100 mt-2 mb-2">Запросить КП</Button>
                    </Col>
                </Row>
                <hr className="mt-2 mb-2" style={{ borderTop: '1px solid grey' }} />
                <h3
                    // style={{ fontSize: '1.2em', fontWeight: 500 }}
                    className="mb-1 h5"
                >
                    Компетенции
                </h3>
                <ul className="mb-1" style={{ fontSize: '1.1em' }}>
                    <li>Инженерно-экологические изыскания</li>
                </ul>
                <hr className="mt-1 mb-2" style={{ borderTop: '1px solid grey' }} />
                <h3
                    //  style={{ fontSize: '1.2em', fontWeight: 500 }}
                    className="mb-1 h5"
                >
                    Подтверждения квалификации
                </h3>
                <ul
                    className="mb-1"
                    // style={{ fontSize: '1.1em' }}
                >
                    <li>
                        Аттестован на право подготовки заключений экспертизы результатов
                        инженерных изысканий по направлению{' '}
                        <span>инженерно-экологические изыскания</span>
                    </li>
                    <li>
                        Аттестован на право подготовки заключений экспертизы проектной
                        документации по направлению{' '}
                        <span>
                            охрана окружающей среды и санитарно-эпидемиологическая
                            безопасность
                        </span>
                    </li>
                </ul>
            </Card> */}
        </div>
    );
};

export default ContractorsList;
