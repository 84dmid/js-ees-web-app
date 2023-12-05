import express from 'express';

import BasketController from '../controllers/basket.js';

const router = new express.Router();

router.get('/get_one', BasketController.getOne);
router.put('/variant/:variantId([0-9])/append/:quantity([0-9]+)', BasketController.append);
router.put('/variant/:variantId([0-9])/remove', BasketController.remove);
router.put('/clear', BasketController.clear);
router.delete('/delete', BasketController.delete);

export default router;