import { makeAutoObservable } from 'mobx';

class InitDataStore {
    _catalog;
    _initScenarios;

    constructor() {
        makeAutoObservable(this, {
            _catalog: true,
            _scenarios: true,
        });
    }

    get catalog() {
        return this._catalog;
    }

    set catalog(catalog) {
        console.log('test 1');
        this._catalog = catalog;
    }
}

export default InitDataStore;
