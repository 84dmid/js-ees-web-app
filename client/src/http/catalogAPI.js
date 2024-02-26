import { guestInstance, authInstance } from './index.js';

export const fetchCatalog = async ({
    categoryIds,
    subcategoryIds,
    objectTypeIds,
    surveyIds,
    variantIds,
}) => {
    const params = {};
    if (categoryIds) params.categoryFilter = categoryIds;
    if (subcategoryIds) params.subcategoryFilter = subcategoryIds;
    if (objectTypeIds) params.objectTypeFilter = objectTypeIds;
    if (surveyIds) params.surveyFilter = surveyIds;
    if (variantIds) params.variantFilter = variantIds;

    const { data } = await guestInstance.get('category/content', {
        params,
    });
    return data;
};

export const fetchFullCatalog = async ({
    categoryIds,
    subcategoryIds,
    objectTypeIds,
    surveyIds,
    variantIds,
}) => {
    const params = {};
    if (categoryIds) params.categoryFilter = categoryIds;
    if (subcategoryIds) params.subcategoryFilter = subcategoryIds;
    if (objectTypeIds) params.objectTypeFilter = objectTypeIds;
    if (surveyIds) params.surveyFilter = surveyIds;
    if (variantIds) params.variantFilter = variantIds;

    const { data } = await authInstance.get('category/full_content', {
        params,
    });

    console.log(data);
    return data;
};

export const createCategory = async (category) => {
    const { data } = await authInstance.post('category/create', category);
    return data;
};

export const updateCategory = async (id, category) => {
    const { data } = await authInstance.put(`category/update/${id}`, category);
    return data;
};

export const moveUpCategory = async (id) => {
    const { data } = await authInstance.put(`category/move_up/${id}`);
    return data;
};

export const moveDownCategory = async (id) => {
    const { data } = await authInstance.put(`category/move_down/${id}`);
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

export const moveUpSubcategory = async (id, categoryId) => {
    const { data } = await authInstance.put(`subcategory/move_up/${id}`, { categoryId });
    return data;
};

export const moveDownSubcategory = async (id, categoryId) => {
    const { data } = await authInstance.put(`subcategory/move_down/${id}`, {
        categoryId,
    });
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

export const moveUpSurvey = async (id, subcategoryId) => {
    const { data } = await authInstance.put(`survey/move_up/${id}`, {
        subcategoryId,
    });
    return data;
};

export const moveDownSurvey = async (id, subcategoryId) => {
    const { data } = await authInstance.put(`survey/move_down/${id}`, {
        subcategoryId,
    });
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

export const moveUpObjectType = async (id) => {
    const { data } = await authInstance.put(`object_type/move_up/${id}`);
    return data;
};

export const moveDownObjectType = async (id) => {
    const { data } = await authInstance.put(`object_type/move_down/${id}`);
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

export const moveUpVariant = async (id, surveyId, objectTypeId) => {
    const { data } = await authInstance.put(`variant/move_up/${id}`, {
        surveyId,
        objectTypeId,
    });
    return data;
};

export const moveDownVariant = async (id, surveyId, objectTypeId) => {
    const { data } = await authInstance.put(`variant/move_down/${id}`, {
        surveyId,
        objectTypeId,
    });
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

export const fetchVariantsByIds = async (variantIds) => {
    const params = {};
    if (variantIds) params.variantIds = variantIds;
    const { data } = await guestInstance.get(`variant/get_all_by_ids`, { params });
    return data;
};

export const fetchUnits = async () => {
    const { data } = await authInstance.get('unit/get_all');
    return data;
};

export const createHandler = async (handler) => {
    const { data } = await authInstance.post('handler/create', handler);
    return data;
};

export const updateHandler = async (id, handler) => {
    const { data } = await authInstance.put(`handler/update/${id}`, handler);
    return data;
};

export const deleteHandler = async (id) => {
    const { data } = await authInstance.delete(`handler/delete/${id}`);
    return data;
};

export const fetchHandlers = async () => {
    const { data } = await authInstance.get('handler/get_all');
    return data;
};

// export const createVariantProperty = async (variantId, variantProp) => {
//     const { data } = await authInstance.post(
//         `variant/${variantId}/property/create`,
//         variantProp
//     );
//     return { data };
// };

// export const updateVariantProperty = async (id, variantId, variantProp) => {
//     const { data } = await authInstance.put(
//         `variant/${variantId}/property/update/${id}`,
//         variantProp
//     );
//     return { data };
// };

// export const moveDownVariantProperty = async (id, variantId) => {
//     const { data } = await authInstance.put(
//         `variant/${variantId}/property/move_down/${id}`
//     );
//     return { data };
// };

// export const moveUpVariantProperty = async (id, variantId) => {
//     const { data } = await authInstance.put(
//         `variant/${variantId}/property/move_up/${id}`
//     );
//     return { data };
// };

// export const deleteVariantProperty = async (id, variantId) => {
//     console.log(id, variantId);
//     const { data } = await authInstance.delete(
//         `variant/${variantId}/property/delete/${id}`
//     );
//     return { data };
// };
