import { makeAutoObservable } from 'mobx';

class RegionEditorStore {
    _regions = [];

    constructor() {
        makeAutoObservable(this);
    }

    get regions() {
        return this._regions;
    }

    set regions(regions) {
        this._regions = regions;
    }
}

export default RegionEditorStore;
