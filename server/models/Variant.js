import { Op } from 'sequelize';

import sequelize from '../sequelize.js';

import { Variant as VariantMapping } from './mapping.js';
import { Category as CategoryMapping } from './mapping.js';
import { Subcategory as SubcategoryMapping } from './mapping.js';
import { Survey as SurveyMapping } from './mapping.js';
// import { VariantProp as VariantPropMapping } from './mapping.js'; // на будущее

const include = [
    {
        model: SurveyMapping,
        as: 'survey',
        attributes: ['id', 'name', 'subcategoryId'],
        include: [
            {
                model: SubcategoryMapping,
                attributes: ['id', 'name'],
                include: [{ model: CategoryMapping, attributes: ['id', 'name'] }],
            },
        ],
    },
];

class Variant {
    async getAll(options) {
        const { surveyIds = null, variantIds = null } = options;
        const where = {};
        if (surveyIds) where.surveyId = surveyIds;
        if (variantIds) where.id = variantIds;
        const variants = await VariantMapping.findAll({
            where,
        });
        return variants;
    }

    async getOne(id) {
        const variant = await VariantMapping.findOne({
            where: { id },
            attributes: [
                'id',
                'description',
                'defaultQuantity',
                'quantityCalculatorName',
                'price',
                'normDoc',
                'justification',
                'unit',
                'isObjectTypeLine',
                'properties',
                'isProduction',
                // 'handlerId',
                'dynamicPriceIdAndLevel',
            ],
            include,
        });
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        return variant;
    }

    async create(data) {
        const maxOrder = await VariantMapping.max('order');
        const variant = await VariantMapping.create({ ...data, order: maxOrder + 1 });
        return variant;
    }

    async update(id, data) {
        const variant = await VariantMapping.findByPk(id);
        await variant.update(data);
        await variant.reload();
        return variant;
    }

    async moveDown(id, { surveyId }) {
        const variant = await VariantMapping.findByPk(id);
        if (!variant) {
            throw new Error('Исследование не найдено в БД');
        }
        const maxOrder = await VariantMapping.max('order', {
            where: { surveyId, isObjectTypeLine: variant.isObjectTypeLine },
        });
        if (variant.order === maxOrder) {
            return { message: 'Исследование уже в самом низу' };
        }
        const nextVariant = await VariantMapping.findOne({
            where: {
                order: {
                    [Op.gt]: variant.order,
                },
                surveyId,
                isObjectTypeLine: variant.isObjectTypeLine,
            },
            order: [['order', 'ASC']], // Сортировка по возрастанию
        });
        await sequelize.transaction(async (t) => {
            [variant.order, nextVariant.order] = [nextVariant.order, variant.order];
            await variant.save({ transaction: t });
            await nextVariant.save({ transaction: t });
        });
        await variant.reload();
        return variant;
    }

    async moveUp(id, { surveyId }) {
        const variant = await VariantMapping.findByPk(id);
        if (!variant) {
            throw new Error('Исследование не найдено в БД');
        }
        const minOrder = await VariantMapping.min('order', {
            where: { surveyId, isObjectTypeLine: variant.isObjectTypeLine },
        });
        if (variant.order === minOrder) {
            return { message: 'Исследование уже в самом верху' };
        }
        const prevVariant = await VariantMapping.findOne({
            where: {
                order: {
                    [Op.lt]: variant.order,
                },
                surveyId,
                isObjectTypeLine: variant.isObjectTypeLine,
            },
            order: [['order', 'DESC']], // Сортировка по убыванию
        });
        await sequelize.transaction(async (t) => {
            [variant.order, prevVariant.order] = [prevVariant.order, variant.order];
            await variant.save({ transaction: t });
            await prevVariant.save({ transaction: t });
        });
        await variant.reload();
        return variant;
    }

    async delete(id) {
        const variant = await VariantMapping.findByPk(id);
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        await variant.destroy();
        return variant;
    }
}

export default new Variant();
