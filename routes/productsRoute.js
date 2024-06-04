const express = require("express");

const {
    createProductCtrl,
    getProductsCtrl,
    getProductCtrl,
    updateProductCtrl,
    deleteProductCtrl
} =  require("../controllers/productsCtrl");
const isLoggedIn = require("../middlewares/isLoggedIn");
const fileUpload = require("../utils/fileUpload");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.post("/",isLoggedIn, isAdmin, fileUpload.array('files'), createProductCtrl);
router.get("/", getProductsCtrl);
router.get("/:id",getProductCtrl);
router.put("/:id",isLoggedIn, isAdmin , updateProductCtrl);
router.delete("/:id/delete",isLoggedIn, isAdmin, deleteProductCtrl);

module.exports = router;