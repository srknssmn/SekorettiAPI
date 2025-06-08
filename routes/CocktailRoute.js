import express from 'express';
const router = express.Router();

import * as cocktailController from '../controllers/cocktailController.js';

router.route('/').post(cocktailController.createCocktail);
router.route('/').get(cocktailController.getCocktails);
router.route('/:slug').get(cocktailController.getCocktail);

router.route('/editCocktail/:slug').patch(cocktailController.editCocktail);
router.route('/addIngredientsMaterial/:slug').patch(cocktailController.addIngredientsMaterial);
router.route('/deleteIngredientsMaterial/:slug').patch(cocktailController.deleteIngredientsMaterial);
router.route('/addRecipeStep/:slug').patch(cocktailController.addRecipeStep);
router.route('/deleteRecipeStep/:slug').patch(cocktailController.deleteRecipeStep);
router.route('/deleteCocktail/:slug').delete(cocktailController.deleteCocktail);

export default router;