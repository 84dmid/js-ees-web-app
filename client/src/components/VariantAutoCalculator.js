import React, { useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import { observer } from 'mobx-react-lite';
import basketAPI from '../http/basketAPI.js';
import { fetchVariantsByIds } from '../http/catalogAPI.js';
import { quantityCalculators } from '../calculators/quantityCalculators.js';

import ObjectTypeSelectionMenu from './EESCalculatorComponents/ObjectTypeSelectionMenu.js';
import ScenarioSelectionMenu from './EESCalculatorComponents/ScenarioSelectionMenu.js';
import {
    convertEESCalculatorStoreParamsToQuantityCalculatorParams,
    convertBasketParamsToEESCalculatorStoreParams,
} from './EESCalculatorComponents/EESCalculatorConverters.js';
import { isEESCalculatorStoreParamsValid } from './EESCalculatorComponents/isEESCalculatorStoreParamsValid.js';

const VariantAutoCalculator = observer(() => {
    const { basket, EESCalculator } = useContext(AppContext);

    const clearBasket = () => {
        basketAPI
            .clear()
            .then((data) => {
                basket.isObjectTypeLine = data.isObjectTypeLine;
                basket.lendAreaInSqM = data.lendAreaInSqM;
                basket.trackWidthInM = data.trackWidthInM;
                basket.trackLengthInM = data.trackLengthInM;
                basket.testingSitesNumberPerFiveHa = data.testingSitesNumberPerFiveHa;
                basket.variants = data.basketVariants;
            })
            .catch((error) => console.error(`Clearing basket error: ${error}`))
            .then(() => {
                EESCalculator.params =
                    convertBasketParamsToEESCalculatorStoreParams(basket);
            });
    };

    const calculateEESComposition = (scenario, params) => {
        if (!isEESCalculatorStoreParamsValid(params)) return;
        const variantIds = scenario.variantIds;
        fetchVariantsByIds(variantIds)
            .then((data) => {
                const variantsListForBasket = data.map((item) => {
                    const quantity = item.quantityCalculatorName
                        ? quantityCalculators[item.quantityCalculatorName](
                              convertEESCalculatorStoreParamsToQuantityCalculatorParams(
                                  params
                              )
                          )
                        : item.defaultQuantity || 1;
                    return { id: item.id, quantity };
                });
                return variantsListForBasket;
            })
            .catch((error) => console.error(`Fetching variants error: ${error}`))
            .then((variantsListForBasket) => {
                return basketAPI.appendVariantsList({
                    ...convertEESCalculatorStoreParamsToQuantityCalculatorParams(params),
                    variants: variantsListForBasket,
                });
            })
            .catch((error) =>
                console.error(`Appending in basket variants list error: ${error}`)
            )
            .then((data) => {
                basket.isObjectTypeLine = data.isObjectTypeLine;
                basket.lendAreaInSqM = data.lendAreaInSqM;
                basket.trackWidthInM = data.trackWidthInM;
                basket.trackLengthInM = data.trackLengthInM;
                basket.testingSitesNumberPerFiveHa = data.testingSitesNumberPerFiveHa;
                basket.variants = data.basketVariants;
            })
            .then(() => (EESCalculator.curScenario = ''));
    };

    const handleSubmit = (event, scenario, params) => {
        event.preventDefault();
        calculateEESComposition(scenario, params);
    };

    return (
        <Form
            className="mb-3"
            onSubmit={(event) =>
                handleSubmit(event, EESCalculator.curScenario, EESCalculator.params)
            }
        >
            <fieldset>
                <legend>Авторасчёт состава изысканий</legend>

                <ObjectTypeSelectionMenu />
                <ScenarioSelectionMenu />
                <div
                    className={
                        EESCalculator.params.isObjectTypeLine !== null ? 'mt-3' : 'd-none'
                    }
                >
                    <Button
                        type="submit"
                        variant="outline-primary"
                        className="w-100 mt-3 mb-3"
                    >
                        Рассчитать объемы исследований
                    </Button>

                    <Button
                        onClick={clearBasket}
                        variant="outline-primary"
                        className="w-100"
                    >
                        Сбросить параметры авторасчёта и очистить корзину
                    </Button>
                </div>
            </fieldset>
        </Form>
    );
});

export default VariantAutoCalculator;
