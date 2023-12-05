import SubcategoryModel from "../models/Subcategory.js";
import AppError from "../errors/AppError.js";

class Subcategory{

    async getAll(req, res, next) {
        try {
            const subcategories = await SubcategoryModel.getAll();
            res.json(subcategories);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id подкатегорий видов исследований')
            }
            const subcategory = await SubcategoryModel.getOne(req.params.id);
            res.json(subcategory);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async create(req, res, next) {
        try {
            const data = {
                order: req.body.order,
                name: req.body.name,
            }
            const subcategory = await SubcategoryModel.create(data);
            res.json(subcategory);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id подкатегорий видов исследований')
            }
            if (!Object.keys(req.body).length) {
                throw new Error('Нет данных для обновления')
            }
            const data = {};
            if (req.body.order) data.order = req.body.order;
            if (req.body.name) data.name = req.body.name;
            const subcategory = await SubcategoryModel.update(req.params.id, data);
            res.json(subcategory);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id подкатегорий видов исследований')
        }
        try {
            const subcategory = await SubcategoryModel.delete(req.params.id);
            res.json(subcategory);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

}

export default new Subcategory();