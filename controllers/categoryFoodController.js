import CategoryFood from "../models/CategoryFood";

const createCategory = async (req, res) => {

    try {
        const category = await CategoryFood.create({name: req.body.categoryName});
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
        const category = await CategoryFood.findOne({name: req.body.categoryName});
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
        await CategoryFood.findOneAndRemove({name: req.body.categoryName})
        await res.status(200).json({msg: "Food Category Deleted"})
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

export {createCategory, editCategory, deleteCategory};