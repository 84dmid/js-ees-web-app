export const isEESCalculatorStoreParamsValid = (params) => {
    const {
        isObjectTypeLine,
        plotAreaInSqM,
        trackWidthInM,
        trackLengthInM,
        trackAreaInSqM,
        testingSitesNumberPerFiveHa,
    } = params;
    if (
        isObjectTypeLine === false &&
        plotAreaInSqM > 0 &&
        testingSitesNumberPerFiveHa > 0
    ) {
        return true;
    } else if (
        isObjectTypeLine === true &&
        trackAreaInSqM > 0 &&
        trackLengthInM > 0 &&
        trackWidthInM > 0
    ) {
        return true;
    } else {
        return false;
    }
};
