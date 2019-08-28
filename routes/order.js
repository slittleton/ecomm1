const express = require("express");
const router = express.Router();
const { checkAuth, checkAdmin } = require("../controllers/auth");
const { decreaseQuantity } = require("../controllers/product");
const {
  userById,
  userOrders,
  addToUserOrderHistory
} = require("../controllers/user");
const { orderById, createOrder, getOrdersList, getOrderStatusList, updateOrderStatus } = require("../controllers/order");

router.post(
  "/order/create",
  checkAuth,
  userById,
  addToUserOrderHistory,
  // decreaseQuantity, //////// TODO ////////decrease inventory quantity and increase sold number
  createOrder
);
router.get("/orders", checkAuth, checkAdmin, 
getOrdersList
)
router.get("/orders/user", checkAuth, userOrders);
router.get("/order/statuslist", checkAuth, getOrderStatusList);

router.put("/order/:orderId/status", checkAuth, checkAdmin, 
updateOrderStatus
)


router.param("orderId", orderById);

module.exports = router;
