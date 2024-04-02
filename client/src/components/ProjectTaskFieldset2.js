import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectTaskFieldset2 = observer(() => {
    const { catalog } = useContext(AppContext);
    const objectNameRef = useRef(null);
    const objectAddressRef = useRef(null);
    const cadastralNumberRef = useRef(null);
    const boundariesAreaDataRef = useRef(null);
    const boundariesTrackDataRef = useRef(null);
    const technicalCharacteristicRef = useRef(null);

    useEffect(() => {
        if (objectNameRef.current) {
            objectNameRef.current.style.height = `${objectNameRef.current.scrollHeight}px`;
        }
        if (objectAddressRef.current) {
            objectAddressRef.current.style.height = `${objectAddressRef.current.scrollHeight}px`;
        }
        if (cadastralNumberRef.current) {
            cadastralNumberRef.current.style.height = `${cadastralNumberRef.current.scrollHeight}px`;
        }
        if (boundariesAreaDataRef.current) {
            boundariesAreaDataRef.current.style.height = `${boundariesAreaDataRef.current.scrollHeight}px`;
        }
        if (boundariesTrackDataRef.current) {
            boundariesTrackDataRef.current.style.height = `${boundariesTrackDataRef.current.scrollHeight}px`;
        }
        if (technicalCharacteristicRef.current) {
            technicalCharacteristicRef.current.style.height = `${technicalCharacteristicRef.current.scrollHeight}px`;
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
        if (event.target.type === 'textarea') {
            event.target.style.height = 'auto';
            event.target.style.height = event.target.scrollHeight + 'px';
        }
    };

    const preventEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Отменяем действие по умолчанию для клавиши Enter
        }
    };

    return (
        <fieldset>
            {/* <legend>Сведения об объекте</legend> */}
            <Form.Label htmlFor="objectName" className="mb-1">
                Наименование объекта
            </Form.Label>
            <Form.Control
                id="objectName"
                ref={objectNameRef}
                as="textarea"
                size="sm"
                rows={1}
                value={catalog.generalData.name || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'name');
                }}
                onBlur={(event) => formatText(event, 'name')}
                onKeyDown={preventEnter}
                isValid={catalog.projectValid.name === true}
                isInvalid={catalog.projectValid.name === false}
                style={{ overflow: 'hidden', resize: 'none' }}
                autoComplete="off"
            />
            <Form.Label htmlFor="objectAddress" className="mt-2 mb-1">
                Местоположение объекта
            </Form.Label>
            <Form.Control
                id="objectAddress"
                ref={objectAddressRef}
                type="address"
                as="textarea"
                size="sm"
                rows={1}
                value={catalog.generalData.address || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'address');
                }}
                onKeyDown={preventEnter}
                onBlur={(event) => formatText(event, 'address')}
                isValid={catalog.projectValid.address === true}
                isInvalid={catalog.projectValid.address === false}
                style={{ overflow: 'hidden', resize: 'none' }}
                autoComplete="off"
            />
            <Form.Label htmlFor="cadastralNumber" className="mt-2 mb-1">
                Кадастровый номер(a) участка изысканий
            </Form.Label>
            <Form.Control
                id="cadastralNumber"
                ref={cadastralNumberRef}
                type="address"
                as="textarea"
                size="sm"
                rows={1}
                value={catalog.generalData.cadastralNumber || ''}
                onChange={(event) => {
                    const newValue = event.target.value.replace(/\n/g, '');
                    handleChange(event, newValue, 'cadastralNumber');
                }}
                onKeyDown={preventEnter}
                onBlur={(event) => formatText(event, 'cadastralNumber')}
                isValid={catalog.projectValid.cadastralNumber === true}
                isInvalid={catalog.projectValid.cadastralNumber === false}
                style={{ overflow: 'hidden', resize: 'none' }}
                autoComplete="off"
            />

            <Form.Label htmlFor="boundariesAreaData" className="mt-2 mb-1">
                Данные о границах участка изысканий
            </Form.Label>
            <Form.Control
                id="boundariesAreaData"
                ref={boundariesAreaDataRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.boundariesAreaData || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'boundariesAreaData');
                }}
                onBlur={(event) => formatText(event, 'boundariesAreaData')}
                isValid={catalog.projectValid.boundariesAreaData === true}
                isInvalid={catalog.projectValid.boundariesAreaData === false}
                style={{ overflow: 'hidden' }}
            />
            <Form.Label htmlFor="boundariesTrackData" className="mt-2 mb-1">
                Данные о границах трассы линейного сооружения (точках ее начала и
                окончания)
            </Form.Label>
            <Form.Control
                id="boundariesTrackData"
                ref={boundariesTrackDataRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.boundariesTrackData || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'boundariesTrackData');
                }}
                onBlur={(event) => formatText(event, 'boundariesTrackData')}
                isValid={catalog.projectValid.boundariesTrackData === true}
                isInvalid={catalog.projectValid.boundariesTrackData === false}
                style={{ overflow: 'hidden' }}
            />
            <Form.Label htmlFor="technicalCharacteristic" className="mt-2 mb-1">
                Краткая техническая характеристика объекта, включая размеры проектируемых
                зданий и сооружений
            </Form.Label>
            <Form.Control
                id="technicalCharacteristic"
                ref={technicalCharacteristicRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.technicalCharacteristic || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'technicalCharacteristic');
                }}
                onBlur={(event) => formatText(event, 'technicalCharacteristic')}
                isValid={catalog.projectValid.technicalCharacteristic === true}
                isInvalid={catalog.projectValid.technicalCharacteristic === false}
                style={{ overflow: 'hidden' }}
            />
        </fieldset>
    );
});

export default ProjectTaskFieldset2;
