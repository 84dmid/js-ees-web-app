import { toJS } from 'mobx';
import { guestInstance } from './index.js';

const basketAPI = {
    async fetchBasket() {
        const { data } = await guestInstance.get('basket/get_one');
        return data;
    },

    async updateParams(params) {
        const { data } = await guestInstance.put('basket/project_params', params);
        return data;
    },

    async append(id, quantity) {
        const { data } = await guestInstance.put(
            `basket/variant/${id}/append/${quantity}`
        );
        return data;
    },

    async appendVariantsList(queryData) {
        const { data } = await guestInstance.put('basket/append/variants', queryData);
        return data;
    },

    async update(id, quantity) {
        const { data } = await guestInstance.put(
            `basket/variant/${id}/update/${quantity}`
        );
        return data;
    },

    async remove(id) {
        const { data } = await guestInstance.put(`basket/variant/${id}/remove`);
        return data;
    },

    async clear() {
        const { data } = await guestInstance.put(`basket/clear`);
        return data;
    },
};

export default basketAPI;
