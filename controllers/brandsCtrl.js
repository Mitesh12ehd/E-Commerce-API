const Brand = require("../model/Brand");

async function createBrandCtrl(req,res){
    const {name} = req.body;

    //check if brand already exist
    const brandFound = await Brand.findOne({name});
    if(brandFound){
        return res.json({
            message : "brand already exist"
        })
    }
    //create category
    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    return res.json({
        status:"success",
        message:"Brand created successfully",
        brand
    })
}

async function getAllBrandsCtrl(req,res){
    const brands = await Brand.find();

    return res.json({
        status:"success",
        message:"Brand fetched successfully",
        brands
    })
}

async function getSingleBrandCtrl(req,res){
    const brand = await Brand.findById(req.params.id);

    return res.json({
        status:"success",
        message:"Brand fetched successfully",
        brand
    })
}

async function updateBrandCtrl(req,res){
    const {name} = req.body;

    const brand = await Brand.findByIdAndUpdate(req.params.id,{
        name
    },
    {
        new:true 
    });

    return res.json({
        status:"success",
        message:"Brand updated successfully",
        brand
    })
}

async function deleteBrandCtrl(req,res){
    await Brand.findByIdAndDelete(req.params.id);
        
    return res.json({
        status:"success",
        message:"Brand deleted successfully",
    })
}

module.exports = {
    createBrandCtrl,
    getAllBrandsCtrl,
    getSingleBrandCtrl,
    updateBrandCtrl,
    deleteBrandCtrl
}