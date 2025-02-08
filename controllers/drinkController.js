import Drink from "../models/Drink";
import {v2 as cloudinary} from 'cloudinary';

const createDrink = async (req, res) => {

    try {
        const drink = await Drink.create({
            name: req.body.name,
            category: req.body.category,
            ingredients: req.body.ingredients
        });

        if (req.body.alert) {
            const alertDrink = await req.body.alert
            drink.alert = await alertDrink;
        }
        
        if (req.body.cookTime) {
            const cookTimeDrink = await req.body.cookTime
            drink.cookTime = await cookTimeDrink;
        }

        const picData = await cloudinary.uploader.upload(file, {
            use_filename: true,
            folder: "sekoretti"
        })
        drink.pic = await picData.secure_url
        drink.picID = await picData.public_id

        await drink.save();

        await console.log("IT'S OK")
        await res.status(201).json(drink)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            msg: error.message
        })
    }
}

const deleteDrink = async (req, res) => {
    try {

        const {id} = req.params;

        // Delete Cloudinary Image
        const drink = await Drink.findOne({_id: id})
        const picID = await drink.picID;
        await cloudinary.uploader.destroy(picID);

        // Delete Drink
        await Drink.deleteOne({_id: id})

        await res.status(200).json({msg: "Drink Deleted"})

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            msg: error.message
        })
    }
}

export {
    createDrink,
    deleteDrink
};