import { makeAutoObservable, toJS } from 'mobx';

const initCalcParams = {
    isObjectTypeLine: null,
    plotAreaInSqM: null,
    testingSitesNumberPerFiveHa: null,
    trackLengthInM: null,
    trackWidthInM: null,
};

class EESCalculatorStore {
    _initScenarios = [];
    _initRegions = [];

    _regionName = '';
    _regionId = null;

    _calcParams = initCalcParams;

    _isObjectTypeLine = null;
    _plotAreaInSqM = null;
    _testingSitesNumberPerFiveHa = null;
    _trackLengthInM = null;
    _trackWidthInM = null;

    _curScenario = '';

    constructor() {
        makeAutoObservable(this);
    }

    get initScenarios() {
        return this._initScenarios;
    }

    get initRegions() {
        return this._initRegions;
    }

    set initRegions(initRegions) {
        this._initRegions = initRegions;
    }

    set initScenarios(scenarios) {
        this._initScenarios = scenarios;
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

    get isObjectTypeLine() {
        return this._isObjectTypeLine;
    }

    set isObjectTypeLine(isObjectTypeLine) {
        this._isObjectTypeLine = isObjectTypeLine;
    }

    get plotAreaInSqM() {
        if (this._isObjectTypeLine === false) {
            return this._plotAreaInSqM;
        } else {
            return null;
        }
    }

    set plotAreaInSqM(lendAreaInSqM) {
        if (this._isObjectTypeLine === false) {
            this._plotAreaInSqM = lendAreaInSqM;
        } else {
            this._plotAreaInSqM = null;
        }
    }

    get trackAreaInSqM() {
        if (this._isObjectTypeLine === true) {
            return this._trackLengthInM * this._trackWidthInM;
        } else {
            return null;
        }
    }

    get trackLengthInM() {
        return this._trackLengthInM;
    }

    get trackWidthInM() {
        return this._trackWidthInM;
    }

    get testingSitesNumberPerFiveHa() {
        return this._testingSitesNumberPerFiveHa;
    }

    set trackLengthInM(trackLengthInM) {
        this._trackLengthInM = trackLengthInM;
    }

    set trackWidthInM(trackWidthInM) {
        this._trackWidthInM = trackWidthInM;
    }

    set testingSitesNumberPerFiveHa(testingSitesNumberPerFiveHa) {
        this._testingSitesNumberPerFiveHa = testingSitesNumberPerFiveHa;
    }

    get quantityCalculatorParams() {
        return {
            isObjectTypeLine: this._isObjectTypeLine,
            lendAreaInSqM: this._isObjectTypeLine
                ? this._trackLengthInM * this._trackWidthInM
                : this._plotAreaInSqM,
            testingSitesNumberPerFiveHa: this._isObjectTypeLine
                ? null
                : this._testingSitesNumberPerFiveHa,
            trackLengthInM: this._isObjectTypeLine ? this._trackLengthInM : null,
            trackWidthInM: this._isObjectTypeLine ? this._trackWidthInM : null,
        };
    }

    get params() {
        return {
            regionId: this._regionId,
            regionName: this._initRegions.find((region) => region.id === this._regionId)
                ?.name,
            isObjectTypeLine: this._isObjectTypeLine,
            plotAreaInSqM: this._plotAreaInSqM,
            testingSitesNumberPerFiveHa: this._testingSitesNumberPerFiveHa,
            trackAreaInSqM: this._trackLengthInM * this._trackWidthInM,
            trackLengthInM: this._trackLengthInM,
            trackWidthInM: this._trackWidthInM,
        };
    }

    set params(params) {
        const {
            isObjectTypeLine,
            plotAreaInSqM,
            lendAreaInSqM,
            trackLengthInM,
            trackWidthInM,
            testingSitesNumberPerFiveHa,
        } = params;

        this._isObjectTypeLine = isObjectTypeLine;
        this._plotAreaInSqM =
            isObjectTypeLine === false ? plotAreaInSqM || lendAreaInSqM : null;
        this._testingSitesNumberPerFiveHa =
            isObjectTypeLine === false ? testingSitesNumberPerFiveHa : null;
        this._trackLengthInM = isObjectTypeLine === true ? trackLengthInM : null;
        this._trackWidthInM = isObjectTypeLine === true ? trackWidthInM : null;
    }

    get isParamsValid() {
        if (
            this._isObjectTypeLine === false &&
            this._plotAreaInSqM > 0 &&
            this._testingSitesNumberPerFiveHa > 0
        ) {
            return true;
        } else if (
            this._isObjectTypeLine === true &&
            this._trackLengthInM > 0 &&
            this._trackWidthInM > 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    clearParams() {
        this._isObjectTypeLine = null;
        this._plotAreaInSqM = null;
        this._testingSitesNumberPerFiveHa = null;
        this._trackLengthInM = null;
        this._trackWidthInM = null;
    }

    get curScenarios() {
        return this._initScenarios.filter(
            (scenario) => scenario.isObjectTypeLine === this.isObjectTypeLine
        );
    }

    get curScenario() {
        if (this._curScenario.isObjectTypeLine === this._isObjectTypeLine) {
            return this._curScenario;
        } else {
            return '';
        }
    }

    set curScenario(scenario) {
        this._curScenario = scenario;
    }
}

export default EESCalculatorStore;
