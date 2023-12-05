import { VariantProp as VariantPropMapping } from './mapping.js';
import { Variant as VariantMapping } from './mapping.js';

class VariantProp {
    async getAll(variantId) {
        const variant = await VariantMapping.findByPk(variantId);
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        const props = await VariantPropMapping.findAll({where: {variantId}});
        return props;
    }

    async getOne(variantId, id) {
        const variant = await VariantMapping.findByPk(variantId);
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        const property = await VariantPropMapping.findOne({were: {variantId, id}});
        return property;
    }
    
    async create(variantId, data = {}) {
        const variant = await VariantMapping.findByPk(variantId);
        if (!Object.keys(data).length) {
            throw new Error('Нет данных для создания свойств варианта исследований')
        }
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        const property = await VariantPropMapping.create({variantId, ...data});
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
        const property = await VariantPropMapping.findOne({where: {variantId, id}});
        if (!property) {
            throw new Error('Свойство варианта исследований не найдено в БД');
        }
        await property.update(data);
        return property;
    }
    
    async delete(variantId, id) {
        const variant = await VariantMapping.findByPk(variantId);
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        const property = await VariantPropMapping.findOne({where: {variantId, id}});
        if (!property) {
            throw new Error('Свойство варианта исследований не найдено в БД');
        }
        property.destroy();
        return property;
    }
}

export default new VariantProp();