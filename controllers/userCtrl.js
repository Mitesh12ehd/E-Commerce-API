const User = require("../model/User.js");
const bcrypt = require("bcrypt");
const {generateToken, verifyToken} = require("../utils/tokenProcessing");

async function registerUserCtrl(req,res){
    const {fullname, email, password} = req.body;
    
    //check if user is already exist
    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error("user already exist");
    }
    
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    
    //create the user
    const user = await User.create({
        fullname,
        email,
        password : hashedPassword,
    });
    
    return res.json({
        status:'success',
        message:"user registered succesfully",
        data: user,
    });
}

async function loginUserCtrl(req,res){
    const {email,password} = req.body;
    const userfound = await User.findOne({email});

    if( userfound && await bcrypt.compare(password , userfound?.password)){
        return res.json({
            status: "success",
            msg: "user logged in successfully",
            userfound,
            token: generateToken(userfound)
        })
    }
    else{
        return res.json({
            message:"invalid login credentials"
        })
    }
}

async function getUserProfileCtrl(req,res){
    console.log(req.userAuthId);
    //find the user
    const user = await User.findById(req.userAuthId).populate("orders");

    return res.json({
        status:"success",
        message:"user profile fetched successfully",
        user
    })
}

async function updateShippingAddresCtrl(req,res){
    const {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        phone,
        country,
    } = req.body;
    
    const user = await User.findByIdAndUpdate(
        req.userAuthId ,
        {
            shippingAddress : {
                firstName,
                lastName,
                address,
                city,
                postalCode,
                province,
                phone,
                country,
            },
            hasShippingAddress:true,
        },
        {
            new:true,
        }
    );
    
    return res.json({
        status:"success",
        message:"user shipping address updated successfully",
        user
    })
}

module.exports = {
    registerUserCtrl,
    loginUserCtrl,
    getUserProfileCtrl,
    updateShippingAddresCtrl
}