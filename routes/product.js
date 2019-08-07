const express = require("express");
const router = express.Router();
const { checkAuth, checkAdmin } = require("../controllers/auth");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  productById,
  getProduct,
  productPhoto,
  productsList,
  productsSearch
} = require("../controllers/product");


router.post("/product/create", checkAuth, checkAdmin, createProduct);
router.delete("/product/delete/:productId", checkAuth, checkAdmin,deleteProduct);
router.put("/product/update/:productId", checkAuth, checkAdmin, updateProduct);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", productPhoto)

router.get('/products', productsList)
router.get('/products/search', productsSearch)

router.param("productId", productById);

module.exports = router;
