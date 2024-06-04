const Product = require("../model/Product.js");
const Review = require("../model/Review.js");

async function createReviewCtrl(req,res){
    const {message,rating} = req.body;
        
    //find the product
    const {productID} = req.params;
    const productFound = await Product.findById(productID).populate("reviews");
    if(!productFound){
        return res.json({
            message : "product not found"
        })
    }

    //check if user already reviews this product
    const hasReviewed = productFound?.reviews?.find( (review) => {
        return review?.user?.toString() === req?.userAuthId?.toString();
    } );
    if(hasReviewed){
        return res.json({
            message : "you have already reviewed this product"
        })
    }

    //create review
    const review = await Review.create({
        message,
        rating,
        product : productFound?._id,
        user : req.userAuthId
    })

    //push review into product model
    productFound.reviews.push(review?._id);

    //resave
    await productFound.save();

    //return response
    return res.json({
        success:true,
        message: "review created successfully"
    })
}

module.exports = {createReviewCtrl};