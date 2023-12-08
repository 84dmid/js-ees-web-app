import { Survey as SurveyMapping } from './mapping.js';
import { Variant as VariantMapping } from './mapping.js';

import { Category as CategoryMapping } from './mapping.js';
import { Subcategory as SubcategoryMapping } from './mapping.js';
import { NormDoc as NormDocMapping } from './mapping.js';
import { Justification as JustificationMapping } from './mapping.js';
import { Unit as UnitMapping } from './mapping.js';
import { ObjectType as ObjectTypeMapping } from './mapping.js';
import { Handler as HandlerMapping } from './mapping.js';
import { VariantProp as VariantPropMapping } from './mapping.js';

class Survey {
    async getAll() {
        const surveys = await SurveyMapping.findAll({
            include: [
                {
                    model: VariantMapping,
                    // include: [
                    //     { model: CategoryMapping, as: 'category' },
                    //     { model: CategoryMapping, as: 'category' },
                    //     { model: SubcategoryMapping, as: 'subcategory' },
                    //     { model: NormDocMapping, as: 'normDoc' },
                    //     { model: JustificationMapping, as: 'justification' },
                    //     { model: UnitMapping, as: 'unit' },
                    //     { model: ObjectTypeMapping, as: 'objectType' },
                    //     { model: HandlerMapping, as: 'handler' },
                    //     { model: VariantPropMapping, as: 'variantProps' },
                    // ],
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

    async create(data) {
        const survey = await SurveyMapping.create(data);
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
