import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import UnitController from '../controllers/Unit.js';

const router = new express.Router();

router.get('/get_all', authMiddleware, adminMiddleware, UnitController.getAll);
router.get(
    '/get_one/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    UnitController.getOne
);
router.post('/create', authMiddleware, adminMiddleware, UnitController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, UnitController.update);
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    UnitController.delete
);

export default router;
