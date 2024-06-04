const express = require("express");
const { 
    createCategoryCtrl,
    getAllCategoriesCtrl, 
    getSingleCategoryCtrl, 
    updateCategoryCtrl, 
    deleteCategoryCtrl 
} = require("../controllers/categoriesCtrl.js");
const isLoggedIn = require("../middlewares/isLoggedIn");
const fileUpload = require("../utils/fileUpload.js");
const isAdmin = require("../middlewares/isAdmin.js");

const router = express.Router();

router.post("/", isLoggedIn, isAdmin, fileUpload.single("file"), createCategoryCtrl);
router.get("/",getAllCategoriesCtrl);
router.get("/:id",getSingleCategoryCtrl);
router.delete("/:id", isLoggedIn, isAdmin, deleteCategoryCtrl);
router.put("/:id", isLoggedIn, isAdmin, updateCategoryCtrl);

module.exports = router;