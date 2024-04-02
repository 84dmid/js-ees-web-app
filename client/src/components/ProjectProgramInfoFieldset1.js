import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useEffect } from 'react';
import { Form, Row } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectProgramInfoFieldset1 = observer(() => {
    const { catalog } = useContext(AppContext);

    function createRefs(fieldList) {
        const refs = {};
        fieldList.forEach((fieldName) => {
            refs[fieldName] = useRef(null);
        });
        return refs;
    }

    const fieldNames = [
        'volumeName',
        'volumeCode',
        'volumeNumber',
        'preliminaryPollutedAreaData',
        'preliminaryRestrictionsZoneData',
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
            <Form.Label htmlFor="volumeName" className="mt-2 mb-1">
                Наименование отчета
            </Form.Label>
            <Form.Control
                id="volumeName"
                ref={refs.volumeName}
                as="textarea"
                rows={3}
                value={catalog.generalData.volumeName || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'volumeName');
                }}
                onBlur={(event) => formatText(event, 'volumeName')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.volumeName === true}
                isInvalid={catalog.projectValid.volumeName === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="volumeCode" className="mt-2 mb-1">
                Шифр тома
            </Form.Label>
            <Form.Control
                id="volumeCode"
                ref={refs.volumeCode}
                value={catalog.generalData.volumeCode || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'volumeCode');
                }}
                onBlur={(event) => formatText(event, 'volumeCode')}
                isValid={catalog.projectValid.volumeCode === true}
                isInvalid={catalog.projectValid.volumeCode === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="volumeNumber" className="mt-2 mb-1">
                Номер тома
            </Form.Label>
            <Form.Control
                id="volumeNumber"
                ref={refs.volumeNumber}
                value={catalog.generalData.volumeNumber || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'volumeNumber');
                }}
                onBlur={(event) => formatText(event, 'volumeNumber')}
                isValid={catalog.projectValid.volumeNumber === true}
                isInvalid={catalog.projectValid.volumeNumber === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="preliminaryPollutedAreaData" className="mb-1 mt-2">
                Предварительные сведения о наличии участков с ранее выявленным
                загрязнением окружающей среды
            </Form.Label>
            <Form.Control
                id="preliminaryPollutedAreaData"
                ref={refs.preliminaryPollutedAreaData}
                as="textarea"
                rows={3}
                value={catalog.generalData.preliminaryPollutedAreaData || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'preliminaryPollutedAreaData'
                    );
                }}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                onBlur={(event) => formatText(event, 'preliminaryPollutedAreaData')}
                isValid={catalog.projectValid.preliminaryPollutedAreaData === true}
                isInvalid={catalog.projectValid.preliminaryPollutedAreaData === false}
                autoComplete="off"
            />

            <Form.Label htmlFor="preliminaryRestrictionsZoneData" className="mt-2 mb-1">
                Предварительные сведения о наличии зон с особым режимом природопользования
                (зон экологических ограничений)
            </Form.Label>
            <Form.Control
                id="preliminaryRestrictionsZoneData"
                ref={refs.preliminaryRestrictionsZoneData}
                as="textarea"
                rows={3}
                value={catalog.generalData.preliminaryRestrictionsZoneData || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'preliminaryRestrictionsZoneData'
                    );
                }}
                onBlur={(event) => formatText(event, 'preliminaryRestrictionsZoneData')}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                isValid={catalog.projectValid.preliminaryRestrictionsZoneData === true}
                isInvalid={catalog.projectValid.preliminaryRestrictionsZoneData === false}
                autoComplete="off"
            />
        </fieldset>
    );
});

export default ProjectProgramInfoFieldset1;
