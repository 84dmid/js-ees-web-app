import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import { AppContext } from './AppContext';

const CatalogSubheadings = observer(() => {
    const { basket } = useContext(AppContext);
    const [isVisible, setIsVisible] = useState('');

    useEffect(() => {
        setIsVisible(() => (basket.isObjectTypeLine !== null ? true : false));
    }, [basket.isObjectTypeLine]);

    return (
        <tr
            style={{
                display: isVisible ? 'table-row' : 'none',
            }}
        >
            <td colSpan={3} className="align-bottom">
                <Form.Text>Варианты расчёта количества единиц измерения:</Form.Text>
            </td>
            <td className="align-bottom text-center">
                <Form.Text>Ед. изм.</Form.Text>
            </td>
            <td className="align-bottom text-center">
                <Form.Text>Количество</Form.Text>
            </td>
            <td className="align-bottom text-center">
                <Form.Text>Цена</Form.Text>
            </td>
        </tr>
    );
});

export default CatalogSubheadings;
