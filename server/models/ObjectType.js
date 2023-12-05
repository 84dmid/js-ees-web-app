import { ObjectType as ObjectTypeMapping } from './mapping.js';

class ObjectType {
    async getAll() {
        const objectTypes = await ObjectTypeMapping.findAll();
        return objectTypes;
    }

    async getOne(id) {
        const objectType = await ObjectTypeMapping.findByPk(id);
        if (!objectType) {
            throw new Error('Тип объекта капитального строительства не найден в БД');
        }
        return objectType;
    }
    
    async create(data) {
        const {name, order} = data;
        const objectType = await ObjectTypeMapping.create({name, order});
        return objectType;
    }
    
    async update(id, data) {
        const objectType = await ObjectTypeMapping.findByPk(id);
        if (!objectType) {
            throw new Error('Тип объекта капитального строительства не найден в БД');
        }
        const changes = {};
        if (data.order) changes.order = data.order;
        if (data.name) changes.name = data.name;

        if (Object.keys(changes)) {
            await objectType.update(changes);
        }
        return objectType;
    }
    
    async delete(id) {
        const objectType = await ObjectTypeMapping.findByPk(id);
        if (!objectType) {
            throw new Error('Тип объекта капитального строительства не найден в БД');
        }
        await objectType.destroy();
        return objectType;
    }
}

export default new ObjectType();