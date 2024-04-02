import { Op } from 'sequelize';

import { Category as CategoryMapping } from './mapping.js';
import { Subcategory as SubcategoryMapping } from './mapping.js';
import { Survey as SurveyMapping } from './mapping.js';
import { Variant as VariantMapping } from './mapping.js';
import { ScenarioVariant as ScenarioVariantMapping } from './mapping.js';
import sequelize from '../sequelize.js';

class Category {
    async getContent({
        categoryFilter,
        subcategoryFilter,
        surveyFilter,
        variantFilter,
        isObjectTypeLine,
    }) {
        if (isObjectTypeLine === null || isObjectTypeLine === undefined) {
            isObjectTypeLine = null;
        } else if (isObjectTypeLine === 'true') {
            isObjectTypeLine = true;
        } else if (isObjectTypeLine === 'false') {
            isObjectTypeLine = false;
        } else {
            throw new Error(
                'Указано неверное значение параметра запроса "isObjectTypeLine"'
            );
        }
        const categories = await CategoryMapping.findAll({
            where: {
                id: categoryFilter?.length ? categoryFilter : { [Op.not]: null },
                '$subcategories.id$': subcategoryFilter?.length
                    ? subcategoryFilter
                    : { [Op.not]: null },
                '$subcategories.surveys.id$': surveyFilter?.length
                    ? surveyFilter
                    : { [Op.not]: null },
                '$subcategories.surveys.variants.id$': variantFilter?.length
                    ? variantFilter
                    : { [Op.not]: null },
                '$subcategories.surveys.variants.is_production$': true,
                // '$subcategories.surveys.variants.quantity_calculator_name$':
                //     isObjectTypeLine !== null
                //         ? {
                //               [Op.or]: [{ [Op.is]: null }, { [Op.not]: null }],
                //           }
                //         : { [Op.is]: null },
                '$subcategories.surveys.variants.is_object_type_line$':
                    isObjectTypeLine === null
                        ? {
                              [Op.or]: [
                                  { [Op.is]: null },
                                  { [Op.is]: true },
                                  { [Op.is]: false },
                              ],
                          }
                        : isObjectTypeLine === true
                        ? { [Op.or]: [{ [Op.is]: null }, { [Op.is]: true }] }
                        : { [Op.or]: [{ [Op.is]: null }, { [Op.is]: false }] },
            },
            order: [
                'order',
                [SubcategoryMapping, 'order'],
                [SubcategoryMapping, SurveyMapping, 'order'],
                [SubcategoryMapping, SurveyMapping, VariantMapping, 'isObjectTypeLine'],
                [SubcategoryMapping, SurveyMapping, VariantMapping, 'order'],
            ],
            include: [
                {
                    model: SubcategoryMapping,
                    as: 'subcategories',
                    include: [
                        {
                            model: SurveyMapping,
                            as: 'surveys',
                            include: [
                                {
                                    model: VariantMapping,
                                    as: 'variants',
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        return categories;
    }

    async getFullContent({
        categoryFilter,
        subcategoryFilter,
        surveyFilter,
        variantFilter,
        scenarioId,
    }) {
        const getWhere = (filters) => {
            let result = {};
            for (const [filterName, filter] of Object.entries(filters)) {
                if (filter) {
                    result[filterName] = filter;
                }
            }
            if (!Object.keys(result).length) return null;
            return result;
        };

        const categories = await CategoryMapping.findAll({
            where: getWhere({ id: categoryFilter }),
            order: [
                'order',
                [SubcategoryMapping, 'order'],
                [SubcategoryMapping, SurveyMapping, 'order'],
                [SubcategoryMapping, SurveyMapping, VariantMapping, 'isObjectTypeLine'],
                [SubcategoryMapping, SurveyMapping, VariantMapping, 'order'],
            ],
            include: [
                {
                    model: SubcategoryMapping,
                    as: 'subcategories',
                    where: getWhere({ id: subcategoryFilter }),
                    include: [
                        {
                            model: SurveyMapping,
                            as: 'surveys',
                            where: getWhere({ id: surveyFilter }),
                            include: [
                                {
                                    model: VariantMapping,
                                    as: 'variants',
                                    where: getWhere({
                                        id: variantFilter,
                                    }),
                                    include: [
                                        {
                                            model: ScenarioVariantMapping,
                                            as: 'scenarioVariants',
                                            where: getWhere({
                                                scenarioId: scenarioId,
                                            }),
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        return categories;
    }

    async getAll() {
        const categories = await CategoryMapping.findAll();
        return categories;
    }

    async getOne(id) {
        const category = await CategoryMapping.findByPk(id);
        if (!category) {
            throw new Error('Категория не найдена в БД');
        }
        return category;
    }

    async create(data) {
        const { name } = data;
        const maxOrder = await CategoryMapping.max('order');
        const category = await CategoryMapping.create({
            order: maxOrder + 1,
            name,
        });
        return category;
    }

    async update(id, data) {
        const category = await CategoryMapping.findByPk(id);
        if (!category) {
            throw new Error('Категория не найдена в БД');
        }
        const changes = {};
        if (data.order) changes.order = data.order;
        if (data.name) changes.name = data.name;

        if (Object.keys(changes)) {
            await category.update(changes);
        }
        return category;
    }

    async moveDown(id) {
        const category = await CategoryMapping.findByPk(id);
        if (!category) {
            throw new Error('Категория не найдена в БД');
        }
        const maxOrder = await CategoryMapping.max('order');
        if (category.order === maxOrder) {
            return { message: 'Категория уже в самом низу' };
        }
        const nextCategory = await CategoryMapping.findOne({
            where: {
                order: {
                    [Op.gt]: category.order,
                },
            },
            order: [['order', 'ASC']], // Сортировка по возрастанию
        });
        await sequelize.transaction(async (t) => {
            [category.order, nextCategory.order] = [nextCategory.order, category.order];
            await category.save({ transaction: t });
            await nextCategory.save({ transaction: t });
        });
        await category.reload();
        return category;
    }

    async moveUp(id) {
        const category = await CategoryMapping.findByPk(id);
        if (!category) {
            throw new Error('Категория не найдена в БД');
        }
        const minOrder = await CategoryMapping.min('order');
        if (category.order === minOrder) {
            return { message: 'Категория уже в самом верху' };
        }
        const prevCategory = await CategoryMapping.findOne({
            where: {
                order: {
                    [Op.lt]: category.order,
                },
            },
            order: [['order', 'DESC']], // Сортировка по убыванию
        });
        await sequelize.transaction(async (t) => {
            [category.order, prevCategory.order] = [prevCategory.order, category.order];
            await category.save({ transaction: t });
            await prevCategory.save({ transaction: t });
        });
        await category.reload();
        return category;
    }

    async delete(id) {
        const category = await CategoryMapping.findByPk(id);
        if (!category) {
            throw new Error('Категория не найдена в БД');
        }
        await category.destroy();
        return category;
    }
}

export default new Category();
