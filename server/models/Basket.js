import { Basket as BasketMapping } from './mapping.js';
import { Variant as VariantMapping } from './mapping.js';
import { BasketVariant as BasketVariantMapping } from './mapping.js';
import { Category as CategoryMapping } from './mapping.js';
import { Subcategory as SubcategoryMapping } from './mapping.js';
import { Survey as SurveyMapping } from './mapping.js';
import { NormDoc as NormDocMapping } from './mapping.js';
import { Justification as JustificationMapping } from './mapping.js';
import { Unit as UnitMapping } from './mapping.js';
import { ObjectType as ObjectTypeMapping } from './mapping.js';
import { Handler as HandlerMapping } from './mapping.js';
import { VariantProp as VariantPropMapping } from './mapping.js';


const pretty = (basket) => {
    const data = {};
    data.id = basket.id;
    if (basket.variants) {
        data.variants = basket.variants.map(item => {
            return {
                id: item.id,
                order: item.order,
                category: item.category.name,
                subcategory: item.subcategory.name,
                survey: item.survey.name,
                description: item.description,
                unit: item.unit.name,
                price: item.price,
                quantity: item.basketVariant.quantity,
                normDoc: item.normDoc.name,
                justification: item.justification.text,
                objectType: item.objectType.name,
                handler: item.handler?.name,
                variantProps: item.variantProps,
            };
        })
    }
    return data;
}

const include = [
    {
        model: VariantMapping,
        include: [
            {model: CategoryMapping, as: 'category'},
            {model: CategoryMapping, as: 'category'},
            {model: SubcategoryMapping, as: 'subcategory'},
            {model: SurveyMapping, as: 'survey'},
            {model: NormDocMapping, as: 'normDoc'},
            {model: JustificationMapping, as: 'justification'},
            {model: UnitMapping, as: 'unit'},
            {model: ObjectTypeMapping, as: 'objectType'},
            {model: HandlerMapping, as: 'handler'},
            {
                model: VariantPropMapping,
                as: 'variantProps',
                attributes: ['id', 'order', 'description', 'unit', 'price', 'quantity'],
            }
        ]
    }
];

class Basket {
    async create() {
        const basket = await BasketMapping.create();
        return basket;
    }

    async getOne(basketId) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include,
        })
        if (!basket) {
            basket = await BasketMapping.create();
        }
        return pretty(basket);
    }

    async append(basketId, variantId, quantity) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include,
        });
        if (!basket) {
            basket = await BasketMapping.create(quantity); 
        }
        const basketVariant = await BasketVariantMapping.findOne({
            where: {basketId, variantId}
        })
        if (basketVariant) {
            await basketVariant.update({quantity})
        } else {
            await BasketVariantMapping.create({basketId, variantId, quantity})
        }
        await basket.reload();
        return pretty(basket);
    }

    async remove(basketId, variantId) {
        let basket = await BasketMapping.findByPk(basketId, {
            include,
        })

        if (!basket) {
            basket = await Basket.create();
        }
        const basketVariant = await BasketVariantMapping.findOne({
            where: {basketId, variantId}
        })
        if (basketVariant) {
            basketVariant.destroy();
            await basket.reload();
        }
        return pretty(basket);
    }
    
    async clear(basketId) {
        let basket = await BasketMapping.findByPk(basketId, {
            include,
        })
        if (basket) {
            await BasketVariantMapping.destroy({where: {basketId}})
            await basket.reload();
            return pretty(basket);
        } else {
            basket = await Basket.create();
        }
        return pretty(basket);
    }

    async delete(basketId) {
        let basket = await BasketMapping.findByPk(basketId, {
            include,
        })
        if (basket) {
            await basket.destroy({where: {basketId}});
        } else {
            throw new Error('Корзина не найдена в БД');
        }
        return pretty(basket);
    }

}

export default new Basket();