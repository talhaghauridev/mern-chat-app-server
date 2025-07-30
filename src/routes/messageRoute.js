import express from "express";
import { sendMessage, allMessages } from "../controllers/messageController.js";
import { isAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(isAuthentication, sendMessage);
router.route("/:chatId").get(isAuthentication, allMessages);

export default router;
