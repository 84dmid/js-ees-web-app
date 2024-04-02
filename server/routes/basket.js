import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import BasketController from '../controllers/Basket.js';

const router = new express.Router();

router.get('/get_one', BasketController.getOne);
router.get(
    '/get_link/:id([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})',
    BasketController.getLink
);
router.put('/create_link', BasketController.createLink);
router.put('/params', BasketController.updateProjectParams);
router.put(
    '/variant/:variantId([0-9]+)/append/:quantity([0-9.]+)',
    BasketController.append
);
router.put('/append/variants', BasketController.appendVariantsList);
router.put(
    '/variant/:variantId([0-9]+)/update/:quantity([0-9.]+)',
    BasketController.update
);
router.put('/variant/:variantId([0-9]+)/remove', BasketController.remove);
router.put('/clear', BasketController.clear);
router.delete('/delete', authMiddleware, adminMiddleware, BasketController.delete);

export default router;
