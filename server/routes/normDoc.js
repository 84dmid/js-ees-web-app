import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import NormDocController from '../controllers/NormDoc.js';

const router = new express.Router();

router.get('/get_all', authMiddleware, adminMiddleware, NormDocController.getAll);
router.get('/get_one/:id([0-9]+)', authMiddleware, adminMiddleware, NormDocController.getOne);
router.post('/create', authMiddleware, adminMiddleware, NormDocController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, NormDocController.update);
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, NormDocController.delete);

export default router;