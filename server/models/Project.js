import { Project as ProjectMapping} from './mapping.js';
import { ProjectSurvey as ProjectSurveyMapping } from './mapping.js';
import { ProjectSurveyProp as ProjectSurveyPropMapping } from './mapping.js';
import { User as UserMapping } from './mapping.js';

class Project {
    
    async getAll(userId = null) {
        let project;
        if (userId) {
            project = await ProjectMapping.findAll({where: {userId}});
        } else {
            project = await ProjectMapping.findAll();
        }
        return project;
    }

    async getOne(id, userId = null) {
        let where = {id};
        if (userId) {
            const user = UserMapping.findByPk(userId);
            if (!user) {
                throw new Error('Пользователь не найден в БД');
            }
            where.userId = userId;
        }
        const project = await ProjectMapping.findOne({
            where,
            include: [
                {
                    model: ProjectSurveyMapping,
                    as: 'projectSurveys', 
                    include: [
                        {
                            model: ProjectSurveyPropMapping,
                            as: 'projectSurveyProps'
                        }
                    ]
                } 
            ]
        });
        if (!project) {
            throw new Error('Проект не найден в БД');
        }
        return project;
    }
    
    async create(data) {
        const {name, comment, address, ledArea, lendExtension, objectType, customer, userId, lendArea, status, variants} = data;
        const project = await ProjectMapping.create({name, comment, address, ledArea, lendExtension, objectType, customer, userId, lendArea, status});
        let projectPrice = 0;
        for (let item of variants) {
            const {order, survey, variant, unit, quantity, subcategory, category, objectType, normDoc, justification, variantProps = null} = item;
            let {price} = item;
            if (variantProps) {
                price = variantProps.reduce((sum, prop) => sum + prop.price * prop.quantity, 0);
            }
            const projectSurvey = await ProjectSurveyMapping.create({order, survey, variant, unit, price, quantity, subcategory, category, objectType, normDoc, justification, projectId: project.id});
            if (variantProps) {
                for (let prop of variantProps) {
                    await ProjectSurveyPropMapping.create({...prop, projectSurveyId: projectSurvey.id});
                }
            }
            projectPrice += price;
        }
        await project.update({price: projectPrice});
        return project;
    }
    
    
    async delete(id, userId = null) {
        let where = {id};
        if (userId) {
            const user = UserMapping.findByPk(userId);
            if (!user) {
                throw new Error('Пользователь не найден в БД');
            }
            where.userId = userId;
        }
        const project = await ProjectMapping.findOne({
            where
        });
        if (!project) {
            throw new Error('Проект не найден в БД');
        }
        await project.destroy();
        return project;
    }
}

export default new Project();