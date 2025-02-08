import express from 'express';
const router = express.Router();

import * as categoryDrinkController from '../controllers/categoryDrinkController.js';
// import adminMiddleware from '../middlewares/adminMiddleware.js';

router.route('/').post(categoryDrinkController.createCategory);
router.route('/deletecategory').post(categoryDrinkController.deleteCategory);
router.route('/editcategory').post(categoryDrinkController.editCategory);

export default router;