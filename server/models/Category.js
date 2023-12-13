import { Category as CategoryMapping } from './mapping.js';
import { Subcategory as SubcategoryMapping } from './mapping.js';
import { Survey as SurveyMapping } from './mapping.js';
import { NormDoc as NormDocMapping } from './mapping.js';
import { Justification as JustificationMapping } from './mapping.js';
import { Unit as UnitMapping } from './mapping.js';
import { ObjectType as ObjectTypeMapping } from './mapping.js';
import { Handler as HandlerMapping } from './mapping.js';
import { VariantProp as VariantPropMapping } from './mapping.js';

const include = [
    { model: SubcategoryMapping, as: 'subcategory' },
    { model: SurveyMapping, as: 'survey' },
    { model: NormDocMapping, as: 'normDoc' },
    { model: JustificationMapping, as: 'justification' },
    { model: UnitMapping, as: 'unit' },
    { model: ObjectTypeMapping, as: 'objectType' },
    { model: HandlerMapping, as: 'handler' },
    { model: VariantPropMapping, as: 'variantProps' },
];

class Category {
    async getAll() {
        const categories = await CategoryMapping.findAll();
        return categories;
    }

    async getInclusion() {
        const categories = await CategoryMapping.findAll({
            order: ['order'],
            include: [
                {
                    model: SubcategoryMapping,
                    as: 'subcategory',
                    include: [
                        {
                            model: SurveyMapping,
                            as: 'survey',
                            include: [
                                {
                                    model: ObjectTypeMapping,
                                    as: 'objectType',
                                    include: [
                                        { model: VariantPropMapping, as: 'variantProps' },
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

    async getOne(id) {
        const category = await CategoryMapping.findByPk(id);
        if (!category) {
            throw new Error('Категория не найдена в БД');
        }
        return category;
    }

    async create(data) {
        const { name, order } = data;
        const category = await CategoryMapping.create({ order, name });
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
