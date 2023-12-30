import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import CategoryController from '../controllers/Category.js';

const router = new express.Router();

router.get('/get_all', CategoryController.getAll);
router.get('/content', CategoryController.getContent);
router.get('/get_one/:id([0-9]+)', CategoryController.getOne);

router.get(
    '/full_content',
    authMiddleware,
    adminMiddleware,
    CategoryController.getFullContent
); // удалить
router.post('/create', authMiddleware, adminMiddleware, CategoryController.create);
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    CategoryController.update
);
router.put(
    '/move_up/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    CategoryController.moveUp
);
router.put(
    '/move_down/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    CategoryController.moveDown
);
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    CategoryController.delete
);

export default router;
