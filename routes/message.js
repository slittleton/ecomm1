const express = require("express");
const router = express.Router();
const { checkAuth, checkAdmin } = require("../controllers/auth");
const {
  messageById,
  postMessage,
  getMessages,
  deleteMessage,
  updateMessage
} = require("../controllers/message");

router.post("/message", postMessage);
router.get("/messages", getMessages);
router.delete(
  "/message/delete/:messageId",
  checkAuth,
  checkAdmin,
  deleteMessage
);
router.put("/message/update/:messageId", checkAuth, checkAdmin, updateMessage);

router.param("messageId", messageById);

module.exports = router;
