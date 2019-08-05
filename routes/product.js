const express = require("express");
const router = express.Router();
const { checkAuth, checkAdmin } = require("../controllers/auth");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  productById
} = require("../controllers/product");

router.get("/product/:productId");
router.post("/product/create", checkAuth, checkAdmin, createProduct);
router.delete(
  "/product/delete/:productId",
  checkAuth,
  checkAdmin,
  deleteProduct
);
router.put(
  "/product/update/:productId",
  checkAuth,
  checkAdmin,
  updateProduct
);

router.param("productId", productById);

module.exports = router;
