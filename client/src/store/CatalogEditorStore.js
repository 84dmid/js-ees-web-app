import { makeAutoObservable } from 'mobx';

class CatalogEditorStore {
    _content = [];
    _scenarios = [];
    _curScenario = {};

    constructor() {
        makeAutoObservable(this);
    }

    get scenarios() {
        return this._scenarios;
    }

    get curScenario() {
        return this._curScenario;
    }

    get content() {
        return this._content;
    }

    set scenarios(scenarios) {
        this._scenarios = scenarios;
    }

    set curScenario(scenario) {
        this._curScenario = scenario;
    }

    set content(content) {
        this._content = content;
    }
}

export default CatalogEditorStore;
