export const convertBasketParamsToEESCalculatorStoreParams = (basket) => {
    return {
        isObjectTypeLine: basket.isObjectTypeLine,
        plotAreaInSqM: basket.isObjectTypeLine === false ? basket.lendAreaInSqM : null,
        testingSitesNumberPerFiveHa: basket.testingSitesNumberPerFiveHa,
        trackAreaInSqM: basket.isObjectTypeLine === true ? basket.lendAreaInSqM : null,
        trackLengthInM: basket.trackLengthInM,
        trackWidthInM: basket.trackWidthInM,
    };
};

export const convertEESCalculatorStoreParamsToQuantityCalculatorParams = (params) => {
    return {
        isObjectTypeLine: params.isObjectTypeLine,
        lendAreaInSqM: params.isObjectTypeLine
            ? params.trackAreaInSqM
            : params.plotAreaInSqM,
        testingSitesNumberPerFiveHa: params.isObjectTypeLine
            ? null
            : params.testingSitesNumberPerFiveHa,
        trackLengthInM: params.isObjectTypeLine ? params.trackLengthInM : null,
        trackWidthInM: params.isObjectTypeLine ? params.trackWidthInM : null,
    };
};
