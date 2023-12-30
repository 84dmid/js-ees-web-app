import { makeAutoObservable } from 'mobx';

class IsLoadingStore {
    _isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get state() {
        return this._isLoading;
    }

    set state(isLoading) {
        this._isLoading = isLoading;
    }
}

export default IsLoadingStore;
