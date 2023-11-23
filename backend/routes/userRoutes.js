const express = require("express");
const { signUp,logIn,logout, forgetpassword, resetPassword } = require("../controller/userController");
const router = express.Router();

router.route("/sign-up").post(signUp);
router.route("/log-in").post(logIn);
router.route("/log-out").get(logout);
router.route("/forget").post(forgetpassword)
router.route("/password/reset/:token").put(resetPassword);
module.exports = router;

