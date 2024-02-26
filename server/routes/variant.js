import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

import VariantController from '../controllers/Variant.js';
import VariantPropController from '../controllers/VariantProp.js';

const router = new express.Router();

router.get('/get_all', VariantController.getAll);
router.get('/get_all_by_ids', VariantController.getAllByIds);
router.get('/get_one/:id([0-9]+)', VariantController.getOne);

router.post('/create', authMiddleware, adminMiddleware, VariantController.create);
router.put(
    '/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    VariantController.update
);
router.put(
    '/move_up/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    VariantController.moveUp
);
router.put(
    '/move_down/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    VariantController.moveDown
);
router.delete(
    '/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    VariantController.delete
);

router.get('/:variantId([0-9]+)/property/get_all', VariantPropController.getAll);
router.get(
    '/:variantId([0-9]+)/property/get_one/:id([0-9]+)',
    VariantPropController.getOne
);

router.post(
    '/:variantId([0-9]+)/property/create',
    authMiddleware,
    adminMiddleware,
    VariantPropController.create
);
router.put(
    '/:variantId([0-9]+)/property/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    VariantPropController.update
);
router.put(
    '/:variantId([0-9]+)/property/move_up/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    VariantPropController.moveUp
);
router.put(
    '/:variantId([0-9]+)/property/move_down/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    VariantPropController.moveDown
);
router.delete(
    '/:variantId([0-9]+)/property/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    VariantPropController.delete
);

export default router;
