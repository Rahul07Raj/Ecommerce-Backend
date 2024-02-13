const express = require("express");
const { newOrder } = require("../controllers/order");

const router = express.Router();

router.route("/new").post(newOrder);

module.exports = router;