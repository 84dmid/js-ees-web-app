import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import JustificationController from '../controllers/Justification.js';

const router = new express.Router();

router.get('/get_all', authMiddleware, adminMiddleware, JustificationController.getAll);
router.get('/get_one/:id([0-9]+)', authMiddleware, adminMiddleware, JustificationController.getOne);
router.post('/create', authMiddleware, adminMiddleware, JustificationController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, JustificationController.update);
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, JustificationController.delete);

export default router;