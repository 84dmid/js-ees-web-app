import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';

import { AppContext } from '../components/AppContext.js';
import { fetchObjectTypes } from '../http/catalogAPI.js';

const ObjectTypeFilter = observer(() => {
    const { catalog, isLoading } = useContext(AppContext);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchObjectTypes()
            .then((data) => (catalog.objectTypes = data))
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
            catalog.checkObjectType(parseInt(event.target.id));
        } else {
            catalog.uncheckObjectType(parseInt(event.target.id));
        }
    };

    return (
        <Form.Group className="mb-3">
            <b>Тип объекта строительств</b>
            {catalog.objectTypes.map((item) => (
                <Form.Check
                    type="switch"
                    key={item.id + 'objectTypes'}
                    id={item.id + 'objectTypes'}
                    label={item.name}
                    checked={catalog.checkedObjectTypes.includes(item.id)}
                    onChange={handleChange}
                />
            ))}
        </Form.Group>
    );
});

export default ObjectTypeFilter;
