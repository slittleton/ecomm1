const express = require("express");
const router = express.Router();
const { checkAuth, checkAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/braintree");
const { generateToken, processPayment } = require('../controllers/braintree');

router.get("/braintree/getToken/:userId", checkAuth, checkAdmin, generateToken);
router.post("/braintree/payment", checkAuth, processPayment)

router.param("userId", userById)
module.exports = router