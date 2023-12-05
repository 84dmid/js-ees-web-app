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
    
    async create(data) {
        const survey = await SurveyMapping.create(data);
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