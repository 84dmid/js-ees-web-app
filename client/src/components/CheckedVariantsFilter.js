import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';

import { AppContext } from './AppContext.js';

const CheckedVariantsFilter = observer(() => {
    const { catalog } = useContext(AppContext);

    useEffect(() => {
        catalog.showAllCatalog = true;
    }, []);

    return (
        <Form.Group className="mb-3">
            {/* <b>Исследования</b> */}
            <Form.Check
                name="surveyFilter"
                type="radio"
                id="showAllCatalog"
                onChange={() => {
                    catalog.showAllCatalog = true;
                }}
                checked={catalog.showAllCatalog}
                label="Показать весь каталог"
            />
            <Form.Check
                name="surveyFilter"
                type="radio"
                id="showOnlyCheckedSurveys"
                onChange={() => {
                    catalog.showOnlyCheckedSurveys = true;
                }}
                checked={catalog.showOnlyCheckedSurveys}
                label="Показать только отмеченные виды исследований"
            />
            <Form.Check
                name="surveyFilter"
                type="radio"
                id="showOnlyCheckedVariants"
                onChange={() => {
                    catalog.showOnlyCheckedVariants = true;
                }}
                checked={catalog.showOnlyCheckedVariants}
                label="Показать только отмеченные варианты"
            />
        </Form.Group>
    );
});

export default CheckedVariantsFilter;
