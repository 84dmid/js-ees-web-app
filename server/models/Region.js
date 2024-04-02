import { Region as RegionMapping } from './mapping.js';
import { Variant as VariantMapping } from './mapping.js';

// const include = [
//     {
//         model: VariantMapping,
//         as: 'variants',
//         attributes: ['variantId'],
//     },
// ];

class Region {
    async getAll({ isProduction = undefined }) {
        const where = {};
        if (isProduction !== undefined) where.isProduction = isProduction;
        const regions = await RegionMapping.findAll({
            order: ['id'],
            // include,
            where,
        });
        return regions;
    }

    async getOne(id) {
        const region = await RegionMapping.findByPk(id, {
            // include,
        });
        if (!region) {
            throw new Error('Регион не найден в БД');
        }
        return region;
    }

    async create(data) {
        const { name, isProduction } = data;
        const region = await RegionMapping.create({
            name,
            isProduction,
        });
        return region;
    }

    async createSeveral(data) {
        const region = await RegionMapping.bulkCreate(data);
        return region;
    }

    async update(id, data) {
        const region = await RegionMapping.findByPk(id);
        if (!region) {
            throw new Error('Регион не найден в БД');
        }
        await region.update(data);
        return region;
    }

    async delete(id) {
        const region = await RegionMapping.findByPk(id);
        if (!region) {
            throw new Error('Регион не найден в БД');
        }
        await region.destroy();
        return region;
    }
}

export default new Region();
