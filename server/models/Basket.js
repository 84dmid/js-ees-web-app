import sequelize from '../sequelize.js';
import { Basket as BasketMapping, BasketVariant } from './mapping.js';
import { Variant as VariantMapping } from './mapping.js';
import { BasketVariant as BasketVariantMapping } from './mapping.js';

class Basket {
    async _getOrCreateBasket(basketId) {
        const include = [
            {
                model: BasketVariant,
                attributes: ['variantId', 'quantity'],
                include: [{ model: VariantMapping, attributes: ['surveyId', 'price'] }],
            },
        ];
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include,
        });
        if (!basket) {
            basket = await BasketMapping.create();
            basket = await BasketMapping.findByPk(basket.id, {
                attributes: ['id'],
                include,
            });
        }
        return basket;
    }

    async create() {
        const basket = await BasketMapping.create();
        return basket;
    }

    async getOne(basketId) {
        let basket = await this._getOrCreateBasket(basketId);
        return basket;
    }

    async append(basketId, variantId, quantity) {
        let basket = await this._getOrCreateBasket(basketId);

        const variant = await VariantMapping.findByPk(variantId, {
            attributes: ['id', 'surveyId'],
        });
        let basketVariants = await BasketVariantMapping.findAll({
            where: { basketId: basket.id },
            include: [
                {
                    model: VariantMapping,
                    as: 'variant',
                    where: { surveyId: variant.surveyId },
                    attributes: ['id'],
                },
            ],
        });
        let basketVariant;
        const basketVariantIdsToDelete = [];
        for (let i = 0; i < basketVariants.length; i++) {
            if (basketVariants[i].variantId != variant.id) {
                basketVariantIdsToDelete.push(basketVariants[i].variantId);
            } else {
                basketVariant = await BasketVariantMapping.findByPk(variant.id);
                await basketVariant.update({ quantity });
            }
        }
        if (!basketVariant) {
            basketVariant = await BasketVariantMapping.create({
                variantId: variant.id,
                basketId: basket.id,
                quantity,
            });
        }
        if (basketVariantIdsToDelete.length) {
            await BasketVariantMapping.destroy({
                where: { variantId: basketVariantIdsToDelete },
            });
        }
        await basket.reload();
        return basket;
    }

    async update(basketId, variantId, quantity) {
        let basket = await this._getOrCreateBasket(basketId);

        let basketVariant = await BasketVariantMapping.findOne({
            where: { basketId, variantId },
        });
        if (!basketVariant) {
            basketVariant = await BasketVariantMapping.create({
                basketId,
                variantId,
                quantity,
            });
        } else {
            await basketVariant.update({ quantity });
            await basket.reload();
        }
        return basket;
    }

    async remove(basketId, variantId) {
        let basket = await this._getOrCreateBasket(basketId);

        const basketVariant = await BasketVariantMapping.findOne({
            where: { basketId: basket.id, variantId },
        });

        if (basketVariant) {
            await basketVariant.destroy();
            await basket.reload();
        }
        return basket;
    }

    async clear(basketId) {
        let basket = await this._getOrCreateBasket(basketId);
        if (basket.basketVariants.length) {
            await BasketVariantMapping.destroy({
                where: { basketId: basket.id },
            });
        }
        await basket.reload();
        return basket;
    }

    async delete(basketId) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
        });
        if (basket) {
            await basket.destroy({ where: { basketId } });
            return basketId;
        } else {
            return null;
        }
    }
}

export default new Basket();
