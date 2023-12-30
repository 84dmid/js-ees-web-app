import { guestInstance } from './index.js';

const basketAPI = {
    async fetchBasket() {
        const { data } = await guestInstance.get('basket/get_one');
        return data;
    },

    async append(id, quantity) {
        console.log(typeof id, typeof quantity);
        const { data } = await guestInstance.put(
            `basket/variant/${id}/append/${quantity}`
        );

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
