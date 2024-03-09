import React from 'react';
import VariantItem from './VariantItem.js';
import CatalogSubheadingsForObjectTypes from './CatalogSubheadingsForObjectTypes.js';
import CatalogSubheadings from './CatalogSubheadings.js';

const SurveyItem = ({ id, name, variants }) => {
    const variantsList = [];

    let curObjectType;
    variants.forEach((variant) => {
        if (variant.isObjectTypeLine !== curObjectType) {
            curObjectType = variant.isObjectTypeLine;
            variantsList.push(
                <CatalogSubheadingsForObjectTypes
                    key={variant.id + 'objectTypeTextTableRow'}
                    isEditor={false}
                    isObjectTypeLine={curObjectType}
                />
            );
        }

        variantsList.push(
            <VariantItem
                key={variant.id + 'variant'}
                id={variant.id}
                surveyId={id}
                description={variant.description}
                unit={variant.unit}
                defaultQuantity={variant.defaultQuantity}
                unitPrice={variant.price}
                isObjectTypeLine={variant.isObjectTypeLine}
                quantityCalculatorName={variant.quantityCalculatorName}
                dynamicUnitPriceIdAndLevel={variant.dynamicPriceIdAndLevel}
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
