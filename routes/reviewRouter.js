const express = require("express");
const { createReviewCtrl } = require("../controllers/reviewsCtrl.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");

const router = express.Router();

router.post("/:productID",isLoggedIn,createReviewCtrl);

module.exports = router;