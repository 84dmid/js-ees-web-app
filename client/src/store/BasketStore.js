import { makeAutoObservable } from 'mobx';
import { getLevelPriceById } from '../handlers/variantPriceHandler';

class BasketStore {
    _isObjectTypeLine = null;
    _lendAreaInSqM = null;
    _trackLengthInM = null;
    _trackWidthInM = null;
    _testingSitesNumberPerFiveHa = null;
    _variants = [];

    constructor() {
        makeAutoObservable(this);
    }

    get isObjectTypeLine() {
        return this._isObjectTypeLine;
    }

    get lendAreaInSqM() {
        return this._lendAreaInSqM;
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

    get variants() {
        return this._variants;
    }

    get count() {
        return this._variants.length;
    }

    get sum() {
        return this._variants.reduce((sum, item) => {
            let price = item.price;
            if (item.dynamicPriceIdAndLevel) {
                price = getLevelPriceById(this._variants, item.dynamicPriceIdAndLevel);
            }
            return sum + price * item.quantity;
        }, 0);
    }

    set isObjectTypeLine(isObjectTypeLine) {
        this._isObjectTypeLine = isObjectTypeLine;
    }

    set lendAreaInSqM(lendAreaInSqM) {
        this._lendAreaInSqM = lendAreaInSqM;
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

    set variants(variants) {
        this._variants = variants;
    }

    getVariantById(id) {
        const variant = this._variants.find((item) => +item.variantId === +id);
        if (variant.dynamicPriceIdAndLevel) {
            variant.price = getLevelPriceById(
                this._variants,
                variant.dynamicPriceIdAndLevel
            );
        }
        variant.quantityPrice = variant.price * variant.quantity;
        return variant;
    }

    getObjectTypeName() {
        if (this._isObjectTypeLine === null) {
            return 'не выбран';
        } else if (this.isObjectTypeLine === true) {
            return 'линейный';
        } else {
            return 'нелинейный';
        }
    }

    getTrackAreaInSqM() {
        if (this._isObjectTypeLine === null || !this._isObjectTypeLine) {
            return null;
        } else {
            return this._lendAreaInSqM;
        }
    }

    getPlotAreaInSqM() {
        if (this._isObjectTypeLine === null || this._isObjectTypeLine) {
            return null;
        } else {
            return this._lendAreaInSqM;
        }
    }
}

export default BasketStore;
