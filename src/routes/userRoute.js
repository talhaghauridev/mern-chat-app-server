const express = require("express");
const {
  register,
  login,
  getAllUsers,
} = require("../controllers/userController");
const { isAuthentication } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post( register);
router.route("/login").post(login);
router.route("/").get( isAuthentication,getAllUsers);

module.exports = router;
