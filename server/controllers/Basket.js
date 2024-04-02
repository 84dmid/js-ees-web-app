import BasketModel from '../models/Basket.js';
import AppError from '../errors/AppError.js';

const maxAge = 3600 * 1000 * 24 * 365;
const signed = true;

class Basket {
    async getOne(req, res, next) {
        try {
            let basket;
            basket = await BasketModel.getOne(parseInt(req.signedCookies.basketId));
            res.cookie('basketId', basket.id, { maxAge, signed });
            res.json(basket);
        } catch (error) {
            next(AppError.badRequest(`Ошибка при получении корзины: ${error.message}`));
        }
    }

    async createLink(req, res, next) {
        try {
            let link = await BasketModel.createLink(parseInt(req.signedCookies.basketId));
            res.json(link);
        } catch (error) {
            next(
                AppError.badRequest(
                    `Ошибка при создании ссылки на проект: ${error.message}`
                )
            );
        }
    }

    async getLink(req, res, next) {
        try {
            let link = await BasketModel.getLink(req.params.id);
            res.json(link);
        } catch (error) {
            next(
                AppError.badRequest(
                    `Ошибка при получении ссылки на проект: ${error.message}`
                )
            );
        }
    }

    async updateProjectParams(req, res, next) {
        try {
            let basketId;
            if (req.signedCookies.basketId) {
                basketId = parseInt(req.signedCookies.basketId);
            }
            const projectParams = req.body;
            const basket = await BasketModel.updateParams(basketId, projectParams);
            res.cookie('basketId', basket.id, { maxAge, signed });
            res.json(basket);
        } catch (error) {
            next(
                AppError.badRequest(
                    `Ошибка при обновлении параметров проекта: ${error.message}`
                )
            );
        }
    }

    async append(req, res, next) {
        try {
            let basketId;
            if (req.signedCookies.basketId) {
                basketId = parseInt(req.signedCookies.basketId);
            }
            const { variantId, quantity } = req.params;
            if (parseFloat(quantity) <= 0) {
                throw new Error('Не указан объём исследований');
            }
            const basket = await BasketModel.append(basketId, variantId, quantity);
            res.cookie('basketId', basket.id, { maxAge, signed });
            res.json(basket);
        } catch (error) {
            next(
                AppError.badRequest(
                    `Ошибка при добавлении варианта в корзину: ${error.message}`
                )
            );
        }
    }

    async appendVariantsList(req, res, next) {
        try {
            let basketId;
            if (req.signedCookies.basketId) {
                basketId = parseInt(req.signedCookies.basketId);
            }
            const data = req.body;
            const basket = await BasketModel.appendVariantsList(basketId, data);
            res.cookie('basketId', basket.id, { maxAge, signed });
            res.json(basket);
        } catch (error) {
            next(
                AppError.badRequest(
                    `Ошибка при добавлении списка вариантов в корзину: ${error.message}`
                )
            );
        }
    }

    async update(req, res, next) {
        try {
            let basketId;
            if (req.signedCookies.basketId) {
                basketId = parseInt(req.signedCookies.basketId);
            }
            const { variantId, quantity } = req.params;

            if (parseFloat(quantity) <= 0) {
                throw new Error('Не указан объём исследований');
            }
            const basket = await BasketModel.update(basketId, variantId, quantity);
            res.cookie('basketId', basket.id, { maxAge, signed });
            res.json(basket);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async remove(req, res, next) {
        try {
            let basketId;
            if (req.signedCookies.basketId) {
                basketId = parseInt(req.signedCookies.basketId);
            }
            const { variantId } = req.params;
            const basket = await BasketModel.remove(basketId, variantId);
            res.cookie('basketId', basket.id, { maxAge, signed });
            res.json(basket);
        } catch (error) {
            console.error(`Ошибка удаления варианта из корзины ${error}`);
            next(
                AppError.badRequest(
                    `Ошибка удаления варианта из корзины ${error.message}`
                )
            );
        }
    }

    async clear(req, res, next) {
        try {
            let basketId;
            if (req.signedCookies.basketId) {
                basketId = parseInt(req.signedCookies.basketId);
            }
            const basket = await BasketModel.clear(basketId);
            res.cookie('basketId', basket.id, { maxAge, signed });
            res.json(basket);
        } catch (error) {
            next(AppError.badRequest(`Ошибка при очистке корзины ${error.message}`));
        }
    }

    async delete(req, res, next) {
        try {
            let basketId;
            if (req.signedCookies.basketId) {
                basketId = parseInt(req.signedCookies.basketId);
            }
            const basket = await BasketModel.delete(basketId);
            res.json(basket);
        } catch (error) {
            next(`Ошибка при удалении корзины ${error.message}`);
        }
    }
}

export default new Basket();
