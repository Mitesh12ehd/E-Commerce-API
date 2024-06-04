const express = require("express");
const { 
    registerUserCtrl,
    loginUserCtrl, 
    getUserProfileCtrl, 
    updateShippingAddresCtrl
} = require("../controllers/userCtrl");

const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.post("/register",registerUserCtrl);
router.post("/login",loginUserCtrl);
router.get("/profile",isLoggedIn,getUserProfileCtrl);
router.put("/update/shipping",isLoggedIn,updateShippingAddresCtrl);

module.exports = router;