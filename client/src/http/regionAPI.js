import { guestInstance, authInstance } from './index.js';

export const fetchRegions = async (queryParams) => {
    let params = {};
    if (queryParams) {
        const { isProduction = undefined } = queryParams;
        params = { isProduction };
    }
    const { data } = await guestInstance.get('region/get_all', { params });
    return data;
};

export const fetchRegion = async (id) => {
    const { data } = await guestInstance.get(`region/get_one/${id}`);
    return data;
};

export const createRegion = async (regionData) => {
    const { data } = await authInstance.post('region/create', regionData);
    return data;
};

export const createRegions = async (regionsData) => {
    const { data } = await authInstance.post('region/create_several', regionsData);
    return data;
};

export const updateRegion = async (id, region) => {
    const { data } = await authInstance.put(`region/update/${id}`, region);
    return data;
};

export const deleteRegion = async (id) => {
    const { data } = await authInstance.delete(`region/delete/${id}`);
    return data;
};
