const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

function generateToken(user){
    const payload = {
        _id : user._id,
        email : user.email
    }
    const token = jwt.sign(payload,SECRET);
    return token;
}

function verifyToken(req){
    //get token from header
    const token = req?.headers?.authorization?.split(" ")[1];
    if(token === undefined){
        return "No token found in header"
    }

    const user = jwt.verify(token,SECRET);
    return user;
}

module.exports = {generateToken, verifyToken};