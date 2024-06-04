const Category = require("../model/Category.js");
const Brand = require("../model/Brand.js");

const Product = require("../model/Product");

async function createProductCtrl(req,res){
    const {
        name,
        description,
        category,
        sizes,
        colors,
        price, 
        totalQty,
        brand   
    } = req.body;
    
    const convertedImgs = req.files.map(
        (file) => file?.path
    );
    
    //check if product already exist
    const productExists = await Product.findOne({name});
    if(productExists){
        return res.json({
            message : "product already exist"
        })
    }

    //find the brand
    const brandFound = await Brand.findOne({
        name: brand,
    })
    if(!brandFound){
        return res.json({
            message: "brand not found"
        })
    }

    //find the category
    const categoryFound = await Category.findOne({
        name:category
    })
    if(!categoryFound){
        return res.json({
            message : "category not found"
        })
    }
    
    //create the product
    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
        brand,
        images: convertedImgs
    })
    
    //push the product into category
    categoryFound.products.push(product._id);
    //resave
    await categoryFound.save();

    //push the product into brand
    brandFound.products.push(product._id);
    //resave
    await brandFound.save();

    return res.json({
        status:"success",
        message:"product created successfully",
        product
    })
}

async function getProductsCtrl(req,res){
    //query
    let productQuery = Product.find();

    //search by name
    if(req.query.name){
        productQuery = productQuery.find({
            name:{ $regex: req.query.name , $options:"i"}
        })
    }
    //filter by brand
    if(req.query.brand){
        productQuery = productQuery.find({
            brand:{ $regex: req.query.brand , $options:"i"}
        })
    }
    //filter by category
    if(req.query.category){
        productQuery = productQuery.find({
            category:{ $regex: req.query.category , $options:"i"}
        })
    }
    //filter by colors
    if(req.query.colors){
        productQuery = productQuery.find({
            colors:{ $regex: req.query.colors , $options:"i"}
        })
    }
    //filter by size
    if(req.query.sizes){
        productQuery = productQuery.find({
            sizes:{ $regex: req.query.sizes , $options:"i"}
        })
    }
    //filter by price range
    if(req.query.price){
        const priceRange = req.query.price.split("-");
        // gte = greater or equal
        // lte = less than or equal
        productQuery = productQuery.find({
            price: { $gte:priceRange[0] , $lte:priceRange[1]}
        })
    }

    //await the query
    const products= await productQuery.populate("reviews");

    return res.json({
        status:"success",
        message:"product fetched successfully",
        products
    })
}

async function getProductCtrl(req,res){
    const product = await Product.findById(req.params.id).populate({
        path: "reviews",
        populate:{
            path:"user",
            select:"fullname",
        }
    });
    if(!product){
        return res.json({
            message : "product not found"
        })
    }
    return res.json({
        status:"success",
        message:"product fetched successfully",
        product
    })
}

async function updateProductCtrl(req,res){
    const {
        name,
        description,
        category,
        sizes,
        colors,
        price,
        totalQty,
        brand
    } = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id,{
        name,
        description,
        category,
        sizes,
        colors, 
        user:req.userAuthId, 
        price,
        totalQty,
        brand
    },
    {
        new:true,
        runValidators: true
    })
    return res.json({
        status:"success",
        message:"product updated successfully",
        product
    });
}

async function deleteProductCtrl(req,res){
    await Product.findByIdAndDelete(req.params.id);
    return res.json({
        status:"success",
        message:"product deleted successfully",
    })
}

module.exports = {
    createProductCtrl,
    getProductsCtrl,
    getProductCtrl,
    updateProductCtrl,
    deleteProductCtrl
} 