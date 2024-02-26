import sequelize from '../sequelize.js';
import { Op } from 'sequelize';

import { SurveyScenario as SurveyScenarioMapping } from './mapping.js';
import { Variant as VariantMapping } from './mapping.js';
import { SurveyScenarioVariant as SurveyScenarioVariantMapping } from './mapping.js';

const makePrettier = (surveyScenario) => {
    let variantIds;
    if (surveyScenario.surveyScenarioVariants) {
        variantIds = surveyScenario.surveyScenarioVariants.map((item) => item.variantId);
    } else {
        variantIds = [];
    }

    return {
        id: surveyScenario.id,
        order: surveyScenario.order,
        name: surveyScenario.name,
        description: surveyScenario.description,
        isObjectTypeLine: surveyScenario.isObjectTypeLine,
        isProduction: surveyScenario.isProduction,
        variantIds,
    };
};

const include = [
    {
        model: SurveyScenarioVariantMapping,
        as: 'surveyScenarioVariants',
        attributes: ['variantId'],
    },
];

class SurveyScenario {
    async getAll({ isObjectTypeLine = undefined, isProduction = undefined }) {
        const where = {};
        if (isObjectTypeLine !== undefined) where.isObjectTypeLine = isObjectTypeLine;
        if (isProduction !== undefined) where.isProduction = isProduction;
        const surveyScenarios = await SurveyScenarioMapping.findAll({
            order: ['order', 'isObjectTypeLine'],
            where,
        });
        return surveyScenarios;
    }

    async getOne(id) {
        const surveyScenario = await SurveyScenarioMapping.findByPk(id, {
            include,
        });
        if (!surveyScenario) {
            throw new Error('Сценарий исследований не найден в БД');
        }
        return makePrettier(surveyScenario);
    }

    async create(data) {
        const { name, description, isObjectTypeLine } = data;
        const maxOrder = await SurveyScenarioMapping.max('order');
        const surveyScenario = await SurveyScenarioMapping.create({
            name,
            description,
            isObjectTypeLine,
            order: maxOrder + 1,
        });
        return makePrettier(surveyScenario);
    }

    async update(id, data) {
        const surveyScenario = await SurveyScenarioMapping.findByPk(id, {
            include,
        });
        if (!surveyScenario) {
            throw new Error('Сценарий исследований не найден в БД');
        }
        await surveyScenario.update(data);
        return makePrettier(surveyScenario);
    }

    async moveDown(id) {
        const surveyScenario = await SurveyScenarioMapping.findByPk(id);
        if (!surveyScenario) {
            throw new Error('Сценарий исследований не найдена в БД');
        }
        const maxOrder = await SurveyScenarioMapping.max('order');
        if (surveyScenario.order === maxOrder) {
            return { message: 'Сценарий исследований уже в самом низу' };
        }
        const nextSurveyScenario = await SurveyScenarioMapping.findOne({
            where: {
                order: {
                    [Op.gt]: surveyScenario.order,
                },
            },
            order: [['order', 'ASC']], // Сортировка по возрастанию
        });
        await sequelize.transaction(async (t) => {
            [surveyScenario.order, nextSurveyScenario.order] = [
                nextSurveyScenario.order,
                surveyScenario.order,
            ];
            await surveyScenario.save({ transaction: t });
            await nextSurveyScenario.save({ transaction: t });
        });
        await surveyScenario.reload();
        return surveyScenario;
    }

    async moveUp(id) {
        const surveyScenario = await SurveyScenarioMapping.findByPk(id);
        if (!surveyScenario) {
            throw new Error('Сценарий исследований не найдена в БД');
        }
        const minOrder = await SurveyScenarioMapping.min('order');
        if (surveyScenario.order === minOrder) {
            return { message: 'Сценарий исследований уже в самом верху' };
        }
        const prevSurveyScenario = await SurveyScenarioMapping.findOne({
            where: {
                order: {
                    [Op.lt]: surveyScenario.order,
                },
            },
            order: [['order', 'DESC']], // Сортировка по убыванию
        });
        await sequelize.transaction(async (t) => {
            [surveyScenario.order, prevSurveyScenario.order] = [
                prevSurveyScenario.order,
                surveyScenario.order,
            ];
            await surveyScenario.save({ transaction: t });
            await prevSurveyScenario.save({ transaction: t });
        });
        await surveyScenario.reload();
        return surveyScenario;
    }

    async append(id, variantId) {
        const surveyScenario = await SurveyScenarioMapping.findByPk(id, {
            include,
        });
        if (!surveyScenario) {
            throw new Error('Сценарий исследований не найден в БД');
        }
        const variant = await VariantMapping.findByPk(variantId);
        if (!variant) {
            throw new Error('Вариант не найден в БД');
        }
        await SurveyScenarioVariantMapping.create({
            surveyScenarioId: surveyScenario.id,
            variantId: variant.id,
        });
        await surveyScenario.reload();
        return makePrettier(surveyScenario);
    }

    async remove(id, variantId) {
        const surveyScenario = await SurveyScenarioMapping.findByPk(id, {
            include,
        });
        if (!surveyScenario) {
            throw new Error('Сценарий исследований не найден в БД');
        }
        const variant = await VariantMapping.findByPk(variantId);
        if (!variant) {
            throw new Error('Вариант не найден в БД');
        }

        const surveyScenarioVariant = await SurveyScenarioVariantMapping.findOne({
            where: { surveyScenarioId: surveyScenario.id, variantId: variant.id },
        });

        if (surveyScenarioVariant) {
            await surveyScenarioVariant.destroy();
            await surveyScenario.reload();
        }
        return makePrettier(surveyScenario);
    }

    async delete(id) {
        const surveyScenario = await SurveyScenarioMapping.findByPk(id);
        if (!surveyScenario) {
            throw new Error('Сценарий исследований не найден в БД');
        }
        await surveyScenario.destroy();
        return surveyScenario;
    }
}

export default new SurveyScenario();
