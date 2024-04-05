import sequelize from '../sequelize.js';
import { Op } from 'sequelize';

import { Competence as CompetenceMapping } from './mapping.js';

class Competence {
    async getAll() {
        const competences = await CompetenceMapping.findAll();
        return competences;
    }

    async getOne(id) {
        const competence = await CompetenceMapping.findByPk(id);
        if (!competence) {
            throw new Error('Компетенция не найдена в БД');
        }
        return competence;
    }

    async create(data) {
        const maxOrder = await CompetenceMapping.max('order');
        const competence = await CompetenceMapping.create({
            ...data,
            order: maxOrder + 1,
        });
        return competence;
    }

    async update(id, data) {
        const competence = await CompetenceMapping.findByPk(id);
        if (!competence) {
            throw new Error('Компетенция не найдена в БД');
        }
        await competence.update(data);
        return competence;
    }

    async moveDown(id) {
        const competence = await CompetenceMapping.findByPk(id);
        if (!competence) {
            throw new Error('Компетенция не найдена в БД');
        }
        const maxOrder = await CompetenceMapping.max('order');
        if (competence.order === maxOrder) {
            return { message: 'Компетенция уже в самом низу' };
        }
        const nextCompetence = await CompetenceMapping.findOne({
            where: {
                order: {
                    [Op.gt]: competence.order,
                },
            },
            order: [['order', 'ASC']], // Сортировка по возрастанию
        });
        await sequelize.transaction(async (t) => {
            [competence.order, nextCompetence.order] = [
                nextCompetence.order,
                competence.order,
            ];
            await competence.save({ transaction: t });
            await nextCompetence.save({ transaction: t });
        });
        await competence.reload();
        return competence;
    }

    async moveUp(id) {
        const competence = await CompetenceMapping.findByPk(id);
        if (!competence) {
            throw new Error('Компетенция не найдена в БД');
        }
        const minOrder = await CompetenceMapping.min('order');
        if (competence.order === minOrder) {
            return { message: 'Компетенция уже в самом верху' };
        }
        const prevCompetence = await CompetenceMapping.findOne({
            where: {
                order: {
                    [Op.lt]: competence.order,
                },
            },
            order: [['order', 'DESC']], // Сортировка по убыванию
        });
        await sequelize.transaction(async (t) => {
            [competence.order, prevCompetence.order] = [
                prevCompetence.order,
                competence.order,
            ];
            await competence.save({ transaction: t });
            await prevCompetence.save({ transaction: t });
        });
        await competence.reload();
        return competence;
    }

    async delete(id) {
        const competence = await CompetenceMapping.findByPk(id);
        if (!competence) {
            throw new Error('Компетенция не найдена в БД');
        }
        await competence.destroy();
        return competence;
    }
}

export default new Competence();
