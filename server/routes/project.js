import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import ProjectController from '../controllers/Project.js';

const router = new express.Router();

router.get('/user/get_all', authMiddleware, ProjectController.userGetAll);
router.get('/user/get_one/:id([0-9]+)', authMiddleware, ProjectController.userGetOne);
router.post('/user/create', authMiddleware, ProjectController.userCreate);
router.delete('/user/delete/:id([0-9]+)', authMiddleware, ProjectController.userDelete);

router.get('/admin/get_all', authMiddleware, adminMiddleware, ProjectController.adminGetAll);
router.get('/admin/get_all/user/:id([0-9]+)', authMiddleware, adminMiddleware, ProjectController.adminGetUser);
router.get('/admin/get_one/:id([0-9]+)', authMiddleware, adminMiddleware, ProjectController.adminGetOne);
router.post('/admin/create', authMiddleware, adminMiddleware, ProjectController.adminCreate);
router.delete('/admin/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ProjectController.adminDelete);

export default router;