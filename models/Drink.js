import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DrinkSchema = new Schema({

    name: {type: String, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryDrink'
    },
    ingredients: {type: Array},
    pic: {type: String},
    picID: {type: String },
    // alert: {type: String},
    // cookTime: {type: Number},
    // price: {type: String},
    recipe: [{type: String}],
    ingredientsForRecipe: [
        {
            material: {type: String},
            amount: {type: String}
        }
    ],
    videoForRecipe: {type: String},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Drink = mongoose.model('Drink', DrinkSchema);
export default Drink;