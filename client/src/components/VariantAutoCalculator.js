import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';

import { AppContext } from './AppContext.js';
import { observer } from 'mobx-react-lite';
import basketAPI from '../http/basketAPI.js';
import { fetchVariantsByIds } from '../http/catalogAPI.js';
import { quantityCalculators } from '../calculators/quantityCalculators.js';

import RegionSelectionMenu from './EESCalculatorComponents/RegionsSelectionMenu.js';
import ObjectTypeSelectionMenu from './EESCalculatorComponents/ObjectTypeSelectionMenu.js';
import ScenarioSelectionMenu from './EESCalculatorComponents/ScenarioSelectionMenu.js';

const VariantAutoCalculator = observer(() => {
    const { catalog, EESCalculator } = useContext(AppContext);

    const clearBasket = () => {
        basketAPI
            .clear()
            .catch((error) => console.error(`Clearing basket error: ${error}`))
            .then((data) => {
                EESCalculator.params = catalog.projectParams = data;
                EESCalculator.regionId = catalog.regionId = data.regionId;
                catalog.projectVariants = data.basketVariants;
            });
    };

    const calculateEESProject = (scenario, params) => {
        if (!EESCalculator.isParamsValid) return;
        const variantIds = scenario.variantIds;
        fetchVariantsByIds(variantIds)
            .then((data) => {
                const variantsListForBasket = data.map((item) => {
                    const quantity = item.quantityCalculatorName
                        ? quantityCalculators[item.quantityCalculatorName](
                              EESCalculator.quantityCalculatorParams
                          ).number
                        : item.defaultQuantity || 1;
                    return { id: item.id, quantity };
                });
                return variantsListForBasket;
            })
            .catch((error) => console.error(`Fetching variants error: ${error}`))
            .then((variantsListForBasket) => {
                return basketAPI.appendVariantsList({
                    ...EESCalculator.quantityCalculatorParams,
                    regionId: EESCalculator.regionId,
                    variants: variantsListForBasket,
                });
            })
            .catch((error) =>
                console.error(`Appending in basket variants list error: ${error}`)
            )
            .then((data) => {
                catalog.projectParams = data;
                catalog.projectVariants = data.basketVariants;
                catalog.regionId = data.regionId;
            })
            .then(() => (EESCalculator.curScenario = ''));
    };

    const handleSubmit = (event, scenario, params) => {
        event.preventDefault();
        calculateEESProject(scenario, params);
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
                <RegionSelectionMenu />
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
                        Сбросить параметры расчёта и очистить проект
                    </Button>
                </div>
            </fieldset>
        </Form>
    );
});

export default VariantAutoCalculator;
