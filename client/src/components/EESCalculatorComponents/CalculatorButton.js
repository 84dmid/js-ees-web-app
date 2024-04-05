import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';

import StepByStepAutoCalc from './StepByStepAutoCalc';
import basketAPI from '../../http/basketAPI';
import { AppContext } from '../AppContext';

const CalculatorButton = ({ name, size, fontSize, variant, className }) => {
    const { catalog, EESCalculator } = useContext(AppContext);
    const [isShowingAutoCalcWindow, setIsSowingAutoCalcWindow] = useState(false);

    const handleCalcClick = () => {
        basketAPI
            .clear()
            .catch((error) => console.error(`Basket clearing error: ${error}`))
            .then((data) => {
                catalog.projectVariants = data.basketVariants;
                catalog.calcData = data;
                catalog.regionId = data.regionId;
                EESCalculator.clearParams();
                EESCalculator.regionId = null;
            })
            .then(() => {
                setIsSowingAutoCalcWindow(true);
            });
    };

    return (
        <>
            {isShowingAutoCalcWindow && (
                <StepByStepAutoCalc
                    isShow={isShowingAutoCalcWindow}
                    setIsShow={setIsSowingAutoCalcWindow}
                />
            )}
            <Button
                style={{ fontSize: fontSize || '' }}
                size={size || ''}
                variant={variant || 'primary'}
                className={className || 'w-100'}
                onClick={handleCalcClick}
            >
                {name || 'Рассчитать состав и ориентировочную стоимость изысканий'}
            </Button>
        </>
    );
};

export default CalculatorButton;
