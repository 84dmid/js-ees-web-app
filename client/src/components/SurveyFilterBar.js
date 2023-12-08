import React, { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';

import { AppContext } from '../components/AppContext.js';
import {
    fetchCategories,
    fetchSubcategories,
    fetchObjectTypes,
} from '../http/catalogAPI.js';

const SurveyFilterBar = observer(({ name, items }) => {
    const { catalog, isLoading } = useContext(AppContext);

    const [categoriesFetching, setCategoriesFetching] = useState(true);
    const [subcategoriesFetching, setSubcategoriesFetching] = useState(true);
    const [objectTypesFetching, setObjectTypesFetching] = useState(true);

    isLoading.state = true;
    useEffect(() => {
        fetchCategories()
            .then((data) => (catalog.categories = data))
            .finally(() => {
                setCategoriesFetching(false);
                isLoading.state = false;
            });

        fetchSubcategories()
            .then((data) => (catalog.subcategories = data))
            .finally(() => {
                setSubcategoriesFetching(false);
                isLoading.state = false;
            });

        fetchObjectTypes()
            .then((data) => (catalog.objectTypes = data))
            .finally(() => {
                setObjectTypesFetching(false);
                isLoading.state = false;
            });
        // eslint-disable-next-line
    }, []);

    return (
        <Form>
            {!objectTypesFetching && (
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Тип объекта строительства</Form.Label>
                    {catalog.objectTypes.map((item) => (
                        <Form.Check
                            type="switch"
                            key={item.id + 'objectTypes'}
                            id={item.id + 'objectTypes'}
                            label={item.name}
                        />
                    ))}
                </Form.Group>
            )}

            {!categoriesFetching && (
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Категории исследований</Form.Label>
                    {catalog.categories.map((item) => (
                        <Form.Check
                            type="switch"
                            key={item.id + 'categories'}
                            id={item.id + 'categories'}
                            label={item.name}
                        />
                    ))}
                </Form.Group>
            )}

            {!subcategoriesFetching && (
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Подкатегории исследований</Form.Label>
                    {catalog.subcategories.map((item) => (
                        <Form.Check
                            type="switch"
                            key={item.id + 'subcategories'}
                            id={item.id + 'subcategories'}
                            label={item.name}
                        />
                    ))}
                </Form.Group>
            )}
        </Form>
    );
});

export default SurveyFilterBar;
