import { Variant as VariantMapping } from './mapping.js';
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
    {model: CategoryMapping, as: 'category'},
    {model: CategoryMapping, as: 'category'},
    {model: SubcategoryMapping, as: 'subcategory'},
    {model: SurveyMapping, as: 'survey'},
    {model: NormDocMapping, as: 'normDoc'},
    {model: JustificationMapping, as: 'justification'},
    {model: UnitMapping, as: 'unit'},
    {model: ObjectTypeMapping, as: 'objectType'},
    {model: HandlerMapping, as: 'handler'},
    {model: VariantPropMapping, as: 'variantProps'},
];

const getPretty = (variants) => {
    return variants.map(variant => {
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
    })

}

class Variant {
    async getAll(options) {
        const {categoryId, subcategoryId, surveyId} = options;
        const where = {};
        if (categoryId) where.categoryId = categoryId;
        if (subcategoryId) where.subcategoryId = subcategoryId;
        if (surveyId) where.surveyId = surveyId;
        const variants = await VariantMapping.findAll({
            where,
            order: ['categoryId', 'subcategoryId', 'surveyId'],
            include,
        });
        return getPretty(variants);
    }

    async getOne(id) {
        const variant = await VariantMapping.findOne({
            where: {id},
            include,
        });
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        return variant;
    }
    
    async create(data) {
        const {order, description, normDocId, justificationId, categoryId, subcategoryId, unitId, surveyId, objectTypeId, handlerId} = data;
        let {props, price} = data;
        if (props) {
            // props = JSON.parse(props); // закоментил для тестирования, с фронтенда будет отправляться через форму
            price = props.reduce((sum, prop) => sum + prop.quantity * prop.price, 0) || price;
        }
        const variant = await VariantMapping.create({order, description, price, normDocId, justificationId, categoryId,subcategoryId, unitId, surveyId, objectTypeId, handlerId});
        if (props) {
            for (let prop of props) {
                await VariantPropMapping.create({...prop, variantId: variant.id});
            }
        }
        return variant;
    }
    
    async update(id, data) {
        const variant = await VariantMapping.findByPk(id, {
            include: [{model: VariantPropMapping, as: 'variantProps'}]
        });
        if (!variant) {
            throw new Error('Вариант исследования не найден в БД');
        }
        const changes = {};
        if (data.order) changes.order = data.order;
        if (data.description) changes.description = data.description;
        if (data.price) changes.price = data.price;
        if (data.normDocId) changes.normDocId = data.normDocId;
        if (data.categoryId) changes.categoryId = data.categoryId;
        if (data.subcategoryId) changes.subcategoryId = data.subcategoryId;
        if (data.unitId) changes.unitId = data.unitId;
        if (data.surveyId) changes.surveyId = data.surveyId;
        if (data.objectTypeId) changes.objectTypeId = data.objectTypeId;
        if (data.handlerId) changes.handlerId = data.handlerId;
        if (data.props) {
            // props = JSON.parse(props); // закоментил для тестирования, с фронтенда будет отправляться через форму
            changes.price = data.props.reduce((sum, prop) => sum + prop.quantity * prop.price, 0) || price;
            await VariantPropMapping.destroy({where: {variantId: id}});
            for (let prop of data.props) {
                await VariantPropMapping.create({...prop, variantId: id});
            }
        }
        await variant.update(changes);
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