const express = require("express");
const router = express.Router();
const { checkAuth, checkAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { generateToken, processPayment } = require('../controllers/braintree');

router.get("/braintree/getToken/:userId", checkAuth, userById, generateToken);
router.post("/braintree/payment", checkAuth, userById, processPayment)

// router.param("userId", userById)


module.exports = router