const User = require("../model/User");

async function isAdmin(req,res,next){
    //find the login user
    const user = await User.findById(req.userAuthId);
    //check if admin
    if (user?.isAdmin) {
        next();
    }
    else {
        return res.json({
            message : "Access denied, admin only"
        })
    }
}

module.exports = isAdmin;