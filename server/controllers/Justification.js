import JustificationModel from "../models/Justification.js";
import AppError from "../errors/AppError.js";

class Justification{

    async getAll(req, res, next) {
        try {
            const justifications = await JustificationModel.getAll();
            res.json(justifications);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id варианта обоснования объёма исследований')
            }
            const justification = await JustificationModel.getOne(req.params.id);
            res.json(justification);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async create(req, res, next) {
        try {
            const justification = await JustificationModel.create(req.body);
            res.json(justification);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id варианта обоснования объёма исследований')
        }
        try {
            const justification = await JustificationModel.update(req.params.id, req.body);
            res.json(justification);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id варианта обоснования объёма исследований')
        }
        try {
            const justification = await JustificationModel.delete(req.params.id);
            res.json(justification);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

}

export default new Justification();