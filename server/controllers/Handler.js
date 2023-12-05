import HandlerModel from "../models/Handler.js";
import AppError from "../errors/AppError.js";

class Handler{

    async getAll(req, res, next) {
        try {
            const handlers = await HandlerModel.getAll();
            res.json(handlers);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id обработчика варианта исследований')
            }
            const handler = await HandlerModel.getOne(req.params.id);
            res.json(handler);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async create(req, res, next) {
        try {
            const handler = await HandlerModel.create(req.body);
            res.json(handler);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id обработчика варианта исследований')
        }
        try {
            const handler = await HandlerModel.update(req.params.id, req.body);
            res.json(handler);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id обработчика варианта исследований')
        }
        try {
            const handler = await HandlerModel.delete(req.params.id);
            res.json(handler);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

}

export default new Handler();