const express = require("express");
const router = express.Router();
const { checkAuth, checkAdmin } = require("../controllers/auth");
const { decreaseQuantity } = require("../controllers/product");
const {
  userById,
  userOrders,
  addToUserOrderHistory
} = require("../controllers/user");

const { orderById, createOrder } = require("../controllers/order");

router.post(
  "/order/create",
  checkAuth,
  // addToUserOrderHistory,
  // decreaseQuantity,
  createOrder
);

router.param("orderId", orderById);

module.exports = router;
