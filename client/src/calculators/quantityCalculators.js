const quantityCalculators = {
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
};

quantityCalculators.MED_gamma_lend.isObjectTypeLine = null;
quantityCalculators.MED_gamma_lend.title =
    'Калькулятор количества точек измерения МЭД гамма излучения с поверхности участка';

quantityCalculators.RnFP_lend.isObjectTypeLine = null;
quantityCalculators.RnFP_lend.title =
    'Калькулятор количества точек измерения ППР с поверхности участка';

quantityCalculators.CL_top_layer_soil_not_line_object.isObjectTypeLine = false;
quantityCalculators.CL_top_layer_soil_not_line_object.title =
    'Калькулятор количества объединённых проб верхнего слоя грунта для нелинейных объектов (алгоритм для химии)';

quantityCalculators.BCL_top_layer_soil_not_line_object.isObjectTypeLine = false;
quantityCalculators.BCL_top_layer_soil_not_line_object.title =
    'Калькулятор количества объединённых проб верхнего слоя грунта для нелинейных объектов (алгоритм для биологии)';

quantityCalculators.CL_top_layer_soil_line_object_pooled_sample.isObjectTypeLine = true;
quantityCalculators.CL_top_layer_soil_line_object_pooled_sample.title =
    'Калькулятор количества объединённых проб верхнего слоя грунта для линейных объектов (точка - это объединённая проба)';

quantityCalculators.CL_top_layer_soil_line_object_spot_sample.isObjectTypeLine = true;
quantityCalculators.CL_top_layer_soil_line_object_spot_sample.title =
    'Калькулятор количества объединённых проб верхнего слоя грунта для линейных объектов (точка - это точечная проба в составе объединённой)';

quantityCalculators.one_unit_by_one_hectare.isObjectTypeLine = null;
quantityCalculators.one_unit_by_one_hectare.title = 'Одна единица измерения на 1 гектар';

quantityCalculators.one_unit_by_four_kilometers.isObjectTypeLine = null;
quantityCalculators.one_unit_by_four_kilometers.title = 'Одна единица измерения на 4 км';

function getQuantityCalculators() {
    const result = [];
    for (const name in quantityCalculators) {
        if (quantityCalculators.hasOwnProperty(name)) {
            const calcName =
                quantityCalculators[name].name || '!!! Калькулятор без названия';
            const title = quantityCalculators[name].title;
            const isObjectTypeLine = quantityCalculators[name].isObjectTypeLine;
            result.push({ calcName, title, isObjectTypeLine });
        }
    }
    return result;
}

export { quantityCalculators, getQuantityCalculators };
