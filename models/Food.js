import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FoodSchema = new Schema({

    name: {type: String},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryFood'
    },
    ingredients: [
        {type: String}
    ],
    pic: {type: String},
    picID: {type: String },
    alert: {type: String},
    recipe: { type: String},
    ingredientsForRecipe: [
        {
            name: {
                type: String
            },
            count: {
                type: String
            }
        }
    ],
    cookTime: {type: Number},
    price: {type: String},
    history: {type: String},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Food = mongoose.model('Food', FoodSchema);
export default Food;