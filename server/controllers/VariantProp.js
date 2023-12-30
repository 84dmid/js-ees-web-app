import VariantPropModel from '../models/VariantProp.js';
import AppError from '../errors/AppError.js';

class VariantProp {
    async getAll(req, res, next) {
        try {
            if (!req.params.variantId) {
                throw new Error('Не указан id варианта исследований');
            }
            const properties = await VariantPropModel.getAll(req.params.variantId);
            res.json(properties);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { variantId, id } = req.params;
            if (!variantId) {
                throw new Error('Не указан id варианта исследований');
            }
            if (!id) {
                throw new Error('Не указан id свойства варианта исследований');
            }
            const properties = await VariantPropModel.getOne(variantId, id);
            res.json(properties);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async create(req, res, next) {
        try {
            if (!req.params.variantId) {
                throw new Error('Не указан id варианта исследований');
            }
            const properties = await VariantPropModel.create(
                req.params.variantId,
                req.body
            );
            res.json(properties);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async update(req, res, next) {
        try {
            const { variantId, id } = req.params;
            if (!variantId) {
                throw new Error('Не указан id варианта исследований');
            }
            if (!id) {
                throw new Error('Не указан id свойства варианта исследований');
            }
            const properties = await VariantPropModel.update(variantId, id, req.body);
            res.json(properties);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

    async moveUp(req, res, next) {
        const { id, variantId } = req.params;
        if (!id) {
            throw new Error('Не указан id свойства варианта');
        }
        if (!variantId) {
            throw new Error('Не указан id варианта исследований');
        }
        try {
            const variantProp = await VariantPropModel.moveUp(id, variantId);
            res.json(variantProp);
        } catch (error) {
            console.error(`Ошибка перемещения свойства варианта вверх: ${error}`);
            next(AppError.badRequest(error.message));
        }
    }

    async moveDown(req, res, next) {
        const { id, variantId } = req.params;
        if (!id) {
            throw new Error('Не указан id свойства варианта');
        }
        if (!variantId) {
            throw new Error('Не указан id варианта исследований');
        }
        try {
            const variantProp = await VariantPropModel.moveDown(id, variantId);
            res.json(variantProp);
        } catch (error) {
            console.error(`Ошибка перемещения свойства варианта вниз: ${error}`);
            next(AppError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { variantId, id } = req.params;
            if (!variantId) {
                throw new Error('Не указан id варианта исследований');
            }
            if (!id) {
                throw new Error('Не указан id свойства варианта исследований');
            }
            const properties = await VariantPropModel.delete(variantId, id);
            res.json(properties);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
}

export default new VariantProp();
