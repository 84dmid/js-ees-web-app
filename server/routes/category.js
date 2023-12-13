import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import CategoryController from '../controllers/Category.js';

const router = new express.Router();

router.get('/get_all', CategoryController.getAll);
router.get('/get_inclusion', CategoryController.getInclusion);
router.get('/get_one/:id([0-9]+)', CategoryController.getOne);

router.post('/create', authMiddleware, adminMiddleware, CategoryController.create);
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    CategoryController.update
);
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    CategoryController.delete
);

export default router;
