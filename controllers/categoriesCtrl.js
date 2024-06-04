const Category = require("../model/Category.js");

async function createCategoryCtrl(req,res){
    const {name} = req.body;

    //check if category already exist
    const categoryFound = await Category.findOne({name});
    if(categoryFound){
        return res.json({
            message: "category already exist"
        });
    }

    //create category
    const category = await Category.create({
        name: name?.toLowerCase(),
        user: req.userAuthId,
        // image: req?.file?.path,
    });

    return res.json({
        status:"success",
        message:"Category created successfully",
        category
    })
}

async function getAllCategoriesCtrl(req,res){
    const categories = await Category.find();

    return res.json({
        status:"success",
        message:"Category fetched successfully",
        categories
    })
}

async function getSingleCategoryCtrl(req,res){
    const category = await Category.findById(req.params.id);

    return res.json({
        status:"success",
        message:"Category fetched successfully",
        category
    })
}

async function updateCategoryCtrl(req,res){
    const {name} = req.body;

    const category = await Category.findByIdAndUpdate(req.params.id,
    {
        name
    },
    {
        new:true 
    });

    return res.json({
        status:"success",
        message:"category updated successfully",
        category
    })
}

async function deleteCategoryCtrl(req,res){
    await Category.findByIdAndDelete(req.params.id);
    
    return res.json({
        status:"success",
        message:"category deleted successfully",
    })
}

module.exports = {
    createCategoryCtrl,
    getAllCategoriesCtrl,
    getSingleCategoryCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl
}