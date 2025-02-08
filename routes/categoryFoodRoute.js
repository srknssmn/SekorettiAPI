import express from 'express';
const router = express.Router();

import * as categoryFoodController from '../controllers/categoryFoodController.js';
// import adminMiddleware from '../middlewares/adminMiddleware.js';

router.route('/').post(categoryFoodController.createCategory);
router.route('/deletecategory').post(categoryFoodController.deleteCategory);
router.route('/editcategory').post(categoryFoodController.editCategory);

export default router;