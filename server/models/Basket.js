import sequelize from '../sequelize.js';
import { Basket as BasketMapping } from './mapping.js';
import { Variant as VariantMapping } from './mapping.js';
import { BasketVariant as BasketVariantMapping } from './mapping.js';
import { Survey as SurveyMapping } from './mapping.js';
import { Subcategory as SubcategoryMapping } from './mapping.js';
import { Category as CategoryMapping } from './mapping.js';
import { ProjectLink as ProjectLinkMapping } from './mapping.js';
import { Region as RegionMapping } from './mapping.js';

const makePrettier = (basket) => {
    if (!basket.basketVariants.length) return basket;

    const basketVariants = basket.basketVariants.map((item) => {
        return {
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.variant.price,
            dynamicPriceIdAndLevel: item.variant.dynamicPriceIdAndLevel,
            priceAndQuantityCalcData: item.variant.priceAndQuantityCalcData,
            surveyId: item.variant.survey.id,
            subcategoryId: item.variant.survey.subcategory.id,
            categoryId: item.variant.survey.subcategory.category.id,
        };
    });

    return {
        id: basket.id,
        isObjectTypeLine: basket.isObjectTypeLine,
        lendAreaInSqM: basket.lendAreaInSqM,
        trackWidthInM: basket.trackWidthInM,
        trackLengthInM: basket.trackLengthInM,
        testingSitesNumberPerFiveHa: basket.testingSitesNumberPerFiveHa,
        regionId: basket.regionId,
        basketVariants: basketVariants,

        generalData: basket.generalData,
        customerData: basket.customerData,
        contractorData: basket.contractorData,
    };
};

const include = [
    {
        model: BasketVariantMapping,
        attributes: ['variantId', 'quantity'],
        include: [
            {
                model: VariantMapping,
                attributes: [
                    'price',
                    'dynamicPriceIdAndLevel',
                    'priceAndQuantityCalcData',
                ],
                include: [
                    {
                        model: SurveyMapping,
                        attributes: ['id'],
                        include: [
                            {
                                model: SubcategoryMapping,
                                attributes: ['id'],
                                include: [
                                    {
                                        model: CategoryMapping,
                                        attributes: ['id'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

class Basket {
    async _getOrCreateBasket(basketId) {
        include;
        // const attributes = [
        //     'id',
        //     'isObjectTypeLine',
        //     'lendAreaInSqM',
        //     'trackWidthInM',
        //     'trackLengthInM',
        //     'testingSitesNumberPerFiveHa',
        //     'regionId',
        // ];
        let basket;
        if (basketId) {
            basket = await BasketMapping.findByPk(basketId, {
                // attributes,
                include,
            });
        }
        if (!basket) {
            basket = await BasketMapping.create();
            basket = await BasketMapping.findByPk(basket.id, {
                // attributes,
                include,
            });
        }
        return basket;
    }

    async getOne(basketId) {
        let basket = await this._getOrCreateBasket(basketId);
        return makePrettier(basket);
    }

    async createLink(basketId, linkRole) {
        const basket = await BasketMapping.findByPk(basketId, {
            include,
        });
        if (!basket || basket.basketVariants.length === 0) {
            throw new Error('В проекте отсутствуют исследования');
        }
        const link = await ProjectLinkMapping.create({
            projectData: makePrettier(basket),
            linkRole,
        });
        return link;
    }

    async getLink(id) {
        const link = await ProjectLinkMapping.findByPk(id);
        if (!link) {
            throw new Error(
                'Ссылка на расчёт состава изысканий не найдена в базе данных'
            );
        }
        return link;
    }

    async updateParams(basketId, data) {
        let basket = await this._getOrCreateBasket(basketId);
        basket.update(data);
        return makePrettier(basket);
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
        return makePrettier(basket);
    }

    async appendVariantsList(basketId, data) {
        const {
            isObjectTypeLine,
            lendAreaInSqM,
            trackLengthInM,
            trackWidthInM,
            testingSitesNumberPerFiveHa,
            regionId,
            variants = null,
        } = data;

        const transaction = await sequelize.transaction();
        try {
            let basket = await this._getOrCreateBasket(basketId);

            if (basket.basketVariants.length) {
                await BasketVariantMapping.destroy({
                    where: { basketId: basket.id },
                    transaction,
                });
            }

            if (variants.length) {
                const variantsToCreate = data.variants.map((item) => {
                    return {
                        variantId: item.id,
                        quantity: item.quantity,
                        basketId: basket.id,
                    };
                });
                await BasketVariantMapping.bulkCreate(variantsToCreate, { transaction });
            }
            await basket.update(
                {
                    isObjectTypeLine,
                    lendAreaInSqM,
                    trackLengthInM,
                    trackWidthInM,
                    testingSitesNumberPerFiveHa,
                    regionId,
                },
                { transaction }
            );
            await basket.reload({ transaction });
            await transaction.commit();
            return makePrettier(basket);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
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
        return makePrettier(basket);
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
        return makePrettier(basket);
    }

    async clear(basketId) {
        let basket = await this._getOrCreateBasket(basketId);
        await basket.update({
            isObjectTypeLine: null,
            lendAreaInSqM: null,
            trackLengthInM: null,
            trackWidthInM: null,
            testingSitesNumberPerFiveHa: null,
            regionId: null,
        });
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
