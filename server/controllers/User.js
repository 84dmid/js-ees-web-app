import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/User.js';
import AppError from '../errors/AppError.js';

const makeJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY);
};

class User {
    async tempSignUp(req, res, next) {
        try {
            const data = {
                email: null,
                password: null,
                role: 'USER',
            };
            const user = await UserModel.create(data);
            const token = makeJwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async signUp(req, res, next) {
        console.log('test');
        try {
            const { email, password, role = 'USER' } = req.body;
            if (!email || !password) {
                throw new Error('Не введён email или пароль');
            }
            if (role !== 'USER') {
                throw new Error('Роль может быть только "USER"');
            }
            const data = {
                name: req.body.name || null,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 5),
                role: req.body.role,
            };
            const user = await UserModel.create(data);
            const token = makeJwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.getByEmail(email);
            const isPasswordTrue = bcrypt.compareSync(password, user.password);
            if (!isPasswordTrue) {
                throw new Error('Указан неверный пароль');
            }
            const token = makeJwt(user.id, user.email, user.role);
            res.json({ token });
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async check(req, res, next) {
        const token = makeJwt(req.auth.id, req.auth.email, req.auth.role);
        return res.json({ token });
    }

    async getAll(req, res, next) {
        try {
            const users = await UserModel.getAll();
            res.json(users);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя');
            }
            const user = await UserModel.getOne(req.params.id);
            res.json(user);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async create(req, res, next) {
        const { email, password, role = 'USER' } = req.body;
        try {
            if (!email || !password) {
                throw new Error('Не введён email или пароль');
            }
            if (!['USER', 'ADMIN'].includes(role)) {
                throw new Error('Недопустимое значение роли');
            }
            const data = {
                name: req.body.name || null,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 5),
                role: req.body.role,
            };
            const user = await UserModel.create(data);
            res.json(user);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя');
            }
            if (!Object.keys(req.body).length) {
                throw new Error('Нет данных для обновления');
            }
            const data = {};
            if (req.body.name) data.name = req.body.name;
            if (req.body.email) data.email = req.body.email;
            if (req.body.password)
                data.password = await bcrypt.hash(req.body.password, 5);
            if (req.body.role) data.role = req.body.role;
            const user = await UserModel.update(req.params.id, data);
            res.json(user);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id пользователя');
        }
        try {
            const user = await UserModel.delete(req.params.id);
            res.json(user);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
}

export default new User();
