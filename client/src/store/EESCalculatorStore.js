import { makeAutoObservable, toJS } from 'mobx';

const initQuantityCalculatorParams = {
    isObjectTypeLine: null,
    plotAreaInSqM: null,
    testingSitesNumberPerFiveHa: null,
    trackLengthInM: null,
    trackWidthInM: null,
};

class EESCalculatorStore {
    _initScenarios = [];
    _initRegions = [];

    _regionId = null;

    _quantityCalculatorParams = initQuantityCalculatorParams;

    _curScenario = '';

    constructor() {
        makeAutoObservable(this);
    }

    get initScenarios() {
        return this._initScenarios;
    }
    set initScenarios(scenarios) {
        this._initScenarios = scenarios;
    }

    get initRegions() {
        return this._initRegions;
    }
    set initRegions(initRegions) {
        this._initRegions = initRegions;
    }

    get regionId() {
        return this._regionId;
    }
    set regionId(regionId) {
        this._regionId = regionId;
    }
    get regionName() {
        return this._initRegions.find((region) => region.id === this._regionId)?.name;
    }

    get quantityCalculatorParams() {
        return this._quantityCalculatorParams;
    }
    set quantityCalculatorParams(params) {
        this._quantityCalculatorParams = params;
    }

    get isParamsValid() {
        if (
            this._quantityCalculatorParams.isObjectTypeLine === false &&
            this._quantityCalculatorParams.plotAreaInSqM > 0 &&
            this._quantityCalculatorParams.testingSitesNumberPerFiveHa > 0
        ) {
            return true;
        } else if (
            this._quantityCalculatorParams.isObjectTypeLine === true &&
            this._quantityCalculatorParams.trackLengthInM > 0 &&
            this._quantityCalculatorParams.trackWidthInM > 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    get curScenarios() {
        return this._initScenarios.filter(
            (scenario) =>
                scenario.isObjectTypeLine ===
                this._quantityCalculatorParams.isObjectTypeLine
        );
    }

    get curScenario() {
        if (
            this._curScenario.isObjectTypeLine ===
            this._quantityCalculatorParams.isObjectTypeLine
        ) {
            return this._curScenario;
        } else {
            return '';
        }
    }
    set curScenario(scenario) {
        this._curScenario = scenario;
    }

    clearParams() {
        this._quantityCalculatorParams = initQuantityCalculatorParams;
    }
}

export default EESCalculatorStore;
