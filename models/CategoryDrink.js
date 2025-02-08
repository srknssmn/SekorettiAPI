import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import slugify from 'slugify';

const CategoryDrinkSchema = new Schema({
    
    name: {
        type: String,
        unique: true,
        required: true
    },

    slug: {
        type: String,
        unique: true
    }
})

CategoryDrinkSchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    })
    next();
})

const CategoryDrink = mongoose.model('CategoryDrink', CategoryDrinkSchema);
export default CategoryDrink;