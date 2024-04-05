import express from 'express';

import basket from './basket.js';
import category from './category.js';
import subcategory from './subcategory.js';
import survey from './survey.js';
import user from './user.js';
import variant from './variant.js';
import scenario from './scenario.js';
import region from './region.js';
import competence from './competence.js';

const router = new express.Router();

router.use('/basket', basket);
router.use('/category', category);
router.use('/subcategory', subcategory);
router.use('/survey', survey);
router.use('/user', user);
router.use('/variant', variant);
router.use('/scenario', scenario);
router.use('/region', region);
router.use('/competence', competence);

export default router;
