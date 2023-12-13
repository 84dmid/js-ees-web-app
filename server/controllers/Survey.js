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
            const data = {
                order: req.body.order,
                name: req.body.name,
                categoryId: req.body.categoryId,
                subcategoryId: req.body.subcategoryId,
            };
            const survey = await SurveyModel.create(data);
            res.json(survey);
        } catch (error) {
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
            if (req.body.categoryId) data.categoryId = req.body.categoryId;
            if (req.body.subcategoryId) data.subcategoryId = req.body.subcategoryId;
            const survey = await SurveyModel.update(req.params.id, data);
            res.json(survey);
        } catch (error) {
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
