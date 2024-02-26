import { guestInstance, authInstance } from './index.js';

export const fetchSurveyScenarios = async (queryParams) => {
    let params = {};
    if (queryParams) {
        const { isObjectTypeLine = undefined, isProduction = undefined } = queryParams;
        params = { isObjectTypeLine, isProduction };
    }
    const { data } = await guestInstance.get('survey_scenario/get_all', { params });
    return data;
};

export const fetchSurveyScenario = async (id) => {
    const { data } = await guestInstance.get(`survey_scenario/get_one/${id}`);
    return data;
};

export const createSurveyScenario = async (surveyScenarioData) => {
    const { data } = await authInstance.post(
        'survey_scenario/create',
        surveyScenarioData
    );
    return data;
};

export const updateSurveyScenario = async (id, surveyScenario) => {
    const { data } = await authInstance.put(
        `survey_scenario/update/${id}`,
        surveyScenario
    );
    return data;
};

export const moveUpSurveyScenario = async (id) => {
    const { data } = await authInstance.put(`survey_scenario/move_up/${id}`);
    return data;
};

export const moveDownSurveyScenario = async (id) => {
    const { data } = await authInstance.put(`survey_scenario/move_down/${id}`);
    return data;
};

export const appendVariantToSurveyScenario = async (scenarioId, variantId) => {
    const { data } = await authInstance.put(
        `survey_scenario/${scenarioId}/append/variant/${variantId}`
    );
    return data;
};

export const removeVariantFromSurveyScenario = async (scenarioId, variantId) => {
    const { data } = await authInstance.put(
        `survey_scenario/${scenarioId}/remove/variant/${variantId}`
    );
    return data;
};

export const deleteSurveyScenario = async (id) => {
    const { data } = await authInstance.delete(`survey_scenario/delete/${id}`);
    return data;
};
