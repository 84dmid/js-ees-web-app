import sequelize from '../sequelize.js';
import { Op } from 'sequelize';

import { Competence as CompetenceMapping } from './mapping.js';
import { User as UserMapping } from './mapping.js';
import { UserCompetence as UserCompetenceMapping } from './mapping.js';

class UserCompetence {
    async getAll(id) {
        const user = await UserMapping.findByPk(id);
        if (!user) {
            throw new Error('Пользователь не найден в БД');
        }
        const userCompetences = await CompetenceMapping.findAll({
            where: { userId: id },
        });
        if (!userCompetences) {
            throw new Error('Пользователь не имеет компетенций');
        }
        return userCompetences;
    }

    async getOne(id, competenceId) {
        const user = await UserMapping.findByPk(id);
        if (!user) {
            throw new Error('Пользователь не найден в БД');
        }
        const competence = await CompetenceMapping.findByPk({ id: competenceId });
        if (!competence) {
            throw new Error('Компетенция не найдена в БД');
        }
        const userCompetence = await CompetenceMapping.findOne({
            where: { userId: id, competenceId },
        });
        if (!userCompetence) {
            throw new Error('У  пользователя отсутствует компетенция');
        }
        return userCompetence;
    }

    async create(id, competenceId) {
        const user = await UserMapping.findByPk(id);
        if (!user) {
            throw new Error('Пользователь не найден в БД');
        }
        const competence = await CompetenceMapping.findByPk({ id: competenceId });
        if (!competence) {
            throw new Error('Компетенция не найдена в БД');
        }
        const userCompetence = await UserCompetenceMapping.create({
            userId: id,
            competenceId,
        });
        return userCompetence;
    }

    async delete(id, competenceId) {
        const user = await UserMapping.findByPk(id);
        if (!user) {
            throw new Error('Пользователь не найден в БД');
        }
        const competence = await CompetenceMapping.findByPk({ id: competenceId });
        if (!competence) {
            throw new Error('Компетенция не найдена в БД');
        }

        const userCompetence = await UserCompetenceMapping.findOne({
            where: { userId: id, competenceId },
        });

        if (userCompetence) {
            await userCompetence.destroy();
        } else {
            throw new Error('Пользователь не имеет компетенций');
        }
        return userCompetence;
    }
}

export default new UserCompetence();
