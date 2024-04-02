import { guestInstance, authInstance } from './index.js';

export const fetchScenarios = async (queryParams) => {
    let params = {};
    if (queryParams) {
        const { isObjectTypeLine = undefined, isProduction = undefined } = queryParams;
        params = { isObjectTypeLine, isProduction };
    }
    const { data } = await guestInstance.get('scenario/get_all', { params });

    const prettierData = data.map((scenario) => {
        const variantIds = scenario.scenarioVariants.map((item) => item.variantId);
        return { ...scenario, variantIds: variantIds };
    }); // написать приттер на сервере, убрать от сюда
    return prettierData;
};

export const fetchScenario = async (id) => {
    const { data } = await guestInstance.get(`scenario/get_one/${id}`);
    return data;
};

export const createScenario = async (scenarioData) => {
    const { data } = await authInstance.post('scenario/create', scenarioData);
    return data;
};

export const updateScenario = async (id, scenario) => {
    const { data } = await authInstance.put(`scenario/update/${id}`, scenario);
    return data;
};

export const moveUpScenario = async (id) => {
    const { data } = await authInstance.put(`scenario/move_up/${id}`);
    return data;
};

export const moveDownScenario = async (id) => {
    const { data } = await authInstance.put(`scenario/move_down/${id}`);
    return data;
};

export const appendVariantToScenario = async (scenarioId, variantId) => {
    const { data } = await authInstance.put(
        `scenario/${scenarioId}/append/variant/${variantId}`
    );
    return data;
};

export const removeVariantFromScenario = async (scenarioId, variantId) => {
    const { data } = await authInstance.put(
        `scenario/${scenarioId}/remove/variant/${variantId}`
    );
    return data;
};

export const deleteScenario = async (id) => {
    const { data } = await authInstance.delete(`scenario/delete/${id}`);
    return data;
};
