import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import Competence from '../controllers/Competence.js';

const router = new express.Router();

router.get('/get_all', Competence.getAll);
router.get('/get_one/:id', Competence.getOne);
router.post('/create', authMiddleware, adminMiddleware, Competence.create);
router.put('/update/:id', authMiddleware, adminMiddleware, Competence.update);
router.put('/move_up/:id', authMiddleware, adminMiddleware, Competence.moveUp);
router.put('/move_down/:id', authMiddleware, adminMiddleware, Competence.moveDown);
router.delete('/delete/:id', authMiddleware, adminMiddleware, Competence.delete);

export default router;
