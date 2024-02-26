import React from 'react';
import { Form } from 'react-bootstrap';
import VariantItem from './VariantItem.js';

const SurveyItem = ({ id, name, variants }) => {
    const variantsList = [];
    let curObjectTypeId;
    variants.forEach((variant) => {
        if (variant.objectType && curObjectTypeId !== variant.objectType.id) {
            curObjectTypeId = variant.objectType.id;
            variantsList.push(
                <tr key={variant.objectType.id + 'objectType'}>
                    <td></td>
                    <td colSpan={6}>
                        <Form.Text>{variant.objectType.description}:</Form.Text>
                    </td>
                </tr>
            );
        }
        variantsList.push(
            <VariantItem
                handler={variant.handler?.name}
                key={variant.id + 'variant'}
                id={variant.id}
                surveyId={id}
                description={variant.description}
                unit={variant.unit}
                unitPrice={variant.price}
                dynamicUnitPriceIdAndLevel={variant.dynamicPriceIdAndLevel}
            />
        );
    });

    return (
        <>
            <tr>
                <td></td>
                <td colSpan={5} className="">
                    <b>{name}</b>
                </td>
            </tr>

            {variantsList}
        </>
    );
};

export default SurveyItem;
