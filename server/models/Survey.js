import { Op } from 'sequelize';

import sequelize from '../sequelize.js';

import { Survey as SurveyMapping } from './mapping.js';

class Survey {
    async getAll() {
        const surveys = await SurveyMapping.findAll();
        return surveys;
    }

    async getOne(id) {
        const survey = await SurveyMapping.findByPk(id);
        if (!survey) {
            throw new Error('Вид исследования не найден в БД');
        }
        return survey;
    }

    async create({ name, subcategoryId }) {
        const maxOrder = await SurveyMapping.max('order');
        const survey = await SurveyMapping.create({
            order: maxOrder + 1,
            name,
            subcategoryId,
        });
        return survey;
    }

    async update(id, data) {
        const survey = await SurveyMapping.findByPk(id);
        if (!survey) {
            throw new Error('Вид исследования не найден в БД');
        }
        await survey.update(data);
        return survey;
    }

    async moveDown(id, { subcategoryId }) {
        const survey = await SurveyMapping.findByPk(id);
        if (!survey) {
            throw new Error('Исследование не найдена в БД');
        }
        const maxOrder = await SurveyMapping.max('order', { where: { subcategoryId } });
        if (survey.order === maxOrder) {
            return { message: 'Исследование уже в самом низу' };
        }
        const nextSurvey = await SurveyMapping.findOne({
            where: {
                order: {
                    [Op.gt]: survey.order,
                },
                subcategoryId,
            },
            order: [['order', 'ASC']], // Сортировка по возрастанию
        });
        await sequelize.transaction(async (t) => {
            [survey.order, nextSurvey.order] = [nextSurvey.order, survey.order];
            await survey.save({ transaction: t });
            await nextSurvey.save({ transaction: t });
        });
        await survey.reload();
        return survey;
    }

    async moveUp(id, { subcategoryId }) {
        const survey = await SurveyMapping.findByPk(id);
        if (!survey) {
            throw new Error('Исследование не найдена в БД');
        }
        const minOrder = await SurveyMapping.min('order', { where: { subcategoryId } });
        if (survey.order === minOrder) {
            return { message: 'Исследование уже в самом верху' };
        }
        const prevSurvey = await SurveyMapping.findOne({
            where: {
                order: {
                    [Op.lt]: survey.order,
                },
                subcategoryId,
            },
            order: [['order', 'DESC']], // Сортировка по убыванию
        });
        await sequelize.transaction(async (t) => {
            [survey.order, prevSurvey.order] = [prevSurvey.order, survey.order];
            await survey.save({ transaction: t });
            await prevSurvey.save({ transaction: t });
        });
        await survey.reload();
        return survey;
    }

    async delete(id) {
        const survey = await SurveyMapping.findByPk(id);
        if (!survey) {
            throw new Error('Вид исследования не найден в БД');
        }
        await survey.destroy();
        return survey;
    }
}

export default new Survey();
