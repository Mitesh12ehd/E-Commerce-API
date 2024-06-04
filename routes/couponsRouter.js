const express = require("express");
const { 
    createCoupenCtrl, 
    deleteCouponCtrl, 
    getAllcouponsCtrl, 
    getCouponCtrl, 
    updateCouponCtrl 
} = require("../controllers/couponsCtrl.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const isAdmin = require("../middlewares/isAdmin.js");

const router = express.Router();

router.post("/",isLoggedIn, isAdmin, createCoupenCtrl);
router.get("/",getAllcouponsCtrl);
router.get("/:id",getCouponCtrl);
router.put("/update/:id",isLoggedIn, isAdmin, updateCouponCtrl);
router.delete("/delete/:id",isLoggedIn, isAdmin, deleteCouponCtrl);

module.exports = router;