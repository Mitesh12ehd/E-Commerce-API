const {generateToken, verifyToken} = require("../utils/tokenProcessing");

async function isLoggedIn(req,res,next){
    //get user by verifying token
    const user = verifyToken(req);

    if(!user){
        return res.json({
            message : "please login first"
        })
    }

    //store user id into request object so that we can extract current user 
    //whenerer accessing protected route
    req.userAuthId = user?._id;

    next();
}

module.exports = isLoggedIn;