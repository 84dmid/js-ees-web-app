// модуль не участвует в программе, будет использоваться в будущем

import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import IndicatorsListController from '../controllers/IndicatorsList.js';

const router = new express.Router();

router.get('/get_all', authMiddleware, adminMiddleware, IndicatorsListController.getAll);
router.get('/get_one/:id([0-9]+)', authMiddleware, adminMiddleware, IndicatorsListController.getOne);
router.post('/create', authMiddleware, adminMiddleware, IndicatorsListController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, IndicatorsListController.update);
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, IndicatorsListController.delete);

export default router;