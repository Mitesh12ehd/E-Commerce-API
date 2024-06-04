const express = require("express");
const { 
    createOrderCtrl, 
    getAllordersCtrl,
    getSingleOrderCtrl,
    updateOrderCtrl,
    getStateticsCtrl} = require("../controllers/orderCtrl.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const isAdmin = require("../middlewares/isAdmin.js");

const router = express.Router();

router.post("/",isLoggedIn,createOrderCtrl);
router.get("/",isLoggedIn,getAllordersCtrl);
router.get("/:id",isLoggedIn,getSingleOrderCtrl);
router.put("/update/:id",isLoggedIn,isAdmin,updateOrderCtrl);
router.get("/sales/stats",isLoggedIn,getStateticsCtrl);

module.exports = router;  