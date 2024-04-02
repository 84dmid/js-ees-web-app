import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import RegionController from '../controllers/Region.js';

const router = new express.Router();

router.get('/get_all', RegionController.getAll);
router.get('/get_one/:id([0-9]+)', RegionController.getOne);
router.post('/create', authMiddleware, adminMiddleware, RegionController.create);
router.post(
    '/create_several',
    authMiddleware,
    adminMiddleware,
    RegionController.createSeveral
);
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    RegionController.update
);
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    RegionController.delete
);

export default router;
