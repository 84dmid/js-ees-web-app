const variantHandlers = {
    // МЭД-гамма излучения на участке (Medical Gamma Radiation)
    MED_gamma_lend({ lendAreaInSqM }) {
        if (!lendAreaInSqM || lendAreaInSqM <= 0) return 0;
        const areaHec = lendAreaInSqM / 10000;
        let numberPoints;
        if (areaHec * 10 < 5) {
            numberPoints = 5;
        } else {
            numberPoints = Math.ceil(areaHec * 10);
        }
        return numberPoints;
    },

    // ППР на участке (Radon Flux Density)
    RnFP_lend({ lendAreaInSqM }) {
        if (!lendAreaInSqM || lendAreaInSqM <= 0) return 0;
        const areaHec = lendAreaInSqM / 10000;
        let numberPoints;
        if (areaHec <= 5) {
            if (areaHec * 15 < 10) {
                numberPoints = Math.ceil(10);
            } else {
                numberPoints = Math.ceil(areaHec * 15);
            }
        } else if (areaHec > 5 && areaHec <= 10) {
            if (areaHec * 10 < 75) {
                numberPoints = Math.ceil(75);
            } else {
                numberPoints = Math.ceil(areaHec * 10);
            }
        } else if (areaHec > 10) {
            if (areaHec * 5 < 100) {
                numberPoints = Math.ceil(100);
            } else {
                numberPoints = Math.ceil(areaHec * 5);
            }
        }
        return numberPoints;
    },

    // Химическое загрязнение по ГОСТ, ЕРН, биология по минимуму, токсикология верхнего слоя грунта (Contamination Level)
    CL_top_layer_soil_not_line_object({ lendAreaInSqM, testingSitesNumberPerFiveHa }) {
        if (!lendAreaInSqM || lendAreaInSqM <= 0) return 0;
        const areaHec = lendAreaInSqM / 10000;
        const numberPoints = Math.ceil(areaHec / (5 / testingSitesNumberPerFiveHa));
        return numberPoints;
    },

    // Биологическое загрязнение верхнего слоя грунта по ГОСТ (Biological Contamination Level)
    BCL_top_layer_soil_not_line_object({ lendAreaInSqM, testingSitesNumberPerFiveHa }) {
        if (!lendAreaInSqM || lendAreaInSqM <= 0) return 0;
        const areaHec = lendAreaInSqM / 10000;
        const numberPoints = Math.ceil(areaHec / (5 / testingSitesNumberPerFiveHa)) * 10;
        return numberPoints;
    },

    // Загрязнение верхнего слоя грунта для линейного объекта (за точку принимается одна объединённая проба - одно исследование)
    CL_top_layer_soil_line_object_pooled_sample({ trackLengthInM }) {
        if (!trackLengthInM || trackLengthInM <= 0) return 0;
        const lendExtensionsInKilometers = trackLengthInM / 1000;
        const numberPoints = Math.ceil(
            (lendExtensionsInKilometers <= 15
                ? Math.ceil(
                      lendExtensionsInKilometers / 2 > 3
                          ? lendExtensionsInKilometers / 2
                          : 3
                  )
                : Math.ceil(lendExtensionsInKilometers / 4)) / 1
        );
        return numberPoints;
    },

    // Загрязнение верхнего слоя грунта для линейного объекта (за точку принимается одна точечная проба в составе объединённой пробы из пяти точек, одна объединённая проба - одно исследование)
    CL_top_layer_soil_line_object_spot_sample({ trackLengthInM }) {
        if (!trackLengthInM || trackLengthInM <= 0) return 0;
        const lendExtensionsInKilometers = trackLengthInM / 1000;
        const numberPoints = Math.ceil(
            (lendExtensionsInKilometers <= 15
                ? Math.ceil(
                      lendExtensionsInKilometers / 2 > 3
                          ? lendExtensionsInKilometers / 2
                          : 3
                  )
                : Math.ceil(lendExtensionsInKilometers / 4)) / 5
        );
        return numberPoints;
    },

    // Одна единица измерения на один гектар
    one_unit_by_one_hectare({ lendAreaInSqM }) {
        if (!lendAreaInSqM || lendAreaInSqM <= 0) return 0;
        const areaHec = lendAreaInSqM / 10000;
        const numberUnit = Math.ceil(areaHec);
        return numberUnit;
    },

    // Одна единица измерения на 4 км
    one_unit_by_four_kilometers({ trackLengthInM }) {
        if (!trackLengthInM || trackLengthInM <= 0) return 0;
        const lendExtensionsInKilometers = trackLengthInM / 1000;
        const numberUnit = Math.ceil(lendExtensionsInKilometers / 4);
        return numberUnit;
    },

    // Возвращает 0.06
    getSixHundredths() {
        return 0.06;
    },

    // Возвращает 0.5
    getFiveHundredths() {
        return 0.05;
    },

    // Возвращает 0.1
    getOneTenths() {
        return 0.1;
    },

    // Возвращает 0.15
    getFifteenHundredths() {
        return 0.15;
    },

    // Возвращает 0.2
    getTwoTenths() {
        return 0.2;
    },

    // Возвращает 0.25
    getTwentyFiveHundredths() {
        return 0.25;
    },

    // Возвращает 0.3
    getThreeTenths() {
        return 0.3;
    },

    // Возвращает 0.35
    getThirtyFiveHundredths() {
        return 0.35;
    },

    // Возвращает 0.4
    getFour() {
        return 0.4;
    },

    // Возвращает 0.45
    getFortyFiveHundredths() {
        return 0.45;
    },

    // Возвращает 0.5
    getFiveTenths() {
        return 0.5;
    },

    // Возвращает 0.55
    getFiftyFiveHundredths() {
        return 0.55;
    },

    // Возвращает 0.6
    getSixTenths() {
        return 0.6;
    },

    // Возвращает 0.65
    getSixtyFiveHundredths() {
        return 0.65;
    },

    // Возвращает 0.7
    getSevenTenths() {
        return 0.7;
    },

    // Возвращает 0.75
    getSeventyFiveHundredths() {
        return 0.75;
    },

    // Возвращает 0.8
    getEightTenths() {
        return 0.8;
    },

    // Возвращает 0.85
    getEightyFiveHundredths() {
        return 0.85;
    },

    // Возвращает 0.9
    getNineTenths() {
        return 0.9;
    },

    // Возвращает 0.95
    getNinetyFiveHundredths() {
        return 0.95;
    },

    // Возвращает 1.0
    getOne() {
        return 1.0;
    },
};

export default variantHandlers;
