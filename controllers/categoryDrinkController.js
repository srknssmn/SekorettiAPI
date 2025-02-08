import CategoryDrink from '../models/CategoryDrink.js';

const createCategory = async (req, res) => {

    try {
        const category = await CategoryDrink.create({name: req.body.categoryName});
        await res.status(201).json(category);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

const editCategory = async (req, res) => {
    try {
        const category = await CategoryDrink.findOne({name: req.body.categoryName});
        category.name = await req.body.name;
        category.save();
        await res.status(201).json(category)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        await CategoryDrink.findOneAndRemove({name: req.body.categoryName})
        await res.status(200).json({msg: "Drink Category Deleted"})
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

export {createCategory, editCategory, deleteCategory};