import { Op } from 'sequelize';

import sequelize from '../sequelize.js';

import { Variant as VariantMapping } from './mapping.js';
import { Category as CategoryMapping } from './mapping.js';
import { Subcategory as SubcategoryMapping } from './mapping.js';
import { Survey as SurveyMapping } from './mapping.js';
import { Unit as UnitMapping } from './mapping.js';
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
    { model: UnitMapping, as: 'unit', attributes: ['id', 'name'] },
    { model: ObjectTypeMapping, as: 'objectType', attributes: ['id', 'name'] },
    { model: HandlerMapping, as: 'handler', attributes: ['id', 'name'] },
    {
        model: VariantPropMapping,
        as: 'variantProps',
        attributes: ['id', 'description', 'unit', 'price', 'quantity'],
    },
];

const getPretty = (variants) => {
    return variants.map((variant) => {
        return {
            id: variant.id,
            order: variant.order,
            category: variant.category.name,
            subcategory: variant.subcategory.name,
            survey: variant.survey.name,
            description: variant.description,
            unit: variant.unit.name,
            price: variant.price,
            normDoc: variant.normDoc.name,
            justification: variant.justification.text,
            objectType: variant.objectType.name,
            handler: variant.handler?.name,
            variantProps: variant.variantProps,
        };
    });
};

class Variant {
    async getAll(options) {
        const { categoryId, subcategoryId, surveyId } = options;
        const where = {};
        if (categoryId) where.categoryId = categoryId;
        if (subcategoryId) where.subcategoryId = subcategoryId;
        if (surveyId) where.surveyId = surveyId;
        const variants = await VariantMapping.findAll({
            where,
            order: ['categoryId', 'subcategoryId', 'surveyId', 'unitId', 'objectTypeId'],
            include,
        });
        return getPretty(variants);
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
                'unitId',
                'objectTypeId',
            ],
            order: [[VariantPropMapping, 'order']],
            include,
        });
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        return variant;
    }

    async create(data) {
        const {
            description,
            normDoc,
            justification,
            surveyId,
            unitId,
            objectTypeId,
            handlerId,
        } = data;
        let { props, price } = data;
        if (props) {
            // props = JSON.parse(props); // закоментил для тестирования, с фронтенда будет отправляться через форму
            price =
                props.reduce((sum, prop) => sum + prop.quantity * prop.price, 0) || price;
        }

        const maxOrder = await VariantMapping.max('order');
        const variant = await VariantMapping.create({
            order: maxOrder + 1,
            description,
            price,
            normDoc,
            justification,
            unitId,
            surveyId,
            objectTypeId,
            handlerId,
        });

        if (props) {
            for (let prop of props) {
                await VariantPropMapping.create({ ...prop, variantId: variant.id });
            }
        }
        return variant;
    }

    async update(id, data) {
        console.log(id, data);
        const variant = await VariantMapping.findByPk(id, {
            include: [{ model: VariantPropMapping, as: 'variantProps' }],
        });
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        const {
            order,
            description,
            normDoc,
            justification,
            unitId,
            surveyId,
            objectTypeId,
            handlerId,
        } = data;
        let { price } = data;

        if (variant.variantProps.length) {
            price =
                variant.variantProps.reduce(
                    (sum, prop) => sum + prop.quantity * prop.price,
                    0
                ) || price;
        }
        await variant.update({
            order,
            description,
            normDoc,
            justification,
            unitId,
            surveyId,
            objectTypeId,
            handlerId,
            price,
        });
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
