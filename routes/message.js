const express = require("express");
const router = express.Router();
const { receivedMessage } = require("../controllers/message");

router.post("/message", receivedMessage);

module.exports = router;
