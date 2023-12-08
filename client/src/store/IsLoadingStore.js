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
        this.isLoading = isLoading;
    }
}

export default IsLoadingStore;
