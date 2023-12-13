import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import SurveyController from '../controllers/Survey.js';

const router = new express.Router();

router.get('/get_all', SurveyController.getAll);
router.get('/get_all/category/:categoryId([0-9]+)', SurveyController.getAll);
router.get(
    '/get_all/category/:categoryId([0-9]+)/subcategory/:subcategoryId([0-9]+)',
    SurveyController.getAll
);
router.get(
    '/get_all/categoryId/:categoryId([0-9]+)/subcategoryId/:subcategoryId([0-9]+)/objectTypeId/:objectTypeId([0-9]+)',
    SurveyController.getAll
);
router.get('/get_one/:id([0-9]+)', SurveyController.getOne);

router.post('/create', authMiddleware, adminMiddleware, SurveyController.create);
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SurveyController.update
);
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SurveyController.delete
);

export default router;
