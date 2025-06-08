import Cocktail from "../models/Cocktail";
import {v2 as cloudinary} from 'cloudinary';

const createCocktail = async (req, res) => {

    try {
        const cocktail = await Cocktail.create({
            name: req.body.name,
            category: req.body.category,
            ingredients: req.body.ingredients
        });

        // if (req.body.alert) {
        //     const alertCocktail = await req.body.alert
        //     cocktail.alert = await alertCocktail;
        // }
        
        // if (req.body.prepareTime) {
        //     const prepareTimeCocktail = await req.body.prepareTime
        //     cocktail.prepareTime = await prepareTimeCocktail;
        // }

        const picData = await cloudinary.uploader.upload(file, {
            use_filename: true,
            folder: "sekoretti"
        })
        cocktail.pic = await picData.secure_url
        cocktail.picID = await picData.public_id

        await cocktail.save();

        await console.log("Cocktail Created")
        await res.status(201).json(cocktail)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            msg: error.message
        })
    }
}

const getCocktails = async (req, res) => {

    try {
        const cocktails = await Cocktail.find().sort('-createdAt');
        res.status(200).json(cocktails)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            msg: error.message
        })
    }
}

const getCocktail = async (req, res) => {

    try {
        const cocktail = await Cocktail.findOne({slug: req.params.slug})

        res.status(200).json(cocktail)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            msg: error.message
        })
    }
}

const editCocktail = async (req, res) => {

    try {

        const {name, category, ingredients, file, videoLink, prepareTime, price, alert} = req.body;

        const cocktail = await Cocktail.findOne({slug: req.params.slug})

        cocktail.name = await name;
        cocktail.category = await category;
        cocktail.ingredients = await ingredients;

        if (videoLink) {cocktail.videoForRecipe = await videoLink;}  

        if (file) {
            const picId = await cocktail.picID;
            await cloudinary.uploader.destroy(picId);

            const picData = await cloudinary.uploader.upload(file, {
                use_filename: true,
                folder: "sekoretti"
            })
    
            cocktail.pic = await picData.secure_url
            cocktail.picID = await picData.public_id
        }

        await cocktail.save();

        console.log("Cocktail Edited")
        await res.status(200).json({msg: "Cocktail Edited"});

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            msg: error.message
        })
    }
}

const addIngredientsMaterial = async (req, res) => {

    const {material, amount} = req.body;

    try {        

        const cocktail = await Cocktail.findOne({slug: req.params.slug})
        await cocktail.ingredientsForRecipe.push({
                            material: material,
                            amount: amount
                        });
        await cocktail.save();

        console.log("Cocktail Ingredient Added")
        await res.status(200).json({msg: "Cocktail Ingredient Added"});

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            msg: error.message
        })
    }
}

const deleteIngredientsMaterial = async (req, res) => {

    try {        

        const cocktail = await Cocktail.findOne({slug: req.params.slug})
        await cocktail.ingredientsForRecipe.pop();
        await cocktail.save();

        console.log("Cocktail Ingredient Deleted");
        await res.status(200).json({msg: "Cocktail Ingredient Deleted"});

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            msg: error.message
        })
    }
}

const addRecipeStep = async (req, res) => {

    const step = req.body.recipeStep;

    try {        

        const cocktail = await Cocktail.findOne({slug: req.params.slug})
        await cocktail.recipe.push(step);
        await cocktail.save();

        console.log("Cocktail Recipe Step Added")
        await res.status(200).json({msg: "Cocktail Recipe Step Added"})   

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            msg: error.message
        })
    }
}

const deleteRecipeStep = async (req, res) => {

    try {        

        const cocktail = await Cocktail.findOne({slug: req.params.slug})
        await cocktail.recipe.pop();
        await cocktail.save();

        console.log("Cocktail Recipe Step Deleted")
        await res.status(200).json({msg: "Cocktail Recipe Step Deleted"})        

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            msg: error.message
        })
    }
}

const deleteCocktail = async (req, res) => {

    try {

        const {id} = req.params;

        // Delete Cloudinary Image
        const cocktail = await Cocktail.findOne({slug: req.params.slug})
        const picID = await cocktail.picID;
        await cloudinary.uploader.destroy(picID);

        // Delete Cocktail
        await Cocktail.deleteOne({_id: id})

        console.log("Cocktail Deleted")
        await res.status(200).json({msg: "Cocktail Deleted"})

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            msg: error.message
        })
    }
}

export {
    createCocktail,
    getCocktails,
    getCocktail,
    editCocktail,
    addIngredientsMaterial,
    deleteIngredientsMaterial,
    addRecipeStep,
    deleteRecipeStep,
    deleteCocktail
};