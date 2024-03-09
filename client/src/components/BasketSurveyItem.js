import React, { useContext, useEffect, useState } from 'react';

import VariantItem from './VariantItem.js';
import CatalogSubheadingsForObjectTypes from './CatalogSubheadingsForObjectTypes.js';
import { AppContext } from './AppContext.js';
import { quantityCalculators } from '../calculators/quantityCalculators.js';

function formatNumberWithSpaces(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
}

const BasketSurveyItem = ({ id, name, variants }) => {
    const { basket } = useContext(AppContext);
    const [quantity, setQuantity] = useState(variants[0].defaultQuantity || 1);
    const variantsList = [];

    useEffect(() => {
        if (!variants[0].quantityCalculatorName) return;
        setQuantity(
            quantityCalculators[variants[0].quantityCalculatorName]({
                lendAreaInSqM: basket.lendAreaInSqM,
                testingSitesNumberPerFiveHa: basket.testingSitesNumberPerFiveHa,
                isObjectTypeLine: basket.isObjectTypeLine,
                trackLengthInM: basket.trackLengthInM,
            })
        );
        // eslint-disable-next-line
    }, [
        basket.isObjectTypeLine,
        basket.lendAreaInSqM,
        basket.testingSitesNumberPerFiveHa,
        basket.trackLengthInM,
    ]);

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
                <td>{name}</td>
                <td className="text-center">{variants[0].unit}</td>
                <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                    {formatNumberWithSpaces(variants[0].price) + ' ₽'}
                </td>
                <td className="text-center">{quantity}</td>
                <td className="text-center fw-bold" style={{ whiteSpace: 'nowrap' }}>
                    {formatNumberWithSpaces(variants[0].price * quantity) + ' ₽'}
                </td>
                <td
                    style={{ minWidth: '28em' }}
                    dangerouslySetInnerHTML={{
                        __html: variants[0].properties?.replace(/\n/g, '<br>') || '-',
                    }}
                />

                <td
                    style={{ minWidth: '30em' }}
                    dangerouslySetInnerHTML={{
                        __html: `${
                            variants[0].normDoc?.replace(/\n/g, '<br>') || '-'
                        }<br/>${
                            variants[0].justification?.replace(/\n/g, '<br>') || '-'
                        }`,
                    }}
                />
            </tr>
        </>
    );
};

export default BasketSurveyItem;
