import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import ObjectTypeController from '../controllers/ObjectType.js';

const router = new express.Router();

router.get('/get_all', authMiddleware, adminMiddleware, ObjectTypeController.getAll);
router.get('/get_one/:id([0-9]+)', authMiddleware, adminMiddleware, ObjectTypeController.getOne);
router.post('/create', authMiddleware, adminMiddleware, ObjectTypeController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, ObjectTypeController.update);
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ObjectTypeController.delete);

export default router;