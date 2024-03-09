import sequelize from '../sequelize.js';
import { Op } from 'sequelize';

import { Scenario as ScenarioMapping } from './mapping.js';
import { Variant as VariantMapping } from './mapping.js';
import { ScenarioVariant as ScenarioVariantMapping } from './mapping.js';
import { Survey as SurveyMapping } from './mapping.js';

const makePrettier = (scenario) => {
    let variantIds;
    if (scenario.scenarioVariants) {
        variantIds = scenario.scenarioVariants.map((item) => item.variantId);
    } else {
        variantIds = [];
    }

    return {
        id: scenario.id,
        order: scenario.order,
        name: scenario.name,
        description: scenario.description,
        isObjectTypeLine: scenario.isObjectTypeLine,
        isProduction: scenario.isProduction,
        variantIds,
    };
};

const include = [
    {
        model: ScenarioVariantMapping,
        as: 'scenarioVariants',
        attributes: ['variantId'],
    },
];

class Scenario {
    async getAll({ isObjectTypeLine = undefined, isProduction = undefined }) {
        const where = {};
        if (isObjectTypeLine !== undefined) where.isObjectTypeLine = isObjectTypeLine;
        if (isProduction !== undefined) where.isProduction = isProduction;
        const scenarios = await ScenarioMapping.findAll({
            order: ['order', 'isObjectTypeLine'],
            where,
        });
        return scenarios;
    }

    async getOne(id) {
        const scenario = await ScenarioMapping.findByPk(id, {
            include,
        });
        if (!scenario) {
            throw new Error('Сценарий исследований не найден в БД');
        }
        return makePrettier(scenario);
    }

    async create(data) {
        const { name, description, isObjectTypeLine } = data;
        const maxOrder = await ScenarioMapping.max('order');
        const scenario = await ScenarioMapping.create({
            name,
            description,
            isObjectTypeLine,
            order: maxOrder + 1,
        });
        return makePrettier(scenario);
    }

    async update(id, data) {
        const scenario = await ScenarioMapping.findByPk(id, {
            include,
        });
        if (!scenario) {
            throw new Error('Сценарий исследований не найден в БД');
        }
        await scenario.update(data);
        return makePrettier(scenario);
    }

    async moveDown(id) {
        const scenario = await ScenarioMapping.findByPk(id);
        if (!scenario) {
            throw new Error('Сценарий исследований не найдена в БД');
        }
        const maxOrder = await ScenarioMapping.max('order');
        if (scenario.order === maxOrder) {
            return { message: 'Сценарий исследований уже в самом низу' };
        }
        const nextScenario = await ScenarioMapping.findOne({
            where: {
                order: {
                    [Op.gt]: scenario.order,
                },
            },
            order: [['order', 'ASC']], // Сортировка по возрастанию
        });
        await sequelize.transaction(async (t) => {
            [scenario.order, nextScenario.order] = [nextScenario.order, scenario.order];
            await scenario.save({ transaction: t });
            await nextScenario.save({ transaction: t });
        });
        await scenario.reload();
        return scenario;
    }

    async moveUp(id) {
        const scenario = await ScenarioMapping.findByPk(id);
        if (!scenario) {
            throw new Error('Сценарий исследований не найдена в БД');
        }
        const minOrder = await ScenarioMapping.min('order');
        if (scenario.order === minOrder) {
            return { message: 'Сценарий исследований уже в самом верху' };
        }
        const prevScenario = await ScenarioMapping.findOne({
            where: {
                order: {
                    [Op.lt]: scenario.order,
                },
            },
            order: [['order', 'DESC']], // Сортировка по убыванию
        });
        await sequelize.transaction(async (t) => {
            [scenario.order, prevScenario.order] = [prevScenario.order, scenario.order];
            await scenario.save({ transaction: t });
            await prevScenario.save({ transaction: t });
        });
        await scenario.reload();
        return scenario;
    }

    async append(id, variantId) {
        const scenario = await ScenarioMapping.findByPk(id, {
            include,
        });
        if (!scenario) {
            throw new Error('Сценарий исследований не найден в БД');
        }
        const variant = await VariantMapping.findByPk(variantId);
        if (!variant) {
            throw new Error('Вариант не найден в БД');
        }
        const survey = await SurveyMapping.findByPk(variant.surveyId, {
            include: [{ model: VariantMapping, as: 'variants', attributes: ['id'] }],
        });
        const surveyVariantIds = survey.variants.map((item) => item.id);
        const scenarioVariantIds = scenario.scenarioVariants.map(
            (item) => item.variantId
        );
        if (
            surveyVariantIds.some(
                (surveyVariantId) =>
                    scenarioVariantIds.includes(surveyVariantId) &&
                    surveyVariantId !== variant.id
            )
        ) {
            throw new Error('один из вариантов исследования уже включён в сценарий');
        }
        if (
            (scenario.isObjectTypeLine !== variant.isObjectTypeLine) &
            (variant.isObjectTypeLine !== null)
        ) {
            throw new Error(
                'тип объекта строительства сценария не соответствует типу объекта строительства варианта'
            );
        }

        await ScenarioVariantMapping.create({
            scenarioId: scenario.id,
            variantId: variant.id,
        });
        await scenario.reload();
        return makePrettier(scenario);
    }

    async remove(id, variantId) {
        const scenario = await ScenarioMapping.findByPk(id, {
            include,
        });
        if (!scenario) {
            throw new Error('Сценарий исследований не найден в БД');
        }
        const variant = await VariantMapping.findByPk(variantId);
        if (!variant) {
            throw new Error('Вариант не найден в БД');
        }

        const scenarioVariant = await ScenarioVariantMapping.findOne({
            where: { scenarioId: scenario.id, variantId: variant.id },
        });

        if (scenarioVariant) {
            await scenarioVariant.destroy();
            await scenario.reload();
        }
        return makePrettier(scenario);
    }

    async delete(id) {
        const scenario = await ScenarioMapping.findByPk(id);
        if (!scenario) {
            throw new Error('Сценарий исследований не найден в БД');
        }
        await scenario.destroy();
        return scenario;
    }
}

export default new Scenario();
