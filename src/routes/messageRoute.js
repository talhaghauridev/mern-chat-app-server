const express = require("express");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageController");
const { isAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.route("/").post(isAuthentication, sendMessage);
router.route("/:chatId").get(isAuthentication, allMessages);

module.exports = router;
