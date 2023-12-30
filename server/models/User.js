import { User as UserMapping } from './mapping.js';

class User {
    async getAll() {
        const users = await UserMapping.findAll();
        return users;
    }

    async getOne(id) {
        const user = await UserMapping.findByPk(id);
        if (!user) {
            throw new Error('Пользователь не найден в БД');
        }
        return user;
    }

    async getByEmail(email) {
        const user = await UserMapping.findOne({ where: { email } });
        if (!user) {
            throw new Error('Пользователь не найден в БД');
        }
        return user;
    }

    async create(data) {
        const { name, email, password, role } = data;
        console.log(data);
        const check = await UserMapping.findOne({ where: { email: email } });
        console.log(check);
        if (check) {
            throw new Error('Пользователь уже существует');
        }
        const user = await UserMapping.create({ name, email, password, role });
        return user;
    }

    async update(id, data) {
        const user = await UserMapping.findByPk(id);
        if (!user) {
            throw new Error('Пользователь не найден в БД');
        }
        await user.update(data);
        return user;
    }

    async delete(id) {
        const user = await UserMapping.findByPk(id);
        if (!user) {
            throw new Error('Пользователь не найден в БД');
        }
        await user.destroy();
        return user;
    }
}

export default new User();
