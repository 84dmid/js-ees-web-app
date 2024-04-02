import RegionModel from '../models/Region.js';
import AppError from '../errors/AppError.js';

class Region {
    async getAll(req, res, next) {
        try {
            const regions = await RegionModel.getAll(req.query);
            res.json(regions);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id региона');
            }
            const region = await RegionModel.getOne(req.params.id);
            res.json(region);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async create(req, res, next) {
        console.log(req.body);
        try {
            const region = await RegionModel.create(req.body);
            res.json(region);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async createSeveral(req, res, next) {
        console.log(req.body);
        try {
            const region = await RegionModel.createSeveral(req.body);
            res.json(region);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id региона');
        }
        try {
            const region = await RegionModel.update(req.params.id, req.body);
            res.json(region);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id региона');
        }
        console.log('test......................................', req.params.id);
        try {
            const region = await RegionModel.delete(req.params.id);
            res.json(region);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
}

export default new Region();
