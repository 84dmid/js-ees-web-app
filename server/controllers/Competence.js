import CompetenceModel from '../models/Competence.js';
import AppError from '../errors/AppError.js';

class Competence {
    async getAll(req, res, next) {
        try {
            const competences = await CompetenceModel.getAll(req.query);
            res.json(competences);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id компетенции');
            }
            const competence = await CompetenceModel.getOne(req.params.id);
            res.json(competence);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async create(req, res, next) {
        try {
            const competence = await CompetenceModel.create(req.body);
            res.json(competence);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id компетенции');
        }
        try {
            const competence = await CompetenceModel.update(req.params.id, req.body);
            res.json(competence);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveUp(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id компетенции');
        }
        try {
            const competence = await CompetenceModel.moveUp(req.params.id);
            res.json(competence);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveDown(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id компетенции');
        }
        try {
            const competence = await CompetenceModel.moveDown(req.params.id);
            res.json(competence);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id компетенции');
        }
        try {
            const competence = await CompetenceModel.delete(req.params.id);
            res.json(competence);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
}

export default new Competence();
