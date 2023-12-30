import VariantModel from '../models/Variant.js';
import AppError from '../errors/AppError.js';

class Variant {
    async getAll(req, res, next) {
        try {
            const {
                categoryId = null,
                subcategoryId = null,
                surveyId = null,
            } = req.params;
            const options = { categoryId, subcategoryId, surveyId };
            const variants = await VariantModel.getAll(options);
            res.json(variants);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error(
                    'Не указан id варианта объёма выбранного вида исследований'
                );
            }
            const variant = await VariantModel.getOne(req.params.id);
            res.json(variant);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async create(req, res, next) {
        try {
            if (!Object.keys(req.body).length) {
                throw new Error('Нет данных для созданий варианта исследований');
            }
            const variant = await VariantModel.create(req.body);
            res.json(variant);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error(
                    'Не указан id варианта объёма выбранного вида исследований'
                );
            }
            try {
                const variant = await VariantModel.update(req.params.id, req.body);
                res.json(variant);
            } catch (error) {
                next(AppError.badRequest(error.message));
            }
            if (!Object.keys(req.body).length) {
                throw new Error('Нет данных для обновления варианта исследований');
            }
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveUp(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id варианта');
        }
        try {
            const survey = await VariantModel.moveUp(req.params.id, req.body);
            res.json(survey);
        } catch (error) {
            console.error(`Ошибка перемещения варианта вверх: ${error}`);
            next(AppError.badRequest(error.message));
        }
    }

    async moveDown(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id варианта');
        }
        try {
            const survey = await VariantModel.moveDown(req.params.id, req.body);
            res.json(survey);
        } catch (error) {
            console.error(`Ошибка перемещения варианта вниз: ${error}`);
            next(AppError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id варианта объёма выбранного вида исследований');
        }
        try {
            const variant = await VariantModel.delete(req.params.id);
            res.json(variant);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
}

export default new Variant();
