import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import SurveyScenarioController from '../controllers/SurveyScenario.js';

const router = new express.Router();

router.get('/get_all', SurveyScenarioController.getAll);
router.get('/get_one/:id([0-9]+)', SurveyScenarioController.getOne);
router.post('/create', authMiddleware, adminMiddleware, SurveyScenarioController.create);
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SurveyScenarioController.update
);
router.put(
    '/move_up/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SurveyScenarioController.moveUp
);
router.put(
    '/move_down/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SurveyScenarioController.moveDown
);
router.put(
    '/:id([0-9]+)/append/variant/:variantId([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SurveyScenarioController.append
);
router.put(
    '/:id([0-9]+)/remove/variant/:variantId([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SurveyScenarioController.remove
);
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    SurveyScenarioController.delete
);

export default router;
