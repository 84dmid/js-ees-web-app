import { Handler as HandlerMapping } from './mapping.js';

class Handler {
    async getAll() {
        const handlers = await HandlerMapping.findAll();
        return handlers;
    }

    async getOne(id) {
        const handler = await HandlerMapping.findByPk(id);
        if (!handler) {
            throw new Error('Обработчик не найден в БД');
        }
        return handler;
    }
    
    async create(data) {
        const {name, description} = data;
        const handler = await HandlerMapping.create({description, name});
        return handler;
    }
    
    async update(id, data) {
        const handler = await HandlerMapping.findByPk(id);
        if (!handler) {
            throw new Error('Обработчик не найден в БД');
        }
        const changes = {};
        if (data.name) changes.name = data.name;
        if (data.description) changes.description = data.description;

        if (Object.keys(changes)) {
            await handler.update(changes);
        }
        return handler;
    }
    
    async delete(id) {
        const handler = await HandlerMapping.findByPk(id);
        if (!handler) {
            throw new Error('Обработчик не найден в БД');
        }
        await handler.destroy();
        return handler;
    }
}

export default new Handler();