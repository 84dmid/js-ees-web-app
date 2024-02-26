import SurveyScenarioModel from '../models/SurveyScenario.js';
import AppError from '../errors/AppError.js';

class SurveyScenario {
    async getAll(req, res, next) {
        try {
            console.log(req.query);
            const surveyScenarios = await SurveyScenarioModel.getAll(req.query);
            res.json(surveyScenarios);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id сценария исследований');
            }
            const surveyScenario = await SurveyScenarioModel.getOne(req.params.id);
            res.json(surveyScenario);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async create(req, res, next) {
        try {
            const surveyScenario = await SurveyScenarioModel.create(req.body);
            res.json(surveyScenario);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id сценария исследований');
        }
        try {
            const surveyScenario = await SurveyScenarioModel.update(
                req.params.id,
                req.body
            );
            res.json(surveyScenario);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveUp(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id сценария исследований');
        }
        try {
            const surveyScenario = await SurveyScenarioModel.moveUp(req.params.id);
            res.json(surveyScenario);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveDown(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id сценария исследований');
        }
        try {
            const surveyScenario = await SurveyScenarioModel.moveDown(req.params.id);
            res.json(surveyScenario);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async append(req, res, next) {
        const { id, variantId } = req.params;
        if (!id) {
            throw new Error('Не указан id сценария исследований');
        }
        if (!variantId) {
            throw new Error('Не указан id варианта исследований');
        }
        try {
            const surveyScenario = await SurveyScenarioModel.append(id, variantId);
            res.json(surveyScenario);
        } catch (error) {
            next(
                AppError.badRequest(
                    `Ошибка при добавлении варианта в сценарий исследований: ${error.message}`
                )
            );
        }
    }

    async remove(req, res, next) {
        const { id, variantId } = req.params;
        if (!id) {
            throw new Error('Не указан id сценария исследований');
        }
        if (!variantId) {
            throw new Error('Не указан id варианта исследований');
        }
        try {
            const surveyScenario = await SurveyScenarioModel.remove(id, variantId);
            res.json(surveyScenario);
        } catch (error) {
            next(
                AppError.badRequest(
                    `Ошибка при удалении варианта из сценария исследований: ${error.message}`
                )
            );
        }
    }

    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id сценария исследований');
        }
        try {
            const surveyScenario = await SurveyScenarioModel.delete(req.params.id);
            res.json(surveyScenario);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
}

export default new SurveyScenario();
