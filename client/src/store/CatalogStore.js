import { makeAutoObservable } from 'mobx';

class CatalogStore {
    _categories = [];
    _subcategories = [];
    _surveys = [];
    _objectTypes = [];
    _variants = [];

    constructor() {
        makeAutoObservable(this);
    }

    get categories() {
        return this._categories;
    }

    get subcategories() {
        return this._subcategories;
    }

    get surveys() {
        return this._surveys;
    }

    get objectTypes() {
        return this._objectTypes;
    }

    get variants() {
        return this._variants;
    }

    set categories(categories) {
        this._categories = categories;
    }

    set subcategories(subcategories) {
        this._subcategories = subcategories;
    }

    set surveys(surveys) {
        this._surveys = surveys;
    }

    set objectTypes(objectTypes) {
        this._objectTypes = objectTypes;
    }

    set variants(variants) {
        this._variants = variants;
    }
}

export default CatalogStore;
