import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';

import { AppContext } from './AppContext.js';

const CheckedVariantsFilter = observer(() => {
    const { catalog, basket } = useContext(AppContext);

    const setSurveyFilter = (event) => {
        if (event.target.checked) {
            if (basket.variants.length === 0) return;
            catalog.surveyFilter = basket.variants.map((item) => {
                return item.surveyId;
            });
        } else {
            catalog.surveyFilter = [];
        }
    };

    const setVariantFilter = (event) => {
        if (event.target.checked) {
            catalog.variantFilter = basket.variants.map((item) => item.variantId);
        } else {
            catalog.variantFilter = [];
        }
    };

    return (
        <Form.Group className="mb-3">
            {/* <b>Исследования</b> */}
            <Form.Check
                type="checkbox"
                id="checkedSurveyFilter"
                onChange={setSurveyFilter}
                checked={catalog.surveyFilter.length}
                label="Показать отмеченные виды исследований со всеми вариантами"
            />
            <Form.Check
                type="checkbox"
                id="checkedVariantsFilter"
                onChange={setVariantFilter}
                checked={catalog.variantFilter.length}
                label="Показать только отмеченные варианты"
            />
        </Form.Group>
    );
});

export default CheckedVariantsFilter;
