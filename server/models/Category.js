import { Category as CategoryMapping } from './mapping.js';

class Category {
    async getAll() {
        const categories = await CategoryMapping.findAll();
        return categories;
    }

    async getOne(id) {
        const category = await CategoryMapping.findByPk(id);
        if (!category) {
            throw new Error('Категория не найдена в БД');
        }
        return category;
    }
    
    async create(data) {
        const {name, order} = data;
        const category = await CategoryMapping.create({order, name});
        return category;
    }
    
    async update(id, data) {
        const category = await CategoryMapping.findByPk(id);
        if (!category) {
            throw new Error('Категория не найдена в БД');
        }
        const changes = {};
        if (data.order) changes.order = data.order;
        if (data.name) changes.name = data.name;

        if (Object.keys(changes)) {
            await category.update(changes);
        }
        return category;
    }
    
    async delete(id) {
        const category = await CategoryMapping.findByPk(id);
        if (!category) {
            throw new Error('Категория не найдена в БД');
        }
        await category.destroy();
        return category;
    }
}

export default new Category();