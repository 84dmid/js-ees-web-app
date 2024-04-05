import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import UserController from '../controllers/User.js';

const router = new express.Router();

router.post('/temp_sign_up', UserController.tempSignUp);
router.post('/sign_up', UserController.signUp);
router.post('/login', UserController.login);

router.get('/check', authMiddleware, UserController.check);

// router.get('/competence/get_all',authMiddleware, UserController.check);

router.get('/get_all', authMiddleware, adminMiddleware, UserController.getAll);
router.get(
    '/get_one/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    UserController.getOne
);
router.post('/create', authMiddleware, adminMiddleware, UserController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.update);
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    UserController.delete
);

export default router;
