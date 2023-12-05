// сейчас модуль не используется, оставлен на будущее, если надо будет обновлять состав проекта.

import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import ProjectSurveyController from '../controllers/ProjectSurvey.js';

const router = new express.Router();

router.get('/admin/project/:projectId([0-9]+)/get_all', ProjectSurveyController.adminGetAll);
router.get('/admin/project/:projectId([0-9]+)/get_one/:id([0-9]+)', ProjectSurveyController.adminGetOne);
router.post('/create', authMiddleware, adminMiddleware, ProjectSurveyController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, ProjectSurveyController.update);
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ProjectSurveyController.delete);

export default router;