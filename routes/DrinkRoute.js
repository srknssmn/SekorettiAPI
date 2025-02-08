import express from 'express';
const router = express.Router();

import * as drinkController from '../controllers/drinkController.js';

router.route('/').post(drinkController.createDrink);
router.route('/deletedrink/:id').delete(drinkController.deleteDrink);

export default router;