const getTextByNumber = (number) => {
    const names = {
        1: 'одной чем одна площадка',
        2: 'двух площадок',
        3: 'трех площадок',
        4: 'четырех площадок',
        5: 'пяти площадок',
        6: 'шести площадок',
        7: 'семи площадок',
        8: 'восьми площадок',
        9: 'девяти площадок',
        10: 'десяти площадок',
    };

    return names[number];
};

const quantityCalculators = {
    // МЭД-гамма излучения на участке (Medical Gamma Radiation)
    MED_gamma_lend({ lendAreaInSqM }) {
        if (!lendAreaInSqM || lendAreaInSqM <= 0) return 0;
        let numberPoints;

        const areaInHa = lendAreaInSqM / 10000;
        if (areaInHa * 10 < 5) {
            numberPoints = 5;
        } else {
            numberPoints = Math.ceil(areaInHa * 10);
        }
        let justification = `Исследование включено в состав работ на основании п. 3.3. МУ 2.6.1.2398-08.
        Объём работ регламентируется п. 5. МУ 2.6.1.2398-08. Исследование проходит в два этапа:
        - на первом этапе проводится гамма-съемка территории с целью выявления и локализации возможных радиационных аномалий.
        - на втором этапе проводятся измерения мощности дозы гамма-излучения в контрольных точках. Количество контрольных точек определяется в соответствии с п. 5.3. МУ 2.6.1.2398-08.
        Рассчитанное количество контрольных точек для участка площадью ${areaInHa} га - ${numberPoints} шт.`;

        return { number: numberPoints, justification };
    },

    // ППР на участке (Radon Flux Density)
    RnFP_lend({ lendAreaInSqM }) {
        if (!lendAreaInSqM || lendAreaInSqM <= 0) return 0;
        let numberPoints;

        const areaInHa = lendAreaInSqM / 10000;
        if (areaInHa <= 5) {
            if (areaInHa * 15 < 10) {
                numberPoints = Math.ceil(10);
            } else {
                numberPoints = Math.ceil(areaInHa * 15);
            }
        } else if (areaInHa > 5 && areaInHa <= 10) {
            if (areaInHa * 10 < 75) {
                numberPoints = Math.ceil(75);
            } else {
                numberPoints = Math.ceil(areaInHa * 10);
            }
        } else if (areaInHa > 10) {
            if (areaInHa * 5 < 100) {
                numberPoints = Math.ceil(100);
            } else {
                numberPoints = Math.ceil(areaInHa * 5);
            }
        }
        let justification = `Исследование включено в состав работ на основании п. 3.3. МУ 2.6.1.2398-08.
        В случае, когда расположение контуров проектируемых объектов на участке не определено, объём работ регламентируется п. 6.2.1. МУ 2.6.1.2398-08. 
        Рассчитанное количество контрольных точек для участка площадью ${areaInHa} га - ${numberPoints} шт.`;

        return { number: numberPoints, justification };
    },

    // Химическое загрязнение по ГОСТ, ЕРН, биология по минимуму, токсикология верхнего слоя грунта (Contamination Level)
    CL_top_layer_soil_not_line_object({ lendAreaInSqM, testingSitesNumberPerFiveHa }) {
        if (!lendAreaInSqM || lendAreaInSqM <= 0) return 0;
        const areaInHa = lendAreaInSqM / 10000;

        const testingSitesNumber = Math.ceil(
            areaInHa / (5 / testingSitesNumberPerFiveHa)
        );
        const numberPoints = testingSitesNumber;

        let justification = `Исследование включено в состав работ на основании п. 120 СанПиН 2.1.3684-21.
        Определяемые показатели приняты в соответствии с п. 120 СанПиН 2.1.3684-21.
        Согласно п. 5.3 ГОСТ 17.4.4.02-2017 с одной пробной площадки предусмотрен отбор одной объединённой пробы из пяти точек, глубина отбора: 0 - 20 см. Нормативными документами не определён алгоритм расчёта количества пробных площадок. Расчёт произведён с учётом следующих условий:
        - не менее чем одна площадка на один участок;
        - не менее ${getTextByNumber(testingSitesNumberPerFiveHa)} на 5 га.
        Рассчитанный объём исследования для участка площадью ${areaInHa} га:
        - пробных площадок - ${testingSitesNumber} шт.
        - объединённых проб -  ${numberPoints} шт.
        - точек опробования - ${numberPoints * 5} шт.
        Объём исследований соответствует условию п. 7.1.8.4 СП 502.1325800.2021 – «…минимальное число точек опробования должно быть не менее трех точек на объект»`;
        return { number: numberPoints, justification };
    },

    // Биологическое загрязнение по минимуму
    BCL_minimum_top_layer_soil_not_line_object({
        lendAreaInSqM,
        testingSitesNumberPerFiveHa,
    }) {
        if (!lendAreaInSqM || lendAreaInSqM <= 0) return 0;

        const areaInHa = lendAreaInSqM / 10000;
        const testingSitesNumber = Math.ceil(
            areaInHa / (5 / testingSitesNumberPerFiveHa)
        );
        const numberPoints = testingSitesNumber;

        let justification = `Исследование включено в состав работ на основании п. 118 СанПиН 2.1.3684-21.
        Определяемые показатели приняты в соответствии с п. 118 СанПиН 2.1.3684-21.
        C одной пробной площадки предусмотрен отбор одной объединённой пробы из пяти точек. Глубина отбора: 0 - 20 см (см. п. 5.5 ГОСТ 17.4.4.02-2017). Нормативными документами не определён алгоритм расчёта количества пробных площадок. Расчёт произведён с учётом следующих условий:
        - не менее чем одна площадка на один участок;
        - не менее ${getTextByNumber(testingSitesNumberPerFiveHa)} на 5 га.
        Рассчитанный объём исследования для участка площадью ${areaInHa} га:
        - пробных площадок - ${testingSitesNumber} шт.
        - объединённых проб -  ${numberPoints} шт.
        - точек опробования - ${numberPoints * 5} шт.
        Объём исследований соответствует условию п. 7.1.8.4 СП 502.1325800.2021 – «…минимальное число точек опробования должно быть не менее трех точек на объект»`;

        return { number: numberPoints, justification };
    },

    // Биологическое загрязнение верхнего слоя грунта по ГОСТ (Biological Contamination Level)
    BCL_top_layer_soil_not_line_object({ lendAreaInSqM, testingSitesNumberPerFiveHa }) {
        if (!lendAreaInSqM || lendAreaInSqM <= 0) return 0;

        const areaInHa = lendAreaInSqM / 10000;
        const testingSitesNumber = Math.ceil(
            areaInHa / (5 / testingSitesNumberPerFiveHa)
        );
        const numberPoints = Math.ceil(areaInHa / (5 / testingSitesNumberPerFiveHa)) * 10;
        let justification = `Исследование включено в состав работ на основании п. 118 СанПиН 2.1.3684-21.
        Определяемые показатели приняты в соответствии с п. 118 СанПиН 2.1.3684-21.
        Согласно табл. 1 ГОСТ 17.4.3.01-2017 при определение патогенных организмов с одной пробной площадки отбирается десять объединённых проб, из пяти точек каждая. Глубина отбора: 0 - 20 см (см. п. 5.5 ГОСТ 17.4.4.02-2017). Нормативными документами не определён алгоритм расчёта количества пробных площадок. Расчёт произведён с учётом следующих условий:
        - не менее чем одна площадка на один участок;
        - не менее ${getTextByNumber(testingSitesNumberPerFiveHa)} на 5 га.
        Рассчитанный объём исследования для участка площадью ${areaInHa} га:
        - пробных площадок - ${testingSitesNumber} шт.
        - объединённых проб -  ${numberPoints} шт.
        - точек опробования - ${numberPoints * 3} шт.
        Объём исследований соответствует ГОСТ 17.4.3.01-2017 и условию п. 7.1.8.4 СП 502.1325800.2021 – «…минимальное число точек опробования должно быть не менее трех точек на объект»`;

        return { number: numberPoints, justification };
    },

    // Загрязнение верхнего слоя грунта для линейного объекта (за точку принимается одна объединённая проба - одно исследование)
    CL_top_layer_soil_line_object_pooled_sample({ trackLengthInM }) {
        if (!trackLengthInM || trackLengthInM <= 0) return 0;
        const trackLengthInKm = trackLengthInM / 1000;
        const numberPoints = Math.ceil(
            (trackLengthInKm <= 15
                ? Math.ceil(trackLengthInKm / 2 > 3 ? trackLengthInKm / 2 : 3)
                : Math.ceil(trackLengthInKm / 4)) / 1
        );
        let justification = `Исследование включено в состав работ на основании п. 120 СанПиН 2.1.3684-21.
        Определяемые показатели приняты в соответствии с п. 120 СанПиН 2.1.3684-21.
        Предусмотрен отбор одной объединённой пробы из пяти точек (по аналогу с п. 5.3 ГОСТ 17.4.4.02-2017), точки намечаются равноудалённо по трассе, глубина отбора: 0 - 20 см. Согласно п. 7.1.8.6 СП 502.1325800.2021 для трассы протяженностью ${trackLengthInKm} км рекомендуется принимать шаг опробования почв (или грунтов)  ${
            trackLengthInKm < 15
                ? '- одна точка на 2 км (но не менее трех точек на объект).'
                : '- одна точка на 4 км.'
        } 
        За точу принимается объединённая проба.
        Рассчитанный объём исследования для трассы протяжённостью ${trackLengthInKm} км:
        - объединённых проб - ${numberPoints} шт.
        - точек опробования - ${numberPoints * 5} шт.
        Объём исследований соответствует п. 7.1.8.6 СП 502.1325800.2021`;

        return { number: numberPoints, justification };
    },

    BCL_top_layer_soil_line_object_pooled_sample_max({ trackLengthInM }) {
        if (!trackLengthInM || trackLengthInM <= 0) return 0;
        const trackLengthInKm = trackLengthInM / 1000;
        const numberPoints = Math.ceil(
            (trackLengthInKm <= 15
                ? Math.ceil(trackLengthInKm / 2 > 3 ? trackLengthInKm / 2 : 3)
                : Math.ceil(trackLengthInKm / 4)) / 1
        );

        let justification = `Исследование включено в состав работ на основании п. 118 СанПиН 2.1.3684-21.
        Определяемые показатели приняты в соответствии с п. 118 СанПиН 2.1.3684-21.
        Предусмотрен отбор одной объединённой пробы из пяти точек (по аналогу с п. 5.3 ГОСТ 17.4.4.02-2017), точки размечаются равноудалённо по трассе, глубина отбора: 0 - 20 см (см. п. 5.5 ГОСТ 17.4.4.02-2017). Согласно п. 7.1.8.6 СП 502.1325800.2021 для трассы протяженностью ${trackLengthInKm} км рекомендуется принимать шаг опробования почв (или грунтов)  ${
            trackLengthInKm < 15
                ? '- одна точка на 2 км (но не менее трех точек на объект).'
                : '- одна точка на 4 км.'
        } 
        За точу принимается объединённая проба.
        Рассчитанный объём исследования для трассы протяжённостью ${trackLengthInKm} км:
        - объединённых проб - ${numberPoints} шт.
        - точек опробования - ${numberPoints * 5} шт.
        Объём исследований соответствует п. 7.1.8.6 СП 502.1325800.2021`;

        return { number: numberPoints, justification };
    },

    // Загрязнение верхнего слоя грунта для линейного объекта (за точку принимается одна точечная проба в составе объединённой пробы из пяти точек, одна объединённая проба - одно исследование)
    CL_top_layer_soil_line_object_spot_sample({ trackLengthInM }) {
        if (!trackLengthInM || trackLengthInM <= 0) return 0;
        const trackLengthInKm = trackLengthInM / 1000;
        const numberPoints = Math.ceil(
            (trackLengthInKm <= 15
                ? Math.ceil(trackLengthInKm / 2 > 3 ? trackLengthInKm / 2 : 3)
                : Math.ceil(trackLengthInKm / 4)) / 5
        );

        let justification = `Исследование включено в состав работ на основании п. 120 СанПиН 2.1.3684-21.
        Определяемые показатели приняты в соответствии с п. 120 СанПиН 2.1.3684-21.
        Предусмотрен отбор одной объединённой пробы из пяти точек (по аналогу с п. 5.3 ГОСТ 17.4.4.02-2017), точки намечаются равноудалённо по трассе, глубина отбора: 0 - 20 см. Согласно п. 7.1.8.6 СП 502.1325800.2021 для трассы протяженностью ${trackLengthInKm} км рекомендуется принимать шаг опробования почв (или грунтов)  ${
            trackLengthInKm < 15
                ? '- одна точка на 2 км (но не менее трех точек на объект).'
                : '- одна точка на 4 км.'
        } 
        За точу принимается точка опробования.
        Рассчитанный объём исследования для трассы протяжённостью ${trackLengthInKm} км:
        - объединённых проб - ${numberPoints} шт.
        - точек опробования - ${numberPoints * 5} шт.
        Объём исследований соответствует п. 7.1.8.6 СП 502.1325800.2021`;

        return { number: numberPoints, justification };
    },

    // Биозагрязнение верхнего слоя грунта для линейного объекта (минимум)
    BCL_top_layer_soil_line_object_spot_sample_min({ trackLengthInM }) {
        if (!trackLengthInM || trackLengthInM <= 0) return 0;
        const trackLengthInKm = trackLengthInM / 1000;
        const numberPoints = Math.ceil(
            (trackLengthInKm <= 15
                ? Math.ceil(trackLengthInKm / 2 > 3 ? trackLengthInKm / 2 : 3)
                : Math.ceil(trackLengthInKm / 4)) / 5
        );

        let justification = `Исследование включено в состав работ на основании п. 118 СанПиН 2.1.3684-21.
        Определяемые показатели приняты в соответствии с п. 118 СанПиН 2.1.3684-21.
        Предусмотрен отбор одной объединённой пробы из пяти точек (по аналогу с п. 5.3 ГОСТ 17.4.4.02-2017), точки намечаются равноудалённо по трассе, глубина отбора: 0 - 20 см (см. п. 5.5 ГОСТ 17.4.4.02-2017). Согласно п. 7.1.8.6 СП 502.1325800.2021 для трассы протяженностью ${trackLengthInKm} км рекомендуется принимать шаг опробования почв (или грунтов)  ${
            trackLengthInKm < 15
                ? '- одна точка на 2 км (но не менее трех точек на объект).'
                : '- одна точка на 4 км.'
        } 
        За точу принимается точка опробования.
        Рассчитанный объём исследования для трассы протяжённостью ${trackLengthInKm} км:
        - объединённых проб - ${numberPoints} шт.
        - точек опробования - ${numberPoints * 5} шт.
        Объём исследований соответствует п. 7.1.8.6 СП 502.1325800.2021`;

        return { number: numberPoints, justification };
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

quantityCalculators.BCL_minimum_top_layer_soil_not_line_object.isObjectTypeLine = false;
quantityCalculators.BCL_minimum_top_layer_soil_not_line_object.title =
    'Калькулятор количества объединённых проб верхнего слоя грунта для нелинейных объектов (биология, минимум)';

quantityCalculators.BCL_top_layer_soil_not_line_object.isObjectTypeLine = false;
quantityCalculators.BCL_top_layer_soil_not_line_object.title =
    'Калькулятор количества объединённых проб верхнего слоя грунта для нелинейных объектов (биология, максимум)';

quantityCalculators.CL_top_layer_soil_line_object_pooled_sample.isObjectTypeLine = true;
quantityCalculators.CL_top_layer_soil_line_object_pooled_sample.title =
    'Калькулятор количества объединённых проб верхнего слоя грунта для линейных объектов (химия, максимум)';

quantityCalculators.BCL_top_layer_soil_line_object_pooled_sample_max.isObjectTypeLine = true;
quantityCalculators.BCL_top_layer_soil_line_object_pooled_sample_max.title =
    'Калькулятор количества объединённых проб верхнего слоя грунта для линейных объектов (биология, максимум)';

quantityCalculators.CL_top_layer_soil_line_object_spot_sample.isObjectTypeLine = true;
quantityCalculators.CL_top_layer_soil_line_object_spot_sample.title =
    'Калькулятор количества объединённых проб верхнего слоя грунта для линейных объектов (химия, минимум)';

quantityCalculators.BCL_top_layer_soil_line_object_spot_sample_min.isObjectTypeLine = true;
quantityCalculators.BCL_top_layer_soil_line_object_spot_sample_min.title =
    'Калькулятор количества объединённых проб верхнего слоя грунта для линейных объектов (биология, минимум)';

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
