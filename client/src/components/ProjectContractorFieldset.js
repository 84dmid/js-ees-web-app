import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectContractorFieldset = observer(() => {
    const { catalog } = useContext(AppContext);

    function createRefs(fieldList) {
        const refs = {};
        fieldList.forEach((fieldName) => {
            refs[fieldName] = useRef(null);
        });
        return refs;
    }

    const fieldNames = [
        'contractorCompanyName',
        'contractorLegalAddress',
        'contractorPostalAddress',
        'contractorTIN',
        'contractorPhone',
        'contractorEmail',
        'contractorSignatoryPosition',
        'contractorSignatorySurname',
        'contractorSignatoryName',
        'contractorSignatoryPatronymic',
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
            catalog.contractorData[field] = newText;
        });
    };

    const handleChange = (event, value, field) => {
        runInAction(() => {
            catalog.contractorData[field] = value;
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
            <legend className="mb-0 mt-0">Сведения об исполнителе</legend>
            <Form.Label htmlFor="contractorCompanyName" className="mt-2 mb-1">
                Наименование организации
            </Form.Label>
            <Form.Control
                id="contractorCompanyName"
                ref={refs.contractorCompanyName}
                as="textarea"
                rows={1}
                value={catalog.contractorData.contractorCompanyName || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'contractorCompanyName');
                }}
                onKeyDown={preventEnter}
                onBlur={(event) => formatText(event, 'contractorCompanyName')}
                isValid={catalog.projectValid.contractorCompanyName === true}
                isInvalid={catalog.projectValid.contractorCompanyName === false}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                    resize: 'none',
                }}
            />

            <Form.Label htmlFor="contractorLegalAddress" className="mt-2 mb-1">
                Юридический адрес
            </Form.Label>
            <Form.Control
                id="contractorLegalAddress"
                ref={refs.contractorLegalAddress}
                as="textarea"
                rows={1}
                value={catalog.contractorData.contractorLegalAddress || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'contractorLegalAddress');
                }}
                onKeyDown={preventEnter}
                onBlur={(event) => formatText(event, 'contractorLegalAddress')}
                style={{ overflow: 'hidden', resize: 'none' }}
                isValid={catalog.projectValid.contractorLegalAddress === true}
                isInvalid={catalog.projectValid.contractorLegalAddress === false}
            />

            <Form.Label htmlFor="contractorPostalAddress" className="mt-2 mb-1">
                Почтовый адрес
            </Form.Label>
            <Form.Control
                id="contractorPostalAddress"
                ref={refs.contractorPostalAddress}
                as="textarea"
                rows={1}
                value={catalog.contractorData.contractorPostalAddress || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'contractorPostalAddress');
                }}
                onKeyDown={preventEnter}
                onBlur={(event) => formatText(event, 'contractorPostalAddress')}
                style={{ overflow: 'hidden', resize: 'none' }}
                isValid={catalog.projectValid.contractorPostalAddress === true}
                isInvalid={catalog.projectValid.contractorPostalAddress === false}
            />

            <Form.Label htmlFor="contractorTIN" className="mt-2 mb-1">
                ИНН
            </Form.Label>
            <Form.Control
                id="contractorTIN"
                // ref={refs.contractorTIN}
                value={catalog.contractorData.contractorTIN || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'contractorTIN');
                }}
                onBlur={(event) => formatText(event, 'contractorTIN')}
                isValid={catalog.projectValid.contractorTIN === true}
                isInvalid={catalog.projectValid.contractorTIN === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="contractorPhone" className="mt-2 mb-1">
                Телефон
            </Form.Label>
            <Form.Control
                id="contractorPhone"
                type="tel"
                // ref={refs.contractorPhone}
                value={catalog.contractorData.contractorPhone || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'contractorPhone');
                }}
                onBlur={(event) => formatText(event, 'contractorPhone')}
                isValid={catalog.projectValid.contractorPhone === true}
                isInvalid={catalog.projectValid.contractorPhone === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="contractorEmail" className="mt-2 mb-1">
                E-mail
            </Form.Label>
            <Form.Control
                id="contractorEmail"
                type="email"
                // ref={refs.contractorEmail}
                value={catalog.contractorData.contractorEmail || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'contractorEmail');
                }}
                onBlur={(event) => formatText(event, 'contractorEmail')}
                isValid={catalog.projectValid.contractorEmail === true}
                isInvalid={catalog.projectValid.contractorEmail === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="contractorSignatoryPosition" className="mt-2 mb-1">
                Должность утверждающего лица (подписанта)
            </Form.Label>
            <Form.Control
                id="contractorSignatoryPosition"
                as="textarea"
                rows={1}
                ref={refs.contractorSignatoryPosition}
                value={catalog.contractorData.contractorSignatoryPosition || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'contractorSignatoryPosition');
                }}
                onKeyDown={preventEnter}
                onBlur={(event) => formatText(event, 'contractorSignatoryPosition')}
                isValid={catalog.projectValid.contractorSignatoryPosition === true}
                isInvalid={catalog.projectValid.contractorSignatoryPosition === false}
                style={{ overflow: 'hidden', resize: 'none' }}
            />

            <Form.Label htmlFor="contractorSignatorySurname" className="mt-2 mb-1">
                Фамилия подписанта
            </Form.Label>
            <Form.Control
                id="contractorSignatorySurname"
                type="text"
                ref={refs.contractorSignatorySurname}
                value={catalog.contractorData.contractorSignatorySurname || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'contractorSignatorySurname');
                }}
                onBlur={(event) => formatText(event, 'contractorSignatorySurname')}
                isValid={catalog.projectValid.contractorSignatorySurname === true}
                isInvalid={catalog.projectValid.contractorSignatorySurname === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="contractorSignatoryName" className="mt-2 mb-1">
                Имя подписанта
            </Form.Label>
            <Form.Control
                id="contractorSignatoryName"
                type="text"
                ref={refs.contractorSignatoryName}
                value={catalog.contractorData.contractorSignatoryName || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'contractorSignatoryName');
                }}
                onBlur={(event) => formatText(event, 'contractorSignatoryName')}
                isValid={catalog.projectValid.contractorSignatoryName === true}
                isInvalid={catalog.projectValid.contractorSignatoryName === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="contractorSignatoryPatronymic" className="mt-2 mb-1">
                Отчество подписанта
            </Form.Label>
            <Form.Control
                id="contractorSignatoryPatronymic"
                ref={refs.contractorSignatoryPatronymic}
                value={catalog.contractorData.contractorSignatoryPatronymic || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'contractorSignatoryPatronymic'
                    );
                }}
                onBlur={(event) => formatText(event, 'contractorSignatoryPatronymic')}
                isValid={catalog.projectValid.contractorSignatoryPatronymic === true}
                isInvalid={catalog.projectValid.contractorSignatoryPatronymic === false}
                autoComplete="off"
            />
        </fieldset>
    );
});

export default ProjectContractorFieldset;
