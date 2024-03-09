import { makeAutoObservable } from 'mobx';

class CatalogStore {
    _content = [];

    _categories = [];
    _checkedCategories = [];

    _subcategories = [];
    _checkedSubcategories = [];

    _surveyFilter = [];

    _variantFilter = [];

    constructor() {
        makeAutoObservable(this);
    }

    get content() {
        return this._content;
    }

    get categories() {
        return this._categories;
    }

    get checkedCategories() {
        return this._checkedCategories;
    }

    get subcategories() {
        return this._subcategories;
    }

    get checkedSubcategories() {
        return this._checkedSubcategories;
    }

    get surveyFilter() {
        return this._surveyFilter;
    }

    get variantFilter() {
        return this._variantFilter;
    }

    set content(content) {
        this._content = content;
    }

    set categories(categories) {
        this._categories = categories;
    }

    set checkedCategories(categoryIds) {
        this._checkedCategories = Array.from(new Set([...categoryIds]));
    }

    checkCategory(categoryId) {
        this._checkedCategories = Array.from(
            new Set([...this._checkedCategories, categoryId])
        );
    }

    uncheckCategory(categoryId) {
        this._checkedCategories = this._checkedCategories.filter(
            (item) => item !== categoryId
        );
    }

    set subcategories(subcategories) {
        this._subcategories = subcategories;
    }

    set checkedSubcategories(subcategoryIds) {
        this._checkedSubcategories = subcategoryIds;
    }

    checkSubcategory(subcategoryId) {
        this._checkedSubcategories = Array.from(
            new Set([...this._checkedSubcategories, subcategoryId])
        );
    }

    uncheckSubcategory(subcategoryId) {
        this._checkedSubcategories = this._checkedSubcategories.filter(
            (item) => item !== subcategoryId
        );
    }

    set surveyFilter(surveyIds) {
        this._surveyFilter = surveyIds;
    }

    checkObjectType(objectTypeId) {
        this._checkedObjectTypes = Array.from(
            new Set([...this._checkedObjectTypes, objectTypeId])
        );
    }

    uncheckObjectType(objectTypeId) {
        this._checkedObjectTypes = this._checkedObjectTypes.filter(
            (item) => item !== objectTypeId
        );
    }

    set variantFilter(variantIds) {
        this._variantFilter = variantIds;
    }
}

export default CatalogStore;
