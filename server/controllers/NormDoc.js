import NormDocModel from "../models/NormDoc.js";
import AppError from "../errors/AppError.js";

class NormDoc{

    async getAll(req, res, next) {
        try {
            const normDocs = await NormDocModel.getAll();
            res.json(normDocs);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id обработчика варианта исследований')
            }
            const normDoc = await NormDocModel.getOne(req.params.id);
            res.json(normDoc);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async create(req, res, next) {
        try {
            const normDoc = await NormDocModel.create(req.body);
            res.json(normDoc);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id обработчика варианта исследований')
        }
        try {
            const normDoc = await NormDocModel.update(req.params.id, req.body);
            res.json(normDoc);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id обработчика варианта исследований')
        }
        try {
            const normDoc = await NormDocModel.delete(req.params.id);
            res.json(normDoc);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

}

export default new NormDoc();