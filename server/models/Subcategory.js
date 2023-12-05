import { Subcategory as SubcategoryMapping } from './mapping.js';

class Subcategory {
    async getAll() {
        const subcategories = await SubcategoryMapping.findAll();
        return subcategories;
    }

    async getOne(id) {
        const subcategory = await SubcategoryMapping.findByPk(id);
        if (!subcategory) {
            throw new Error('Подкатегория не найдена в БД');
        }
        return subcategory;
    }
    
    async create(data) {
        const subcategory = await SubcategoryMapping.create(data);
        return subcategory;
    }
    
    async update(id, data) {
        const subcategory = await SubcategoryMapping.findByPk(id);
        if (!subcategory) {
            throw new Error('Подкатегория не найдена в БД');
        }
        await subcategory.update(data);
        return subcategory;
    }
    
    async delete(id) {
        const subcategory = await SubcategoryMapping.findByPk(id);
        if (!subcategory) {
            throw new Error('Подкатегория не найдена в БД');
        }
        await subcategory.destroy();
        return subcategory;
    }
}

export default new Subcategory();