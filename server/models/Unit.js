import { Unit as UnitMapping } from './mapping.js';

class Unit {
    async getAll() {
        const units = await UnitMapping.findAll();
        return units;
    }

    async getOne(id) {
        const unit = await UnitMapping.findByPk(id);
        if (!unit) {
            throw new Error('Единица измерения не найдена в БД');
        }
        return unit;
    }
    
    async create(data) {
        const unit = await UnitMapping.create(data);
        return unit;
    }
    
    async update(id, data) {
        const unit = await UnitMapping.findByPk(id);
        if (!unit) {
            throw new Error('Единица измерения не найдена в БД');
        }
        await unit.update(data);
        return unit;
    }
    
    async delete(id) {
        const unit = await UnitMapping.findByPk(id);
        if (!unit) {
            throw new Error('Единица измерения не найдена в БД');
        }
        await unit.destroy();
        return unit;
    }
}

export default new Unit();