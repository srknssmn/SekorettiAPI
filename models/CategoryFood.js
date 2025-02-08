import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import slugify from 'slugify';

const CategoryFoodSchema = new Schema({
    
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

CategoryFoodSchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    })
    next();
})

const CategoryFood = mongoose.model('CategoryFood', CategoryFoodSchema);
export default CategoryFood;