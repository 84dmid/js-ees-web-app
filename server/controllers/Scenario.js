import ScenarioModel from '../models/Scenario.js';
import AppError from '../errors/AppError.js';

class Scenario {
    async getAll(req, res, next) {
        try {
            const scenarios = await ScenarioModel.getAll(req.query);
            res.json(scenarios);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id сценария исследований');
            }
            const scenario = await ScenarioModel.getOne(req.params.id);
            res.json(scenario);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async create(req, res, next) {
        try {
            const scenario = await ScenarioModel.create(req.body);
            res.json(scenario);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id сценария исследований');
        }
        try {
            const scenario = await ScenarioModel.update(req.params.id, req.body);
            res.json(scenario);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveUp(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id сценария исследований');
        }
        try {
            const scenario = await ScenarioModel.moveUp(req.params.id);
            res.json(scenario);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveDown(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id сценария исследований');
        }
        try {
            const scenario = await ScenarioModel.moveDown(req.params.id);
            res.json(scenario);
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
            const scenario = await ScenarioModel.append(id, variantId);
            res.json(scenario);
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
            const scenario = await ScenarioModel.remove(id, variantId);
            res.json(scenario);
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
            const scenario = await ScenarioModel.delete(req.params.id);
            res.json(scenario);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
}

export default new Scenario();
