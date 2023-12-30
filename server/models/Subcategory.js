import { Op } from 'sequelize';

import sequelize from '../sequelize.js';

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

    async create({ name, categoryId }) {
        const maxOrder = await SubcategoryMapping.max('order');
        const subcategory = await SubcategoryMapping.create({
            order: maxOrder + 1,
            name,
            categoryId,
        });
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

    async moveDown(id, { categoryId }) {
        const subcategory = await SubcategoryMapping.findByPk(id);
        if (!subcategory) {
            throw new Error('Подкатегория не найдена в БД');
        }
        const maxOrder = await SubcategoryMapping.max('order', { where: { categoryId } });
        if (subcategory.order === maxOrder) {
            return { message: 'Подкатегория уже в самом низу' };
        }
        const nextSubcategory = await SubcategoryMapping.findOne({
            where: {
                order: {
                    [Op.gt]: subcategory.order,
                },
                categoryId,
            },
            order: [['order', 'ASC']], // Сортировка по возрастанию
        });
        await sequelize.transaction(async (t) => {
            [subcategory.order, nextSubcategory.order] = [
                nextSubcategory.order,
                subcategory.order,
            ];
            await subcategory.save({ transaction: t });
            await nextSubcategory.save({ transaction: t });
        });
        await subcategory.reload();
        return subcategory;
    }

    async moveUp(id, { categoryId }) {
        const subcategory = await SubcategoryMapping.findByPk(id);
        if (!subcategory) {
            throw new Error('Подкатегория не найдена в БД');
        }
        const minOrder = await SubcategoryMapping.min('order', { where: { categoryId } });
        if (subcategory.order === minOrder) {
            return { message: 'Подкатегория уже в самом верху' };
        }
        const prevSubcategory = await SubcategoryMapping.findOne({
            where: {
                order: {
                    [Op.lt]: subcategory.order,
                },
                categoryId,
            },
            order: [['order', 'DESC']], // Сортировка по убыванию
        });
        await sequelize.transaction(async (t) => {
            [subcategory.order, prevSubcategory.order] = [
                prevSubcategory.order,
                subcategory.order,
            ];
            await subcategory.save({ transaction: t });
            await prevSubcategory.save({ transaction: t });
        });
        await subcategory.reload();
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
