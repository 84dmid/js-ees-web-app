import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectTaskFieldset8 = observer(() => {
    const { catalog } = useContext(AppContext);

    const regulatoryDocumentsListRef = useRef(null);
    const customerSuppliedDataRef = useRef(null);

    useEffect(() => {
        if (regulatoryDocumentsListRef.current) {
            regulatoryDocumentsListRef.current.style.height = `${regulatoryDocumentsListRef.current.scrollHeight}px`;
        }
        if (customerSuppliedDataRef.current) {
            customerSuppliedDataRef.current.style.height = `${customerSuppliedDataRef.current.scrollHeight}px`;
        }
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
            catalog.generalData[field] = newText;
        });
    };

    const handleChange = (event, value, field) => {
        runInAction(() => {
            catalog.generalData[field] = value;
            catalog.setValid(field, value);
        });
        if (event && event.target.type === 'textarea') {
            event.target.style.height = 'auto';
            event.target.style.height = event.target.scrollHeight + 'px';
        }
    };

    return (
        <fieldset>
            <p className="m-0">
                <Form.Text>
                    <span className="text-danger">* </span>
                    Все поля предзаполнены, вы можете вносить изменения или оставить как
                    есть.
                </Form.Text>
            </p>

            <Form.Label htmlFor="regulatoryDocumentsList" className="mt-2 mb-1">
                Перечень нормативных документов, в соответствии с которыми необходимо
                выполнять инженерные изыскания
            </Form.Label>
            <Form.Control
                id="regulatoryDocumentsList"
                ref={regulatoryDocumentsListRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.regulatoryDocumentsList || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'regulatoryDocumentsList');
                }}
                onBlur={(event) => formatText(event, 'regulatoryDocumentsList')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.regulatoryDocumentsList === true}
                isInvalid={catalog.projectValid.regulatoryDocumentsList === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="customerSuppliedData" className="mt-2 mb-1">
                Перечень передаваемых во временное пользование исполнителю инженерных
                изысканий, результатов ранее выполненных инженерных изысканий и
                исследований
            </Form.Label>
            <Form.Control
                id="customerSuppliedData"
                ref={customerSuppliedDataRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.customerSuppliedData || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'customerSuppliedData');
                }}
                onBlur={(event) => formatText(event, 'customerSuppliedData')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.customerSuppliedData === true}
                isInvalid={catalog.projectValid.customerSuppliedData === false}
                autoComplete="off"
            />
        </fieldset>
    );
});

export default ProjectTaskFieldset8;
