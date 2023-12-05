
// сейчас модуль не используется, оставлен на будущее, если надо будет обновлять состав проекта.

import { ProjectSurvey as ProjectSurveyMapping } from './mapping.js';
import { Project as ProjectMapping } from './mapping.js';

class ProjectSurvey {
    async getAll(projectId) {
        const project = await ProjectMapping.findByPk(projectId);
        if (!project) {
            throw new Error('Проект не найден в БД');
        }
        const projectSurveys = await ProjectSurveyMapping.findAll({
            where: {projectId}
        });
        return projectSurveys;
    }

    async getOne(id, projectId) {
        const project = await ProjectMapping.findByPk(projectId);
        if (!project) {
            throw new Error('Проект не найден в БД');
        }
        const projectSurvey = await ProjectSurveyMapping.findOne({
            where: {id, projectId}
        });
        if (!projectSurvey) {
            throw new Error('Исследование найден в БД');
        }
        return projectSurvey;
    }
    
    async create(data) {
        const {name} = data;
        const projectSurvey = await ProjectSurveyMapping.create({name});
        return projectSurvey;
    }
    
    async update(id, data) {
        const projectSurvey = await ProjectSurveyMapping.findByPk(id);
        if (!projectSurvey) {
            throw new Error('Список исследования проекта не найден в БД');
        }
        const changes = {};
        if (data.name) changes.name = data.name;

        if (Object.keys(changes)) {
            await projectSurvey.update(changes);
        }
        return projectSurvey;
    }
    
    async delete(id) {
        const projectSurvey = await ProjectSurveyMapping.findByPk(id);
        if (!projectSurvey) {
            throw new Error('Список исследования проекта не найден в БД');
        }
        await projectSurvey.destroy();
        return projectSurvey;
    }
}

export default new ProjectSurvey();