const express = require("express");
const { newOrder, myOrders, allOrders, getOrderById, deleteOrderById, processOrder } = require("../controllers/order");
const { isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.route("/new").post(newOrder);
router.route("/myOrders").get(myOrders);
router.route("/all").get(allOrders);
router.route("/:id").get(getOrderById);
router.route("/:id").delete(deleteOrderById);
router.route("/:id").put(processOrder);

module.exports = router;