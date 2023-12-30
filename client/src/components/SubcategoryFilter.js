import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';

import { AppContext } from '../components/AppContext.js';
import { fetchSubcategories } from '../http/catalogAPI.js';

const SubcategoryFilter = observer(() => {
    const { catalog, isLoading } = useContext(AppContext);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchSubcategories()
            .then((data) => (catalog.subcategories = data))
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
            catalog.checkSubcategory(parseInt(event.target.id));
        } else {
            catalog.uncheckSubcategory(parseInt(event.target.id));
        }
    };

    return (
        <Form.Group className="mb-3">
            <b>Подкатегории исследований</b>
            {catalog.subcategories.map((item) => (
                <Form.Check
                    type="switch"
                    key={item.id + 'subcategories'}
                    id={item.id + 'subcategories'}
                    label={item.name}
                    checked={catalog.checkedSubcategories.includes(item.id)}
                    onChange={handleChange}
                />
            ))}
        </Form.Group>
    );
});

export default SubcategoryFilter;
