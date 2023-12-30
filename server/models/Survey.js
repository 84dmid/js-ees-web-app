import { Op } from 'sequelize';

import sequelize from '../sequelize.js';

import { Survey as SurveyMapping } from './mapping.js';
import { Variant as VariantMapping } from './mapping.js';

import { Category as CategoryMapping } from './mapping.js';
import { Subcategory as SubcategoryMapping } from './mapping.js';
// import { NormDoc as NormDocMapping } from './mapping.js';
// import { Justification as JustificationMapping } from './mapping.js';
import { Unit as UnitMapping } from './mapping.js';
import { ObjectType as ObjectTypeMapping } from './mapping.js';
import { Handler as HandlerMapping } from './mapping.js';
import { VariantProp as VariantPropMapping } from './mapping.js';

class Survey {
    async getAll({ categoryId, subcategoryId }) {
        const where = {};
        if (categoryId) where.categoryId = categoryId;
        if (subcategoryId) where.subcategoryId = subcategoryId;

        const surveys = await SurveyMapping.findAll({
            where,
            order: [
                'categoryId',
                'subcategoryId',
                [{ model: VariantMapping }, 'objectTypeId'],
            ],
            include: [
                { model: CategoryMapping, as: 'category' },
                { model: SubcategoryMapping, as: 'subcategory' },
                {
                    model: VariantMapping,
                    include: [
                        { model: UnitMapping, as: 'unit' },
                        { model: ObjectTypeMapping, as: 'objectType' },
                    ],
                },
            ],
        });
        return surveys;
    }

    async getOne(id) {
        const survey = await SurveyMapping.findByPk(id);
        if (!survey) {
            throw new Error('Вид исследования не найден в БД');
        }
        return survey;
    }

    async create({ name, subcategoryId }) {
        const maxOrder = await SurveyMapping.max('order');
        const survey = await SurveyMapping.create({
            order: maxOrder + 1,
            name,
            subcategoryId,
        });
        return survey;
    }

    async update(id, data) {
        const survey = await SurveyMapping.findByPk(id);
        if (!survey) {
            throw new Error('Вид исследования не найден в БД');
        }
        await survey.update(data);
        return survey;
    }

    async moveDown(id, { subcategoryId }) {
        const survey = await SurveyMapping.findByPk(id);
        if (!survey) {
            throw new Error('Исследование не найдена в БД');
        }
        const maxOrder = await SurveyMapping.max('order', { where: { subcategoryId } });
        if (survey.order === maxOrder) {
            return { message: 'Исследование уже в самом низу' };
        }
        const nextSurvey = await SurveyMapping.findOne({
            where: {
                order: {
                    [Op.gt]: survey.order,
                },
                subcategoryId,
            },
            order: [['order', 'ASC']], // Сортировка по возрастанию
        });
        await sequelize.transaction(async (t) => {
            [survey.order, nextSurvey.order] = [nextSurvey.order, survey.order];
            await survey.save({ transaction: t });
            await nextSurvey.save({ transaction: t });
        });
        await survey.reload();
        return survey;
    }

    async moveUp(id, { subcategoryId }) {
        const survey = await SurveyMapping.findByPk(id);
        if (!survey) {
            throw new Error('Исследование не найдена в БД');
        }
        const minOrder = await SurveyMapping.min('order', { where: { subcategoryId } });
        if (survey.order === minOrder) {
            return { message: 'Исследование уже в самом верху' };
        }
        const prevSurvey = await SurveyMapping.findOne({
            where: {
                order: {
                    [Op.lt]: survey.order,
                },
                subcategoryId,
            },
            order: [['order', 'DESC']], // Сортировка по убыванию
        });
        await sequelize.transaction(async (t) => {
            [survey.order, prevSurvey.order] = [prevSurvey.order, survey.order];
            await survey.save({ transaction: t });
            await prevSurvey.save({ transaction: t });
        });
        await survey.reload();
        return survey;
    }

    async delete(id) {
        const survey = await SurveyMapping.findByPk(id);
        if (!survey) {
            throw new Error('Вид исследования не найден в БД');
        }
        await survey.destroy();
        return survey;
    }
}

export default new Survey();
