import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';

import { AppContext } from '../components/AppContext.js';
import { fetchCategories } from '../http/catalogAPI.js';

const CategoryFilter = observer(() => {
    const { catalog, isLoading } = useContext(AppContext);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchCategories()
            .then((data) => (catalog.categories = data))
            .finally(() => {
                setFetching(false);
            });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        isLoading.state = fetching ? true : false;
        // eslint-disable-next-line
    }, [fetching]);

    if (fetching) {
        return null;
    }

    const handleChange = (event) => {
        if (event.target.checked) {
            catalog.checkCategory(parseInt(event.target.id));
        } else {
            catalog.uncheckCategory(parseInt(event.target.id));
        }
    };

    return (
        <Form.Group className="mb-3">
            <b>Категории исследований</b>
            {catalog.categories.map((item) => (
                <Form.Check
                    type="switch"
                    key={item.id + 'categories'}
                    id={item.id + 'categories'}
                    label={item.name}
                    checked={catalog.checkedCategories.includes(item.id)}
                    onChange={handleChange}
                />
            ))}
        </Form.Group>
    );
});

export default CategoryFilter;
