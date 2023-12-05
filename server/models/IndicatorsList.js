// модуль не участвует в программе, будет использоваться в будущем

import { IndicatorsList as IndicatorsListMapping } from './mapping.js';

class IndicatorsList {
    async getAll() {
        const indicatorsLists = await IndicatorsListMapping.findAll();
        return indicatorsLists;
    }

    async getOne(id) {
        const indicatorsList = await IndicatorsListMapping.findByPk(id);
        if (!indicatorsList) {
            throw new Error('Список определяемых параметров не найден в БД');
        }
        return indicatorsList;
    }
    
    async create(data) {
        const {name, description} = data;
        const indicatorsList = await IndicatorsListMapping.create({description, name});
        return indicatorsList;
    }
    
    async update(id, data) {
        const indicatorsList = await IndicatorsListMapping.findByPk(id);
        if (!indicatorsList) {
            throw new Error('Список определяемых параметров не найден в БД');
        }
        const changes = {};
        if (data.name) changes.name = data.name;
        if (data.description) changes.description = data.description;

        if (Object.keys(changes)) {
            await indicatorsList.update(changes);
        }
        return indicatorsList;
    }
    
    async delete(id) {
        const indicatorsList = await IndicatorsListMapping.findByPk(id);
        if (!indicatorsList) {
            throw new Error('Список определяемых параметров не найден в БД');
        }
        await indicatorsList.destroy();
        return indicatorsList;
    }
}

export default new IndicatorsList();