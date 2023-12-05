import AppError from '../errors/AppError.js';
import ProjectModel from '../models/Project.js';
import UserModel from '../models/User.js';
import BasketModel from '../models/Basket.js';


class Project{

    async adminGetAll(req, res, next) {
        try {
            const projects = await ProjectModel.getAll();
            res.json(projects);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async adminGetUser(req, res, next) {
        try {
            const projects = await ProjectModel.getAll(req.params.id);
            if (!projects) {
                throw new Error('Не указан id пользователя');
            }
            res.json(projects);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async adminGetOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id проекта')
            }
            const project = await ProjectModel.getOne(req.params.id);
            res.json(project);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async adminCreate(req, res, next) {
        try {
            if(!Object.keys(req.body).length) {
                throw new Error('Данные для заказа отсутствуют');
            }
            let user;
            if (req.body.userId) {
                user = await UserModel.getOne(req.body.userId);
            }
            if (!user) {
                throw new Error('Указанный пользователь отсутствует в БД')
            }
            const project = await ProjectModel.create(req.body);
            res.json(project);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async adminDelete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id проекта')
        }
        try {
            const project = await ProjectModel.delete(req.params.id);
            res.json(project);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }


    async userGetAll(req, res, next) {
        try {
            const projects = await ProjectModel.getAll(req.auth.id);
            res.json(projects);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async userGetOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id проекта')
            }
            if (!req.auth.id) {
                throw new Error('Не указан id пользователя')
            }
            const project = await ProjectModel.getOne(req.params.id, req.auth.id);
            res.json(project);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async userCreate(req, res, next) {
        try {
            if (!req.signedCookies.basketId) {
                throw new Error('Ваша корзина пуста');
            }
            const basket = await BasketModel.getOne(req.signedCookies.basketId);
            if (!basket.variants) {
                throw new Error('Ваша корзина пуста');
            }
            const user = await UserModel.getOne(req.auth.id);
            if (!user) {
                throw new Error('Указанный пользователь отсутствует в БД'); 
            }
            const data = {...req.body, userId: req.auth.id, variants: basket.variants};
            const project = await ProjectModel.create(data);
            res.json(project);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async userDelete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id проекта');
        }
        if (!req.auth.id) {
            throw new Error('Не указан id пользователя');
        }
        try {
            const project = await ProjectModel.delete(req.params.id, req.auth.id);
            res.json(project);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

}

export default new Project();