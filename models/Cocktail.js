import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CocktailSchema = new Schema({

    name: {type: String, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryDrink'
    },
    ingredients: {type: Array},
    pic: {type: String},
    picID: {type: String },
    ingredientsForRecipe: [
        {   
            material: String,
            amount: String
        }
    ],
    recipe: [String],
    videoForRecipe: {type: String},
    // prepareTime: {type: Number},
    // price: {type: Number},
    // alert: {type: String},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;