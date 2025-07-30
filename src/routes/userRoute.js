import express from "express";
import { register, login, getAllUsers } from "../controllers/userController.js";
import { isAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(isAuthentication, getAllUsers);

export default router;
