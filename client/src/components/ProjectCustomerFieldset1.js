import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectCustomerFieldset = () => {
    const { catalog } = useContext(AppContext);

    function createRefs(fieldList) {
        const refs = {};
        fieldList.forEach((fieldName) => {
            refs[fieldName] = useRef(null);
        });
        return refs;
    }

    const fieldNames = [
        'customerCompanyName',
        'customerLegalAddress',
        'customerPostalAddress',
        'customerTIN',
        'customerPhone',
        'customerEmail',
        'customerSignatoryPosition',
        'customerSignatorySurname',
        'customerSignatoryName',
        'customerSignatoryPatronymic',
    ];

    const refs = createRefs(fieldNames);

    useEffect(() => {
        Object.keys(refs).forEach((fieldName) => {
            if (refs[fieldName].current) {
                refs[
                    fieldName
                ].current.style.height = `${refs[fieldName].current.scrollHeight}px`;
            }
        });
    }, []);

    const formatText = (event, field) => {
        const text = event.target.value;
        const newText = text
            .split('\n')
            .filter((string) => string.trim() !== '')
            .map((string) => string.trim())
            .map((string) => string.replace(/\s+/g, ' '))
            .join('\n');

        runInAction(() => {
            catalog.customerData[field] = newText;
        });
    };

    const handleChange = (event, value, field) => {
        runInAction(() => {
            catalog.customerData[field] = value;
            catalog.setValid(field, value);
        });
        if (event && event.target.type === 'textarea') {
            event.target.style.height = 'auto';
            event.target.style.height = event.target.scrollHeight + 'px';
        }
    };

    const preventEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    return (
        <fieldset>
            <legend className="mb-0 mt-0">Сведения о заказчике</legend>
            <Form.Label htmlFor="customerCompanyName" className="mt-2 mb-1">
                Наименование организации
            </Form.Label>
            <Form.Control
                id="customerCompanyName"
                ref={refs.customerCompanyName}
                as="textarea"
                rows={1}
                value={catalog.customerData.customerCompanyName || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'customerCompanyName');
                }}
                onKeyDown={preventEnter}
                onBlur={(event) => formatText(event, 'customerCompanyName')}
                isValid={catalog.projectValid.customerCompanyName === true}
                isInvalid={catalog.projectValid.customerCompanyName === false}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                    resize: 'none',
                }}
            />

            <Form.Label htmlFor="customerLegalAddress" className="mt-2 mb-1">
                Юридический адрес
            </Form.Label>
            <Form.Control
                id="customerLegalAddress"
                ref={refs.customerLegalAddress}
                as="textarea"
                rows={1}
                value={catalog.customerData.customerLegalAddress || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'customerLegalAddress');
                }}
                onKeyDown={preventEnter}
                onBlur={(event) => formatText(event, 'customerLegalAddress')}
                style={{ overflow: 'hidden', resize: 'none' }}
                isValid={catalog.projectValid.customerLegalAddress === true}
                isInvalid={catalog.projectValid.customerLegalAddress === false}
            />

            <Form.Label htmlFor="customerPostalAddress" className="mt-2 mb-1">
                Почтовый адрес
            </Form.Label>
            <Form.Control
                id="customerPostalAddress"
                ref={refs.customerPostalAddress}
                as="textarea"
                rows={1}
                value={catalog.customerData.customerPostalAddress || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'customerPostalAddress');
                }}
                onKeyDown={preventEnter}
                onBlur={(event) => formatText(event, 'customerPostalAddress')}
                style={{ overflow: 'hidden', resize: 'none' }}
                isValid={catalog.projectValid.customerPostalAddress === true}
                isInvalid={catalog.projectValid.customerPostalAddress === false}
            />

            <Form.Label htmlFor="customerTIN" className="mt-2 mb-1">
                ИНН
            </Form.Label>
            <Form.Control
                id="customerTIN"
                // ref={refs.customerTIN}
                value={catalog.customerData.customerTIN || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'customerTIN');
                }}
                onBlur={(event) => formatText(event, 'customerTIN')}
                isValid={catalog.projectValid.customerTIN === true}
                isInvalid={catalog.projectValid.customerTIN === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="customerPhone" className="mt-2 mb-1">
                Телефон
            </Form.Label>
            <Form.Control
                id="customerPhone"
                type="tel"
                // ref={refs.customerPhone}
                value={catalog.customerData.customerPhone || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'customerPhone');
                }}
                onBlur={(event) => formatText(event, 'customerPhone')}
                isValid={catalog.projectValid.customerPhone === true}
                isInvalid={catalog.projectValid.customerPhone === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="customerEmail" className="mt-2 mb-1">
                E-mail
            </Form.Label>
            <Form.Control
                id="customerEmail"
                type="email"
                // ref={refs.customerEmail}
                value={catalog.customerData.customerEmail || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'customerEmail');
                }}
                onBlur={(event) => formatText(event, 'customerEmail')}
                isValid={catalog.projectValid.customerEmail === true}
                isInvalid={catalog.projectValid.customerEmail === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="customerSignatoryPosition" className="mt-2 mb-1">
                Должность утверждающего лица (подписанта)
            </Form.Label>
            <Form.Control
                id="customerSignatoryPosition"
                as="textarea"
                rows={1}
                ref={refs.customerSignatoryPosition}
                value={catalog.customerData.customerSignatoryPosition || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'customerSignatoryPosition');
                }}
                onKeyDown={preventEnter}
                onBlur={(event) => formatText(event, 'customerSignatoryPosition')}
                isValid={catalog.projectValid.customerSignatoryPosition === true}
                isInvalid={catalog.projectValid.customerSignatoryPosition === false}
                style={{ overflow: 'hidden', resize: 'none' }}
            />

            <Form.Label htmlFor="customerSignatorySurname" className="mt-2 mb-1">
                Фамилия подписанта
            </Form.Label>
            <Form.Control
                id="customerSignatorySurname"
                type="text"
                ref={refs.customerSignatorySurname}
                value={catalog.customerData.customerSignatorySurname || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'customerSignatorySurname');
                }}
                onBlur={(event) => formatText(event, 'customerSignatorySurname')}
                isValid={catalog.projectValid.customerSignatorySurname === true}
                isInvalid={catalog.projectValid.customerSignatorySurname === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="customerSignatoryName" className="mt-2 mb-1">
                Имя подписанта
            </Form.Label>
            <Form.Control
                id="customerSignatoryName"
                type="text"
                ref={refs.customerSignatoryName}
                value={catalog.customerData.customerSignatoryName || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'customerSignatoryName');
                }}
                onBlur={(event) => formatText(event, 'customerSignatoryName')}
                isValid={catalog.projectValid.customerSignatoryName === true}
                isInvalid={catalog.projectValid.customerSignatoryName === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="customerSignatoryPatronymic" className="mt-2 mb-1">
                Отчество подписанта
            </Form.Label>
            <Form.Control
                id="customerSignatoryPatronymic"
                ref={refs.customerSignatoryPatronymic}
                value={catalog.customerData.customerSignatoryPatronymic || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'customerSignatoryPatronymic'
                    );
                }}
                onBlur={(event) => formatText(event, 'customerSignatoryPatronymic')}
                isValid={catalog.projectValid.customerSignatoryPatronymic === true}
                isInvalid={catalog.projectValid.customerSignatoryPatronymic === false}
                autoComplete="off"
            />
        </fieldset>
    );
};

export default ProjectCustomerFieldset;
