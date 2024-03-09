import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import { AppContext } from './AppContext';

const CatalogSubheadingsForObjectTypes = observer(({ isObjectTypeLine, isEditor }) => {
    const { basket, catalogEditor } = useContext(AppContext);
    const [isVisible, setIsVisible] = useState(true);

    const getObjectTypeText = () => {
        if (isObjectTypeLine === null) {
            return 'Варианты расчёта количества единиц измерения для любых типов объектов:';
        } else if (isObjectTypeLine === true) {
            return 'Варианты расчёта количества единиц измерения только для линейных объектов:';
        } else {
            return 'Варианты расчёта количества единиц измерения только для нелинейных объектов:';
        }
    };

    useEffect(() => {
        if (isEditor) {
            if (Object.keys(catalogEditor.curScenario).length === 0) {
                setIsVisible(true);
            } else {
                setIsVisible(() =>
                    catalogEditor.curScenario.isObjectTypeLine !== null ? false : true
                );
            }
        } else {
            setIsVisible(() => (basket.isObjectTypeLine !== null ? false : true));
        }
        // eslint-disable-next-line
    }, [basket.isObjectTypeLine, catalogEditor.curScenario]);

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

export default CatalogSubheadingsForObjectTypes;
