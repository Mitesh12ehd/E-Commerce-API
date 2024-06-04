const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const { 
    createColorCtrl,
    getAllColorsCtrl,
    getSingleColorCtrl,
    updateColorCtrl,
    deleteColorCtrl 
} = require("../controllers/colorsCtrl.js");
const isAdmin = require("../middlewares/isAdmin.js");

const router = express.Router();

router.post("/", isLoggedIn, isAdmin, createColorCtrl);
router.get("/",getAllColorsCtrl);
router.get("/:id",getSingleColorCtrl);
router.delete("/:id",isLoggedIn, isAdmin, deleteColorCtrl);
router.put("/:id",isLoggedIn, isAdmin, updateColorCtrl);

module.exports = router;