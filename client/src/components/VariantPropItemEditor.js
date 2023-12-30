import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import {
    updateVariantProperty,
    deleteVariantProperty,
    moveDownVariantProperty,
    moveUpVariantProperty,
} from '../http/catalogAPI';

const VariantPropItemEditor = ({ prop, variantId, setVariantEditingToggle }) => {
    const [tempProp, setTempProp] = useState(prop);
    const [isEdit, setIsEdit] = useState(false);
    const tempVariantProp = {};
    const handleEditClick = (event) => {
        if (isEdit && Object.keys(tempVariantProp).length) {
            console.log(tempVariantProp.description);
            updateVariantProperty(prop.id, variantId, tempVariantProp)
                .then(() => setVariantEditingToggle((prevToggle) => !prevToggle))
                .catch((error) =>
                    console.error(`Property of variant updating error: ${error}`)
                );
            setIsEdit((prev) => !prev);
        } else {
            setIsEdit((prev) => !prev);
        }
    };

    const handleDeleteClick = () => {
        deleteVariantProperty(prop.id, variantId)
            .then(() => setVariantEditingToggle((prevToggle) => !prevToggle))
            .catch((error) =>
                console.error(`Property of variant deleting error: ${error}`)
            );
    };

    const moveDown = () => {
        moveDownVariantProperty(prop.id, variantId)
            .then(() => setVariantEditingToggle((prevToggle) => !prevToggle))
            .catch((error) =>
                console.error(`Property of variant moving down error: ${error}`)
            );
    };

    const moveUp = () => {
        moveUpVariantProperty(prop.id, variantId)
            .then(() => setVariantEditingToggle((prevToggle) => !prevToggle))
            .catch((error) =>
                console.error(`Property of variant moving up error: ${error}`)
            );
    };

    if (tempVariantProp.description?.includes('\n')) {
        console.log('Строка содержит разрывы строк.');
    } else {
        console.log('Строка не содержит разрывов строк.');
    }

    console.log(prop.description);

    return (
        <tr key={prop.id + 'variantProp'}>
            <td>
                <ButtonGroup size="sm">
                    <Button onClick={moveDown} variant="outline-secondary">
                        ↓
                    </Button>
                    <Button onClick={moveUp} variant="outline-secondary">
                        ↑
                    </Button>
                </ButtonGroup>
            </td>
            <td
                spellCheck={true}
                className={!isEdit ? '' : 'table-primary'}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                onInput={(event) => {
                    tempVariantProp.description = event.currentTarget.innerText;
                    console.log(JSON.stringify(prop.description));
                    if (prop.description?.includes('\n')) {
                        console.log('Строка содержит разрывы строк.');
                    } else {
                        console.log('Строка не содержит разрывов строк.');
                    }
                }}
                dangerouslySetInnerHTML={{
                    __html: prop.description.replace(/\n/g, '<br>'),
                }}
            >
                {/* <div>{prop.description}</div> */}
            </td>

            {/* <td
                spellCheck={true}
                className={!isEdit ? '' : 'table-primary'}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                onInput={(event) => {
                    tempVariantProp.description = event.currentTarget.innerHTML;
                    console.log('Текущее содержимое:', tempVariantProp.description);
                }}
            >
                {prop.description.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        {index !== prop.description.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}
            </td> */}

            <td
                spellCheck={true}
                className={!isEdit ? 'text-center' : 'text-center table-primary'}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                onInput={(event) => {
                    tempVariantProp.unit = event.currentTarget.innerText;
                }}
            >
                {prop.unit}
            </td>
            <td
                spellCheck={true}
                className={!isEdit ? 'text-center' : 'text-center table-primary'}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                onInput={(event) => {
                    tempVariantProp.price = parseInt(event.currentTarget.innerText);
                }}
            >
                {prop.price}
            </td>
            <td
                spellCheck={true}
                className={!isEdit ? 'text-center' : 'text-center table-primary'}
                contentEditable={isEdit}
                suppressContentEditableWarning={true}
                onInput={(event) => {
                    tempVariantProp.quantity = parseInt(event.currentTarget.innerText);
                }}
            >
                {prop.quantity}
            </td>
            <td className="text-center">{prop.quantity * prop.price}</td>
            <td>
                <ButtonGroup size="sm" className="w-100">
                    <Button variant="outline-primary" onClick={handleEditClick}>
                        {isEdit ? <>💾</> : <>✏️</>}
                    </Button>
                    <Button variant="outline-danger" onClick={handleDeleteClick}>
                        ❌
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default VariantPropItemEditor;
