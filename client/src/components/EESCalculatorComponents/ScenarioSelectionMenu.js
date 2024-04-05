import React, { useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { AppContext } from '../AppContext.js';

const ScenarioSelectionMenu = observer(() => {
    const { EESCalculator } = useContext(AppContext);

    useEffect(() => {
        EESCalculator.curScenario = '';
    }, []);

    const handleChangeScenario = (event) => {
        EESCalculator.curScenario = EESCalculator.initScenarios.find(
            (scenario) => scenario.id === parseInt(event.target.id)
        );
    };

    const getScenariosRadioBoxList = (scenarios) => {
        return scenarios.map((item) => {
            const label = (
                <>
                    {item.name}{' '}
                    <sup>
                        <abbr title={item.description}>(?)</abbr>
                    </sup>
                </>
            );
            return (
                <Form.Check
                    key={item.id + 'scenario'}
                    type="radio"
                    name="scenario"
                    id={item.id + 'scenario'}
                    label={label}
                    checked={EESCalculator.curScenario.id === item.id}
                    onChange={handleChangeScenario}
                />
            );
        });
    };

    return (
        <div
            className={
                EESCalculator.quantityCalculatorParams.isObjectTypeLine !== null
                    ? ''
                    : 'd-none'
            }
        >
            <Form.Group className={'mt-2 mb-2'}>
                <p className="mb-1">Выберите сценарий использования участка:</p>
                {getScenariosRadioBoxList(EESCalculator.curScenarios)}
            </Form.Group>
        </div>
    );
});

export default ScenarioSelectionMenu;
