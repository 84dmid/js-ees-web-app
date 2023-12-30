import SubcategoryModel from '../models/Subcategory.js';
import AppError from '../errors/AppError.js';

class Subcategory {
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
                throw new Error('Не указан id подкатегории видов исследований');
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
                categoryId: req.body.categoryId,
            };
            const subcategory = await SubcategoryModel.create(data);
            res.json(subcategory);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id подкатегории видов исследований');
            }
            if (!Object.keys(req.body).length) {
                throw new Error('Нет данных для обновления');
            }
            const data = {};
            if (req.body.order) data.order = req.body.order;
            if (req.body.name) data.name = req.body.name;
            if (req.body.categoryId) data.categoryId = req.body.categoryId;
            const subcategory = await SubcategoryModel.update(req.params.id, data);
            res.json(subcategory);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveUp(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id подкатегории');
        }
        try {
            const subcategory = await SubcategoryModel.moveUp(req.params.id, req.body);
            res.json(subcategory);
        } catch (error) {
            console.error(`Ошибка перемещения подкатегории вверх: ${error}`);
            next(AppError.badRequest(error.message));
        }
    }

    async moveDown(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id подкатегории');
        }
        try {
            const subcategory = await SubcategoryModel.moveDown(req.params.id, req.body);
            res.json(subcategory);
        } catch (error) {
            console.error(`Ошибка перемещения подкатегории вниз: ${error}`);
            next(AppError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id подкатегории видов исследований');
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
