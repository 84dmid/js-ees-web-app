import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import HandlerController from '../controllers/Handler.js';

const router = new express.Router();

router.get('/get_all', authMiddleware, adminMiddleware, HandlerController.getAll);
router.get('/get_one/:id([0-9]+)', authMiddleware, adminMiddleware, HandlerController.getOne);
router.post('/create', authMiddleware, adminMiddleware, HandlerController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, HandlerController.update);
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, HandlerController.delete);

export default router;