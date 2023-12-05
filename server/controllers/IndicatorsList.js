// модуль не участвует в программе, будет использоваться в будущем

import IndicatorsListModel from "../models/IndicatorsList.js";
import AppError from "../errors/AppError.js";

class IndicatorsList{

    async getAll(req, res, next) {
        try {
            const indicatorsLists = await IndicatorsListModel.getAll();
            res.json(indicatorsLists);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id списка определяемых показателей')
            }
            const indicatorsList = await IndicatorsListModel.getOne(req.params.id);
            res.json(indicatorsList);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async create(req, res, next) {
        try {
            const indicatorsList = await IndicatorsListModel.create(req.body);
            res.json(indicatorsList);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async update(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id списка определяемых показателей')
        }
        try {
            const indicatorsList = await IndicatorsListModel.update(req.params.id, req.body);
            res.json(indicatorsList);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
    
    async delete(req, res, next) {
        if (!req.params.id) {
            throw new Error('Не указан id списка определяемых показателей')
        }
        try {
            const indicatorsList = await IndicatorsListModel.delete(req.params.id);
            res.json(indicatorsList);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }

}

export default new IndicatorsList();