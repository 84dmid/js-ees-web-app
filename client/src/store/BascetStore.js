import { makeAutoObservable } from 'mobx';

class BasketStore {
    // _content = [];
    _variants = [];

    constructor() {
        makeAutoObservable(this);
    }

    get variants() {
        return this._variants;
    }

    get count() {
        return this._variants.length;
    }

    get sum() {
        return this._variants.reduce(
            (sum, item) => sum + item.variant.price * item.quantity,
            0
        );
    }

    set variants(variants) {
        this._variants = variants;
    }
}

export default BasketStore;
