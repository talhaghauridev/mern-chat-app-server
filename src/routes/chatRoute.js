import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} from "../controllers/chatController.js";
import { isAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(isAuthentication, accessChat).get(isAuthentication, fetchChats);

router.route("/group").post(isAuthentication, createGroupChat);
router.route("/group/rename").put(isAuthentication, renameGroup);
router.route("/group/add").put(isAuthentication, addToGroup);
router.route("/group/remove").put(isAuthentication, removeFromGroup);
export default router;
