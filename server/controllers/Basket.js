import BasketModel from '../models/Basket.js';
import AppError from '../errors/AppError.js';

const maxAge = 3600 * 1000 * 24 * 365;
const signed = true;

class Basket{
    
    async getOne(req, res, next) {
        try {
            let basket;
            if (req.signedCookies.basketId) {
                basket = await BasketModel.getOne(parseInt(req.signedCookies.basketId));
            } else {
                basket = await BasketModel.create();
            }
            res.cookie('basketId', basket.id, {maxAge, signed});
            res.json(basket);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async append(req, res, next) {
        try {
            let basketId;
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create();
                basketId = created.id;
            } else {
                basketId = parseInt(req.signedCookies.basketId);
            }
            const {variantId, quantity} = req.params;
            if (!+quantity) {
                throw new Error('Не указан объём исследований');
            }
            const basket = await BasketModel.append(basketId, variantId, quantity);
            res.cookie('basketId', basket.id, {maxAge, signed});
            res.json(basket);            
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async remove(req, res, next) {
        try {
            let basketId;
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create();
                basketId = created.id;
            } else {
                basketId = parseInt(req.signedCookies.basketId);
            }
            const {variantId} = req.params;
            const basket = await BasketModel.remove(basketId, variantId);
            res.cookie('basketId', basket.id, {maxAge, signed});
            res.json(basket);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async clear(req, res, next) {
        try {
            let basketId;
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create();
                basketId = created.id;
            } else {
                basketId = parseInt(req.signedCookies.basketId);
            }
            const basket = await BasketModel.clear(basketId);
            res.cookie('basketId', basket.id, {maxAge, signed});
            res.json(basket);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async delete(req, res, next) {
        try {
            let basketId;
            if (!req.signedCookies.basketId) {
                throw new Error('Не указан id корзины');
            } else {
                basketId = parseInt(req.signedCookies.basketId);
            }
            const basket = await BasketModel.delete(basketId);
            res.json(basket);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

}

export default new Basket();