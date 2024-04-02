import { observer } from 'mobx-react-lite';
import React, { useContext, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from './AppContext';
import { runInAction } from 'mobx';

const ProjectTaskFieldset4 = observer(() => {
    const { catalog } = useContext(AppContext);
    const landUseAndLandownersRef = useRef(null);
    const negativeImpactOnEnvironmentCategoryRef = useRef(null);

    useEffect(() => {
        if (landUseAndLandownersRef.current) {
            landUseAndLandownersRef.current.style.height = `${landUseAndLandownersRef.current.scrollHeight}px`;
        }
        if (negativeImpactOnEnvironmentCategoryRef.current) {
            negativeImpactOnEnvironmentCategoryRef.current.style.height = `${negativeImpactOnEnvironmentCategoryRef.current.scrollHeight}px`;
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
            <Form.Label htmlFor="landUseAndLandowners" className="mb-1">
                Общие сведения о землепользовании и землевладельцах
            </Form.Label>
            <Form.Control
                id="landUseAndLandowners"
                ref={landUseAndLandownersRef}
                as="textarea"
                size="sm"
                rows={3}
                value={catalog.generalData.landUseAndLandowners || ''}
                onChange={(event) => {
                    handleChange(event, event.target.value, 'landUseAndLandowners');
                }}
                onBlur={(event) => formatText(event, 'landUseAndLandowners')}
                isValid={catalog.projectValid.landUseAndLandowners === true}
                isInvalid={catalog.projectValid.landUseAndLandowners === false}
                style={{
                    overflow: 'hidden',
                    height: 'auto',
                }}
                autoComplete="off"
            />

            <Form.Label
                htmlFor="negativeImpactOnEnvironmentCategory"
                className="mt-2 mb-1"
            >
                Категория объекта капитального строительства как объекта, оказывающего
                негативное воздействие на окружающую среду
            </Form.Label>
            <Form.Select
                id="negativeImpactOnEnvironmentCategory"
                ref={negativeImpactOnEnvironmentCategoryRef}
                value={catalog.generalData.negativeImpactOnEnvironmentCategory || ''}
                onChange={(event) => {
                    handleChange(
                        event,
                        event.target.value,
                        'negativeImpactOnEnvironmentCategory'
                    );
                }}
                isValid={
                    catalog.projectValid.negativeImpactOnEnvironmentCategory === true
                }
                isInvalid={
                    catalog.projectValid.negativeImpactOnEnvironmentCategory === false
                }
            >
                <option></option>
                <option value="I категория">I категория</option>
                <option value="II категория">II категория</option>
                <option value="categoryIII">categoryIII</option>
                <option value="IV категория">IV категория</option>
                <option value="не категорируется">Не категорируется</option>
            </Form.Select>
        </fieldset>
    );
});

export default ProjectTaskFieldset4;
