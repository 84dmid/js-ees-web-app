import SurveyModel from "../models/Survey.js";
import AppError from "../errors/AppError.js";

class Survey{

    async getAll(req, res, next) {
        try {
            const surveys = await SurveyModel.getAll();
            res.json(surveys);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id вида исследований')
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
            }
            const survey = await SurveyModel.create(data);
            res.json(survey);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id вида исследований')
            }
            const data = {};
            if (!Object.keys(req.body).length) {
                throw new Error('Нет данных для обновления')
            }
            if (req.body.order) data.order = req.body.order;
            if (req.body.name) data.name = req.body.name;
            const survey = await SurveyModel.update(req.params.id, data);
            res.json(survey);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id вида исследований')
            }
            const survey = await SurveyModel.delete(req.params.id);
            res.json(survey);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

}

export default new Survey();