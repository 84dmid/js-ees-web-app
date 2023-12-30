import CategoryModel from '../models/Category.js';
import AppError from '../errors/AppError.js';

class Category {
    async getContent(req, res, next) {
        try {
            const categories = await CategoryModel.getContent(req.query);
            res.json(categories);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async getFullContent(req, res, next) {
        try {
            const categories = await CategoryModel.getFullContent(req.query);
            res.json(categories);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await CategoryModel.getAll();
            res.json(categories);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id категории');
            }
            const category = await CategoryModel.getOne(req.params.id);
            res.json(category);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async create(req, res, next) {
        try {
            const category = await CategoryModel.create(req.body);
            res.json(category);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id категории');
        }
        try {
            const category = await CategoryModel.update(req.params.id, req.body);
            res.json(category);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveUp(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id категории');
        }
        try {
            const category = await CategoryModel.moveUp(req.params.id);
            res.json(category);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveDown(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id категории');
        }
        try {
            const category = await CategoryModel.moveDown(req.params.id);
            res.json(category);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id категории');
        }
        try {
            const category = await CategoryModel.delete(req.params.id);
            res.json(category);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
}

export default new Category();
