import { Op } from 'sequelize';

import sequelize from '../sequelize.js';

import { Variant as VariantMapping } from './mapping.js';
import { Category as CategoryMapping } from './mapping.js';
import { Subcategory as SubcategoryMapping } from './mapping.js';
import { Survey as SurveyMapping } from './mapping.js';
// import { Unit as UnitMapping } from './mapping.js';
import { ObjectType as ObjectTypeMapping } from './mapping.js';
import { Handler as HandlerMapping } from './mapping.js';
import { VariantProp as VariantPropMapping } from './mapping.js';

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
    // { model: UnitMapping, as: 'unit', attributes: ['id', 'name'] },
    { model: ObjectTypeMapping, as: 'objectType', attributes: ['id', 'name'] },
    { model: HandlerMapping, as: 'handler', attributes: ['id', 'name', 'description'] },
];

class Variant {
    async getAll(options) {
        const { surveyIds = null, variantIds = null } = options;
        const where = {};
        if (surveyIds) where.surveyId = surveyIds;
        if (variantIds) where.id = variantIds;
        const variants = await VariantMapping.findAll({
            where,
            include: [{ model: HandlerMapping, attributes: ['name'] }],
        });
        return variants;
    }

    async getOne(id) {
        const variant = await VariantMapping.findOne({
            where: { id },
            attributes: [
                'id',
                'description',
                'price',
                'normDoc',
                'justification',
                'unit',
                'objectTypeId',
                'properties',
                'isProduction',
                'handlerId',
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

    async moveDown(id, { surveyId, objectTypeId }) {
        const variant = await VariantMapping.findByPk(id);
        if (!variant) {
            throw new Error('Исследование не найдено в БД');
        }
        const maxOrder = await VariantMapping.max('order', {
            where: { surveyId, objectTypeId },
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
                objectTypeId,
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

    async moveUp(id, { surveyId, objectTypeId }) {
        const variant = await VariantMapping.findByPk(id);
        if (!variant) {
            throw new Error('Исследование не найдено в БД');
        }
        const minOrder = await VariantMapping.min('order', {
            where: { surveyId, objectTypeId },
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
                objectTypeId,
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
