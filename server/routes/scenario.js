import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import ScenarioController from '../controllers/Scenario.js';

const router = new express.Router();

router.get('/get_all', ScenarioController.getAll);
router.get('/get_one/:id([0-9]+)', ScenarioController.getOne);
router.post('/create', authMiddleware, adminMiddleware, ScenarioController.create);
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ScenarioController.update
);
router.put(
    '/move_up/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ScenarioController.moveUp
);
router.put(
    '/move_down/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ScenarioController.moveDown
);
router.put(
    '/:id([0-9]+)/append/variant/:variantId([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ScenarioController.append
);
router.put(
    '/:id([0-9]+)/remove/variant/:variantId([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ScenarioController.remove
);
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ScenarioController.delete
);

export default router;
