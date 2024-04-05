import React from 'react';
import { Form } from 'react-bootstrap';

const ContractorsFilterBar = () => {
    const fontWeight = 500;
    const labelClassName = 'mb-1 mt-3';
    const formTextClassName = 'mb-1 mt-1 text-center';

    return (
        <div>
            <Form>
                <fieldset>
                    <legend className="mt-2">Фильтры</legend>
                    <Form.Label className="mb-1 mt-1" style={{ fontWeight }}>
                        Регион осуществления деятельности
                    </Form.Label>
                    <Form.Select></Form.Select>
                    <p className={labelClassName} style={{ fontWeight }}>
                        Субъект права
                    </p>
                    <Form.Check label="Физическое лицо"></Form.Check>
                    <Form.Check label="Самозанятый"></Form.Check>
                    <Form.Check label="Юридическое лицо"></Form.Check>

                    <p className={labelClassName} style={{ fontWeight }}>
                        Компетенции
                    </p>
                    {/* <Form.Text className={formTextClassName}>Изыскатели</Form.Text> */}
                    <Form.Check label="Геологические изыскания"></Form.Check>
                    <Form.Check label="Геодезические изыскания"></Form.Check>
                    <Form.Check label="Экологические изыскания"></Form.Check>
                    <Form.Check label="Гидрометеорологические изыскания"></Form.Check>
                    <hr className="mt-1 mb-0" style={{ borderTop: '1px solid grey' }} />
                    <Form.Text>Отдельные виды работ</Form.Text>
                    <Form.Check label="Лабораторные работы"></Form.Check>
                    <Form.Check label="Археологические исследования"></Form.Check>
                    <hr className="mt-1 mb-0" style={{ borderTop: '1px solid grey' }} />
                    <Form.Text>Экспертиза</Form.Text>
                    <Form.Check label="Экспертиза изысканий"></Form.Check>
                    {/* <Form.Check label="Экспертиза проектной документации"></Form.Check> */}

                    <p className={labelClassName} style={{ fontWeight }}>
                        Членство в СРО
                    </p>
                    <Form.Check label="Член СРО"></Form.Check>
                    <Form.Check label="Используется выписка СРО партнёрской организации"></Form.Check>
                    {/* <Form.Check label="Квалификационный аттестат эксперта"></Form.Check>
                    <Form.Check label="Предоставил отчёт по изысканиям при регистрации на сайте"></Form.Check>
                    <hr className="mt-1 mb-0" style={{ borderTop: '1px solid grey' }} />
                    <Form.Text>Отдельные виды работ</Form.Text>
                    <Form.Check label="Аттестат аккредитации лаборатории"></Form.Check>
                    <Form.Check label="Приказа Минкультуры России об аттестации эксперта"></Form.Check>
                    <Form.Text>Экспертиза</Form.Text>
                    <Form.Check label="Аккредитация экспертной организации"></Form.Check> */}
                </fieldset>
            </Form>
        </div>
    );
};

export default ContractorsFilterBar;
