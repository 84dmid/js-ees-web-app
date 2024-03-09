import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import { AppContext } from './AppContext';

const CatalogEditorSubheadingsForObjectTypes = observer(({ isObjectTypeLine }) => {
    const { catalogEditor } = useContext(AppContext);
    const [isVisible, setIsVisible] = useState(true);

    const getObjectTypeText = () => {
        if (isObjectTypeLine === null) {
            return 'Варианты расчёта объёма исследований (все типы объектов):';
        } else if (isObjectTypeLine === true) {
            return 'Варианты расчёта объёма исследований (линейные объекты):';
        } else {
            return 'Варианты расчёта объёма исследований (нелинейные объекты):';
        }
    };

    useEffect(() => {
        setIsVisible(() =>
            catalogEditor.curScenario.isObjectTypeLine === undefined ? true : false
        );
        // eslint-disable-next-line
    }, [catalogEditor.curScenario]);

    return (
        <tr
            style={{
                display: isVisible ? 'table-row' : 'none',
            }}
        >
            <td colSpan={3} className="align-bottom">
                <Form.Text>{getObjectTypeText(isObjectTypeLine)}</Form.Text>
            </td>
            <td className="align-bottom text-center">
                <Form.Text>Сценарий</Form.Text>
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

export default CatalogEditorSubheadingsForObjectTypes;
