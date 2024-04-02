import React from 'react';
import VariantItem from './VariantItem.js';
import CatalogSubheadings from './CatalogSubheadings.js';

const SurveyItem = ({ id, name, variants }) => {
    const variantsList = [];
    variants.forEach((variant) => {
        variantsList.push(
            <VariantItem
                key={variant.id + 'variant'}
                id={variant.id}
                surveyId={id}
                surveyName={name}
                description={variant.description}
                unit={variant.unit}
                defaultQuantity={variant.defaultQuantity}
                unitPrice={variant.price}
                isObjectTypeLine={variant.isObjectTypeLine}
                quantityCalculatorName={variant.quantityCalculatorName}
                dynamicUnitPriceIdAndLevel={variant.dynamicPriceIdAndLevel}
                quantity={variant.quantity}
                checked={variant.checked}
                normDoc={variant.normDoc}
                properties={variant.properties}
                justification={variant.justification}
            />
        );
    });

    return (
        <>
            <tr>
                <td colSpan={6}>
                    <strong style={{ fontSize: '0.95em' }}>{name}</strong>
                </td>
            </tr>
            <CatalogSubheadings />
            {variantsList}
        </>
    );
};

export default SurveyItem;
