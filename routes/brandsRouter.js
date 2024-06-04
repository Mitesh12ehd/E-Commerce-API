const express = require("express");

const isAdmin = require("../middlewares/isAdmin.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");

const { 
    createBrandCtrl , 
    getAllBrandsCtrl, 
    getSingleBrandCtrl, 
    updateBrandCtrl, 
    deleteBrandCtrl
} = require("../controllers/brandsCtrl.js");

const router = express.Router();

router.post("/",isLoggedIn,isAdmin,createBrandCtrl);
router.get("/",getAllBrandsCtrl);
router.get("/:id", getSingleBrandCtrl);
router.delete("/:id",isLoggedIn,isAdmin,deleteBrandCtrl);
router.put("/:id",isLoggedIn,isAdmin,updateBrandCtrl);

module.exports = router;