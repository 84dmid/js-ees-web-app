export const getLevelPriceById = (variants, textWithLevelNameAndId) => {
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
