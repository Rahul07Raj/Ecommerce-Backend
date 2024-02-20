const express = require("express");
const { newOrder, myOrders } = require("../controllers/order");

const router = express.Router();

router.route("/new").post(newOrder);
router.route("/myOrders").get(myOrders);

module.exports = router;