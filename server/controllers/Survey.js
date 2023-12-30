import SurveyModel from '../models/Survey.js';
import AppError from '../errors/AppError.js';

class Survey {
    async getAll(req, res, next) {
        try {
            const { categoryId = null, subcategoryId = null } = req.params;
            const surveys = await SurveyModel.getAll({ categoryId, subcategoryId });
            res.json(surveys);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id вида исследований');
            }
            const survey = await SurveyModel.getOne(req.params.id);
            res.json(survey);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async create(req, res, next) {
        try {
            if (!Object.keys(req.body).length) {
                throw new Error('Нет данных для создания исследования');
            }
            const survey = await SurveyModel.create(req.body);
            res.json(survey);
        } catch (error) {
            console.error(error);
            next(AppError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id вида исследований');
            }
            const data = {};
            if (!Object.keys(req.body).length) {
                throw new Error('Нет данных для обновления');
            }
            if (req.body.order) data.order = req.body.order;
            if (req.body.name) data.name = req.body.name;
            if (req.body.subcategoryId) data.subcategoryId = req.body.subcategoryId;
            const survey = await SurveyModel.update(req.params.id, data);
            res.json(survey);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveUp(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id исследования');
        }
        try {
            const survey = await SurveyModel.moveUp(req.params.id, req.body);
            res.json(survey);
        } catch (error) {
            console.error(`Ошибка перемещения исследования вверх: ${error}`);
            next(AppError.badRequest(error.message));
        }
    }

    async moveDown(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id исследования');
        }
        try {
            const survey = await SurveyModel.moveDown(req.params.id, req.body);
            res.json(survey);
        } catch (error) {
            console.error(`Ошибка перемещения исследования вниз: ${error}`);
            next(AppError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id вида исследований');
            }
            const survey = await SurveyModel.delete(req.params.id);
            res.json(survey);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
}

export default new Survey();
