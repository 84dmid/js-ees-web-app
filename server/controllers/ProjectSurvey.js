// сейчас модуль не используется, оставлен на будущее, если надо будет обновлять состав проекта.

import ProjectSurveyModel from "../models/ProjectSurvey.js";
import AppError from "../errors/AppError.js";

class ProjectSurvey{

    async adminGetAll(req, res, next) {
        try {
            if (!req.params.projectId) {
                throw new Error('Не указан id проекта')
            }
            const projectSurveys = await ProjectSurveyModel.getAll(req.params.projectId);
            res.json(projectSurveys);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async adminGetOne(req, res, next) {
        try {
            if (!req.params.projectId) {
                throw new Error('Не указан id проекта')
            }
            if (!req.params.id) {
                throw new Error('Не указан id исследования')
            }
            const projectSurvey = await ProjectSurveyModel.getOne(req.params.id, req.params.projectId);
            res.json(projectSurvey);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async create(req, res, next) {
        try {
            const projectSurvey = await ProjectSurveyModel.create(req.body);
            res.json(projectSurvey);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id обработчика варианта исследований')
        }
        try {
            const projectSurvey = await ProjectSurveyModel.update(req.params.id, req.body);
            res.json(projectSurvey);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id обработчика варианта исследований')
        }
        try {
            const projectSurvey = await ProjectSurveyModel.delete(req.params.id);
            res.json(projectSurvey);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

}

export default new ProjectSurvey();