import { makeAutoObservable } from 'mobx';

class EESCalculatorStore {
    _params = {};
    _scenarios = [];
    _curScenario = '';

    constructor() {
        makeAutoObservable(this);
    }

    get params() {
        return this._params;
    }

    get scenarios() {
        return this._scenarios;
    }

    get curScenario() {
        return this._curScenario;
    }

    set params(params) {
        this._params = params;
    }

    set scenarios(scenarios) {
        this._scenarios = scenarios;
    }

    set curScenario(scenario) {
        this._curScenario = scenario;
    }
}

export default EESCalculatorStore;
