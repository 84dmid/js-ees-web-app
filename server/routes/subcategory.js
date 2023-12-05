import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import SubcategoryController from '../controllers/Subcategory.js';

const router = new express.Router();

router.get('/get_all', SubcategoryController.getAll);
router.get('/get_one/:id([0-9]+)', SubcategoryController.getOne);
router.post('/create', authMiddleware, adminMiddleware, SubcategoryController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, SubcategoryController.update);
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, SubcategoryController.delete);

export default router;