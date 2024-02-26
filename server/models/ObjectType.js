import { Op } from 'sequelize';
import sequelize from '../sequelize.js';

import { ObjectType as ObjectTypeMapping } from './mapping.js';

class ObjectType {
    async getAll() {
        const objectTypes = await ObjectTypeMapping.findAll({ order: ['order'] });
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
        const { name, order, description } = data;
        const maxOrder = await ObjectTypeMapping.max('order');
        const objectType = await ObjectTypeMapping.create({
            name,
            order: maxOrder + 1,
            description,
        });
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
        if (data.description) changes.description = data.description;

        if (Object.keys(changes)) {
            await objectType.update(changes);
        }
        return objectType;
    }

    async moveDown(id) {
        const objectType = await ObjectTypeMapping.findByPk(id);
        if (!objectType) {
            throw new Error('Тип объекта не найдена в БД');
        }
        const maxOrder = await ObjectTypeMapping.max('order');
        if (objectType.order === maxOrder) {
            return { message: 'Тип объекта уже в самом низу' };
        }
        const nextObjectType = await ObjectTypeMapping.findOne({
            where: {
                order: {
                    [Op.gt]: objectType.order,
                },
            },
            order: [['order', 'ASC']], // Сортировка по возрастанию
        });
        await sequelize.transaction(async (t) => {
            [objectType.order, nextObjectType.order] = [
                nextObjectType.order,
                objectType.order,
            ];
            await objectType.save({ transaction: t });
            await nextObjectType.save({ transaction: t });
        });
        await objectType.reload();
        return objectType;
    }

    async moveUp(id) {
        const objectType = await ObjectTypeMapping.findByPk(id);
        if (!objectType) {
            throw new Error('Тип объекта не найдена в БД');
        }
        const minOrder = await ObjectTypeMapping.min('order');
        if (objectType.order === minOrder) {
            return { message: 'Тип объекта уже в самом верху' };
        }
        const prevObjectType = await ObjectTypeMapping.findOne({
            where: {
                order: {
                    [Op.lt]: objectType.order,
                },
            },
            order: [['order', 'DESC']], // Сортировка по убыванию
        });
        await sequelize.transaction(async (t) => {
            [objectType.order, prevObjectType.order] = [
                prevObjectType.order,
                objectType.order,
            ];
            await objectType.save({ transaction: t });
            await prevObjectType.save({ transaction: t });
        });
        await objectType.reload();
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
