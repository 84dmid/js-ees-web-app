import { Op } from 'sequelize';

import sequelize from '../sequelize.js';

import { VariantProp as VariantPropMapping } from './mapping.js';
import { Variant as VariantMapping } from './mapping.js';

class VariantProp {
    async getAll(variantId) {
        const variant = await VariantMapping.findByPk(variantId);
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        const props = await VariantPropMapping.findAll({ where: { variantId } });
        return props;
    }

    async getOne(variantId, id) {
        const variant = await VariantMapping.findByPk(variantId);
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        const property = await VariantPropMapping.findOne({ were: { variantId, id } });
        return property;
    }

    async create(variantId, data = {}) {
        const variant = await VariantMapping.findByPk(variantId);
        if (!Object.keys(data).length) {
            throw new Error('Нет данных для создания свойств варианта исследований');
        }
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        const maxOrder = await VariantPropMapping.max('order');
        const property = await VariantPropMapping.create({
            variantId,
            ...data,
            order: maxOrder + 1,
        });
        const variantProps = await VariantPropMapping.findAll({ where: { variantId } });
        let variantPrice = variant.price;
        if (variantProps.length) {
            variantPrice =
                variantProps.reduce((sum, prop) => sum + prop.quantity * prop.price, 0) ||
                variantPrice;
        }
        variant.update({ price: variantPrice });
        return property;
    }

    async update(variantId, id, data = {}) {
        if (!Object.keys(data).length) {
            throw new Error('Нет данных для обновления свойств варианта исследований');
        }
        const variant = await VariantMapping.findByPk(variantId);
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        const property = await VariantPropMapping.findOne({ where: { variantId, id } });
        if (!property) {
            throw new Error('Свойство варианта исследований не найдено в БД');
        }
        await property.update(data);
        const variantProps = await VariantPropMapping.findAll({ where: { variantId } });
        let variantPrice = variant.price;
        if (variantProps.length) {
            variantPrice =
                variantProps.reduce((sum, prop) => sum + prop.quantity * prop.price, 0) ||
                variantPrice;
        }
        variant.update({ price: variantPrice });
        return property;
    }

    async moveDown(id, variantId) {
        const variantProp = await VariantPropMapping.findByPk(id);
        if (!variantProp) {
            throw new Error('Свойство варианта не найдена в БД');
        }
        const maxOrder = await VariantPropMapping.max('order', { where: { variantId } });
        if (variantProp.order === maxOrder) {
            return { message: 'Свойство варианта уже в самом низу' };
        }
        const nextVariantProp = await VariantPropMapping.findOne({
            where: {
                order: {
                    [Op.gt]: variantProp.order,
                },
                variantId,
            },
            order: [['order', 'ASC']], // Сортировка по возрастанию
        });
        await sequelize.transaction(async (t) => {
            [variantProp.order, nextVariantProp.order] = [
                nextVariantProp.order,
                variantProp.order,
            ];
            await variantProp.save({ transaction: t });
            await nextVariantProp.save({ transaction: t });
        });
        await variantProp.reload();
        return variantProp;
    }

    async moveUp(id, variantId) {
        const variantProp = await VariantPropMapping.findByPk(id);
        if (!variantProp) {
            throw new Error('Свойство варианта не найдена в БД');
        }
        const minOrder = await VariantPropMapping.min('order', { where: { variantId } });
        if (variantProp.order === minOrder) {
            return { message: 'Свойство варианта уже в самом верху' };
        }
        const prevVariantProp = await VariantPropMapping.findOne({
            where: {
                order: {
                    [Op.lt]: variantProp.order,
                },
                variantId,
            },
            order: [['order', 'DESC']], // Сортировка по убыванию
        });
        await sequelize.transaction(async (t) => {
            [variantProp.order, prevVariantProp.order] = [
                prevVariantProp.order,
                variantProp.order,
            ];
            await variantProp.save({ transaction: t });
            await prevVariantProp.save({ transaction: t });
        });
        await variantProp.reload();
        return variantProp;
    }

    async delete(variantId, id) {
        const variant = await VariantMapping.findByPk(variantId);
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        const property = await VariantPropMapping.findOne({ where: { variantId, id } });
        if (!property) {
            throw new Error('Свойство варианта исследований не найдено в БД');
        }
        property.destroy();
        return property;
    }
}

export default new VariantProp();
