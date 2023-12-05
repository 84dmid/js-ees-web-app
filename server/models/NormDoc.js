import { NormDoc as NormDocMapping } from './mapping.js';

class NormDoc {
    async getAll() {
        const normDocs = await NormDocMapping.findAll();
        return normDocs;
    }

    async getOne(id) {
        const normDoc = await NormDocMapping.findByPk(id);
        if (!normDoc) {
            throw new Error('Нормативный документ не найден в БД');
        }
        return normDoc;
    }
    
    async create(data) {
        const {name} = data;
        const normDoc = await NormDocMapping.create({name});
        return normDoc;
    }
    
    async update(id, data) {
        const normDoc = await NormDocMapping.findByPk(id);
        if (!normDoc) {
            throw new Error('Нормативный документ не найден в БД');
        }
        const changes = {};
        if (data.name) changes.name = data.name;

        if (Object.keys(changes)) {
            await normDoc.update(changes);
        }
        return normDoc;
    }
    
    async delete(id) {
        const normDoc = await NormDocMapping.findByPk(id);
        if (!normDoc) {
            throw new Error('Нормативный документ не найден в БД');
        }
        await normDoc.destroy();
        return normDoc;
    }
}

export default new NormDoc();