const Coupon = require("../model/Coupon.js");

async function createCoupenCtrl(req,res){
    const {code,startDate,endDate,discount} = req.body;

    //check if coupon already exists
    const couponExists = await Coupon.findOne({code});
    if(couponExists){
        return res.json({
            message : "coupon alredy exist"
        })
    }

    //check if discount is a number 
    if(isNaN(discount) || discount < 0 || discount > 100){
        return res.json({
            message : "please provide meaningfull value"
        })
    }

    //validation
    if(endDate < Date.now()){
        return res.json({
            message : "invalid date"
        })
    }
    if(startDate < Date.now()){
        return res.json({
            message : "invalid date"
        })
    }
    if(startDate > endDate){
        return res.json({
            message : "invalid date"
        })
    }

    //create coupon
    const coupon = await Coupon.create({
        code : code?.toUpperCase(),
        startDate,
        endDate,
        discount,
        user:req.userAuthId
    });

    //send response
    return res.status(201).json({
        status:"success",
        message:"Coupon created successfully",
        coupon,
    })
}

async function getAllcouponsCtrl(req,res){
    const coupons = await Coupon.find();
    return res.status(200).json({
        status:"success",
        message:"All coupens",
        coupons,
    })
}

async function getCouponCtrl(req,res){
    const coupon = await Coupon.findById(req.params.id); //use instead
                                            // findOne({code: req.query.code})
    //check if is not found
    if (coupon === null) {
        return res.json({
            message : "coupon not found"
        })
    }
    //check if expired
    if (coupon.isExpired) {
        return res.json({
            message : "coupon is expired"
        })
    }
    return res.json({
        status:"success",
        message:"coupon fetched",
        coupon
    })
}

async function updateCouponCtrl(req,res){
    const {code,startDate,endDate,discount} = req.body;
    const coupon = await Coupon.findByIdAndUpdate(
        req.params.id,
        {
            code: code?.toUpperCase(),
            discount,
            startDate,
            endDate,
        },
        {
            new:true,
        }
    );
    return res.json({
        status:"success",
        message:"coupon updated",
        coupon,
    });
}

async function deleteCouponCtrl(req,res){
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    return res.json({
        status:"success",
        message:"coupon deleted",
        coupon,
    });
}

module.exports = {
    createCoupenCtrl,
    getAllcouponsCtrl,
    getCouponCtrl,
    updateCouponCtrl,
    deleteCouponCtrl
}