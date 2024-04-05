import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';

import { AppContext } from '../AppContext';
import basketAPI from '../../http/basketAPI';

const CalculationClearButton = ({ name, size, fontSize, variant, className }) => {
    const { catalog, EESCalculator } = useContext(AppContext);

    const clearBasket = () => {
        basketAPI
            .clear()
            .catch((error) => console.error(`Clearing basket error: ${error}`))
            .then((data) => {
                EESCalculator.quantityCalculatorParams = catalog.calcData = data;
                EESCalculator.regionId = catalog.regionId = data.regionId;
                catalog.projectVariants = data.basketVariants;
            });
    };

    return (
        <Button
            onClick={clearBasket}
            style={{ fontSize: fontSize || '' }}
            size={size || ''}
            variant={variant || 'primary'}
            className={className || 'w-100'}
        >
            Очистить расчёт
        </Button>
    );
};

export default CalculationClearButton;
