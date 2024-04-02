import express from 'express';

import basket from './basket.js';
import category from './category.js';
// import handler from './handler.js';
import project from './project.js';
// import projectSurvey from './projectSurvey.js'; // на будущее
import subcategory from './subcategory.js';
import survey from './survey.js';
import user from './user.js';
import variant from './variant.js';
import scenario from './scenario.js';
import region from './region.js';

const router = new express.Router();

router.use('/basket', basket);
router.use('/category', category);
// router.use('/handler', handler);
router.use('/project', project);
// router.use('/project_survey', projectSurvey); // на будущее
router.use('/subcategory', subcategory);
router.use('/survey', survey);
router.use('/user', user);
router.use('/variant', variant);
router.use('/scenario', scenario);
router.use('/region', region);

export default router;
