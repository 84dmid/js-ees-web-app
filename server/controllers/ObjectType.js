import ObjectTypeModel from "../models/ObjectType.js";
import AppError from "../errors/AppError.js";

class ObjectType{

    async getAll(req, res, next) {
        try {
            const objectTypes = await ObjectTypeModel.getAll();
            res.json(objectTypes);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id типа объекта капитального строительства')
            }
            const objectType = await ObjectTypeModel.getOne(req.params.id);
            res.json(objectType);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async create(req, res, next) {
        try {
            const objectType = await ObjectTypeModel.create(req.body);
            res.json(objectType);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id типа объекта капитального строительства')
        }
        try {
            const objectType = await ObjectTypeModel.update(req.params.id, req.body);
            res.json(objectType);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id типа объекта капитального строительства')
        }
        try {
            const objectType = await ObjectTypeModel.delete(req.params.id);
            res.json(objectType);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

}

export default new ObjectType();