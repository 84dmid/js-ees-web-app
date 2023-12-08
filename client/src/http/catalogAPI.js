import { guestInstance, authInstance } from './index.js';

export const createCategory = async (category) => {
    const { data } = await authInstance.post('category/create', category);
    return data;
};

export const updateCategory = async (id, category) => {
    const { data } = await authInstance.put(`category/update/${id}`, category);
    return data;
};

export const deleteCategory = async (id) => {
    const { data } = await authInstance.delete(`category/delete/${id}`);
    return data;
};

export const fetchCategory = async (id) => {
    const { data } = await guestInstance.get(`category/get_one/${id}`);
    return data;
};

export const fetchCategories = async () => {
    const { data } = await guestInstance.get(`category/get_all`);
    return data;
};

export const createSubcategory = async (subcategory) => {
    const { data } = await authInstance.post('subcategory/create', subcategory);
    return data;
};

export const updateSubcategory = async (id, subcategory) => {
    const { data } = await authInstance.put(`subcategory/update/${id}`, subcategory);
    return data;
};

export const deleteSubcategory = async (id) => {
    const { data } = await authInstance.delete(`subcategory/delete/${id}`);
    return data;
};

export const fetchSubcategory = async (id) => {
    const { data } = await guestInstance.get(`subcategory/get_one/${id}`);
    return data;
};

export const fetchSubcategories = async () => {
    const { data } = await guestInstance.get(`subcategory/get_all`);
    return data;
};

export const createSurvey = async (survey) => {
    const { data } = await authInstance.post('survey/create', survey);
    return data;
};

export const updateSurvey = async (id, survey) => {
    const { data } = await authInstance.put(`survey/update/${id}`, survey);
    return data;
};

export const deleteSurvey = async (id) => {
    const { data } = await authInstance.delete(`survey/delete/${id}`);
    return data;
};

export const fetchSurvey = async (id) => {
    const { data } = await guestInstance.get(`survey/get_one/${id}`);
    return data;
};

export const fetchSurveys = async () => {
    const { data } = await guestInstance.get(`survey/get_all`);
    return data;
};

export const createObjectType = async (objectType) => {
    const { data } = await authInstance.post('object_type/create', objectType);
    return data;
};

export const updateObjectType = async (id, objectType) => {
    const { data } = await authInstance.put(`object_type/update/${id}`, objectType);
    return data;
};

export const deleteObjectType = async (id) => {
    const { data } = await authInstance.delete(`object_type/delete/${id}`);
    return data;
};

export const fetchObjectType = async (id) => {
    const { data } = await guestInstance.get(`object_type/get_one/${id}`);
    return data;
};

export const fetchObjectTypes = async () => {
    const { data } = await guestInstance.get(`object_type/get_all`);
    return data;
};

export const createVariant = async (variant) => {
    const { data } = await authInstance.post('variant/create', variant);
    return data;
};

export const updateVariant = async (id, variant) => {
    const { data } = await authInstance.put(`variant/update/${id}`, variant);
    return data;
};

export const deleteVariant = async (id) => {
    const { data } = await authInstance.delete(`variant/delete/${id}`);
    return data;
};

export const fetchVariant = async (id) => {
    const { data } = await guestInstance.get(`variant/get_one/${id}`);
    return data;
};

export const fetchVariants = async () => {
    const { data } = await guestInstance.get(`variant/get_all`);
    return data;
};
