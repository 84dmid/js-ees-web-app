import express from 'express';

import basket from './basket.js';
import category from './category.js'
import handler from './handler.js'
import justification from './justification.js'
import normDoc from './normDoc.js'
import objectType from './objectType.js';
import project from './project.js';
// import projectSurvey from './projectSurvey.js'; // на будущее
import subcategory from './subcategory.js';
import survey from './survey.js';
import unit from './unit.js';
import user from './user.js';
import variant from './variant.js';

const router = new express.Router();

router.use('/basket', basket);
router.use('/category', category);
router.use('/handler', handler);
router.use('/justification', justification);
router.use('/norm_doc', normDoc);
router.use('/object_type', objectType);
router.use('/project', project);
// router.use('/project_survey', projectSurvey); // на будущее
router.use('/subcategory', subcategory);
router.use('/survey', survey);
router.use('/unit', unit);
router.use('/user', user);
router.use('/variant', variant);

export default router;