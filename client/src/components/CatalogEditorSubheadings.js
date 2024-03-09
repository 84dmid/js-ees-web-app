import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import { AppContext } from './AppContext';

const CatalogEditorSubheadings = observer(() => {
    const { catalogEditor } = useContext(AppContext);
    const [isVisible, setIsVisible] = useState('');

    useEffect(() => {
        setIsVisible(
            catalogEditor.curScenario.isObjectTypeLine !== undefined ? true : false
        );
    }, [catalogEditor.curScenario]);

    return (
        <tr
            style={{
                display: isVisible ? 'table-row' : 'none',
            }}
        >
            <td colSpan={3} className="align-bottom">
                <Form.Text>Варианты расчёта объёма исследований:</Form.Text>
            </td>
            <td className="align-bottom text-center">
                <Form.Text> Сценарий</Form.Text>
            </td>
            <td className="align-bottom text-center">
                <Form.Text>Ед. изм.</Form.Text>
            </td>
            <td className="align-bottom text-center">
                <Form.Text>Цена</Form.Text>
            </td>
            <td className="align-bottom text-center">
                <Form.Text>Опции</Form.Text>
            </td>
        </tr>
    );
});

export default CatalogEditorSubheadings;
