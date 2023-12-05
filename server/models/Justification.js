import { Justification as JustificationMapping } from './mapping.js';

class Justification {
    async getAll() {
        const justifications = await JustificationMapping.findAll();
        return justifications;
    }

    async getOne(id) {
        const justification = await JustificationMapping.findByPk(id);
        if (!justification) {
            throw new Error('Обоснование объёма исследований не найдено БД');
        }
        return justification;
    }
    
    async create(data) {
        const {text} = data;
        const justification = await JustificationMapping.create({text});
        return justification;
    }
    
    async update(id, data) {
        const justification = await JustificationMapping.findByPk(id);
        if (!justification) {
            throw new Error('Обоснование объёма исследований не найдено БД');
        }
        const changes = {};
        if (data.text) changes.text = data.text;

        if (Object.keys(changes)) {
            await justification.update(changes);
        }
        return justification;
    }
    
    async delete(id) {
        const justification = await JustificationMapping.findByPk(id);
        if (!justification) {
            throw new Error('Обоснование объёма исследований не найдено БД');
        }
        await justification.destroy();
        return justification;
    }
}

export default new Justification();