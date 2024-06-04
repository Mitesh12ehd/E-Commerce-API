const Color = require("../model/Color.js");

async function createColorCtrl(req,res){
    const {name} = req.body;

    //check if color already exist
    const colorFound = await Color.findOne({name});
    if(colorFound){
        return res.json({
            message : "color already exist"
        })
    }

    //create category
    const color = await Color.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    return res.json({
        status:"success",
        message:"Color created successfully",
        color
    })
}

async function getAllColorsCtrl(req,res){
    const colors = await Color.find();

    return res.json({
        status:"success",
        message:"Color fetched successfully",
        colors
    })
}

async function getSingleColorCtrl(req,res){
    const color = await Color.findById(req.params.id);

    return res.json({
        status:"success",
        message:"Color fetched successfully",
        color
    })
}

async function updateColorCtrl(req,res){
    const {name} = req.body;

    const color = await Color.findByIdAndUpdate(req.params.id,
    {
        name
    },
    {
        new:true 
    });

    return res.json({
        status:"success",
        message:"Color updated successfully",
        color
    })
}

async function deleteColorCtrl(req,res){
    await Color.findByIdAndDelete(req.params.id);

    return res.json({
        status:"success",
        message:"Color deleted successfully",
    })
}

module.exports = {
    createColorCtrl,
    getAllColorsCtrl,
    getSingleColorCtrl,
    updateColorCtrl,
    deleteColorCtrl
}