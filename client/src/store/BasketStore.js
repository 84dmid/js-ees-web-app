import { makeAutoObservable, toJS } from 'mobx';
import { priceCalculator } from '../calculators/variantPriceHandler';

class BasketStore {
    _initCatalog = [];
    _project = [];
    _isObjectTypeLine = null;
    _lendAreaInSqM = null;
    _trackLengthInM = null;
    _trackWidthInM = null;
    _testingSitesNumberPerFiveHa = null;
    _projectVariants = [];

    constructor() {
        makeAutoObservable(this);
    }

    // get initCatalog() {
    //     return this._initCatalog;
    // }

    // get project() {
    //     const basketVariantIds = new Set(
    //         this._projectVariants.map((variant) => variant.variantId)
    //     );

    //     const basketQuantities = {};
    //     this._projectVariants.forEach(
    //         (variant) => (basketQuantities[variant.variantId] = variant.quantity)
    //     );

    //     return this._initCatalog
    //         .map((category) => {
    //             const subcategories = category.subcategories
    //                 .map((subcategory) => {
    //                     const surveys = subcategory.surveys
    //                         .map((survey) => {
    //                             const filteredVariants = survey.variants
    //                                 .filter((variant) => basketVariantIds.has(variant.id))
    //                                 .map((variant) => ({
    //                                     ...variant,
    //                                     quantity:
    //                                         basketQuantities[variant.id] ||
    //                                         variant.defaultQuantity,
    //                                     price:
    //                                         priceCalculator(
    //                                             this._projectVariants,
    //                                             variant.dynamicPriceIdAndLevel
    //                                         ) || variant.price,
    //                                 }));
    //                             return filteredVariants.length > 0
    //                                 ? { ...survey, variants: filteredVariants }
    //                                 : null;
    //                         })
    //                         .filter(Boolean);
    //                     return surveys.length > 0 ? { ...subcategory, surveys } : null;
    //                 })
    //                 .filter(Boolean);
    //             return subcategories.length > 0 ? { ...category, subcategories } : null;
    //         })
    //         .filter(Boolean);
    // }

    // get isObjectTypeLine() {
    //     return this._isObjectTypeLine;
    // }

    // get lendAreaInSqM() {
    //     return this._lendAreaInSqM;
    // }

    // get trackLengthInM() {
    //     return this._trackLengthInM;
    // }

    // get trackWidthInM() {
    //     return this._trackWidthInM;
    // }

    // get testingSitesNumberPerFiveHa() {
    //     return this._testingSitesNumberPerFiveHa;
    // }

    // get variants() {
    //     return this._projectVariants;
    // }

    // get count() {
    //     return this._projectVariants.length;
    // }

    // get sum() {
    //     return this._projectVariants.reduce((sum, item) => {
    //         let price = item.price;
    //         if (item.dynamicPriceIdAndLevel) {
    //             price = priceCalculator(
    //                 this._projectVariants,
    //                 item.dynamicPriceIdAndLevel
    //             );
    //         }
    //         return sum + price * item.quantity;
    //     }, 0);
    // }

    // set initCatalog(initCatalog) {
    //     this._initCatalog = initCatalog;
    // }

    // set isObjectTypeLine(isObjectTypeLine) {
    //     this._isObjectTypeLine = isObjectTypeLine;
    // }

    // set lendAreaInSqM(lendAreaInSqM) {
    //     this._lendAreaInSqM = lendAreaInSqM;
    // }

    // set trackLengthInM(trackLengthInM) {
    //     this._trackLengthInM = trackLengthInM;
    // }

    // set trackWidthInM(trackWidthInM) {
    //     this._trackWidthInM = trackWidthInM;
    // }

    // set testingSitesNumberPerFiveHa(testingSitesNumberPerFiveHa) {
    //     this._testingSitesNumberPerFiveHa = testingSitesNumberPerFiveHa;
    // }

    // set variants(variants) {
    //     this._projectVariants = variants;
    // }

    // getVariantById(id) {
    //     const variant = this._projectVariants.find((item) => +item.variantId === +id);
    //     if (variant.dynamicPriceIdAndLevel) {
    //         variant.price = priceCalculator(
    //             this._projectVariants,
    //             variant.dynamicPriceIdAndLevel
    //         );
    //     }
    //     variant.quantityPrice = variant.price * variant.quantity;
    //     return variant;
    // }

    // getObjectTypeName() {
    //     if (this._isObjectTypeLine === null) {
    //         return 'не выбран';
    //     } else if (this.isObjectTypeLine === true) {
    //         return 'линейный';
    //     } else {
    //         return 'нелинейный';
    //     }
    // }

    // getTrackAreaInSqM() {
    //     if (this._isObjectTypeLine === null || !this._isObjectTypeLine) {
    //         return null;
    //     } else {
    //         return this._lendAreaInSqM;
    //     }
    // }

    // getPlotAreaInSqM() {
    //     if (this._isObjectTypeLine === null || this._isObjectTypeLine) {
    //         return null;
    //     } else {
    //         return this._lendAreaInSqM;
    //     }
    // }
}

export default BasketStore;
