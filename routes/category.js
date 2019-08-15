const express = require("express");
const router = express.Router();
const { checkAuth, checkAdmin } = require("../controllers/auth");

const { createCategory, getCategories } = require("../controllers/category");

router.get("/category/:categoryId");
router.get("/categories", getCategories);
router.post("/category/create", checkAuth, checkAdmin, createCategory);

// router.param('categoryId', categoryById);

module.exports = router;
