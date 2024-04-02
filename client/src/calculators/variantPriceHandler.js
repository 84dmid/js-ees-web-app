import { toJS } from 'mobx';

export const priceCalculator = (variants, textWithLevelNameAndId) => {
    console.log(toJS(variants));
    if (!textWithLevelNameAndId) return;
    const [levelName, levelId] = textWithLevelNameAndId.split('.');
    return variants
        .filter((item) => {
            return item[levelName + 'Id'] === parseInt(levelId);
        })
        .reduce((sum, item) => {
            return sum + item.quantity * item.price;
        }, 0);
};

export const getPriceAndDefaultQuantity = (variants, calcData) => {
    if (!calcData.levelId) return;
    const { levelId, levelName, priceShare } = calcData;

    let quantity = 0;
    const variantsTotalPrise = variants
        .filter((variant) => {
            return variant[levelName + 'Id'] === parseInt(levelId);
        })
        .reduce((sum, variant) => {
            quantity += variant.quantity;
            return sum + variant.quantity * variant.price;
        }, 0);
    const price = Math.round((variantsTotalPrise / quantity) * priceShare);

    return { price, quantity };
};
