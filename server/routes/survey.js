import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import SurveyController from '../controllers/Survey.js';

const router = new express.Router();

router.get('/get_all', SurveyController.getAll);
router.get('/get_one/:id([0-9]+)', SurveyController.getOne);

router.post('/create', authMiddleware, adminMiddleware, SurveyController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, SurveyController.update);
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, SurveyController.delete);

export default router;