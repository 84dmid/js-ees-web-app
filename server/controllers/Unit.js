import UnitModel from "../models/Unit.js";
import AppError from "../errors/AppError.js";

class Unit{

    async getAll(req, res, next) {
        try {
            const units = await UnitModel.getAll();
            res.json(units);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id единицы измерений')
            }
            const unit = await UnitModel.getOne(req.params.id);
            res.json(unit);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async create(req, res, next) {
        try {
            const data = {
                name: req.body.name,
            }
            const unit = await UnitModel.create(data);
            res.json(unit);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id единицы измерений')
        }
        try {
            const data = {};
            if (req.body.name) data.name = req.body.name;
            const unit = await UnitModel.update(req.params.id, req.body);
            res.json(unit);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id единицы измерений')
        }
        try {
            const unit = await UnitModel.delete(req.params.id);
            res.json(unit);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

}

export default new Unit();