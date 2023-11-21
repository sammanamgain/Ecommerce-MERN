const express = require("express");
const { signUp,logIn,logout } = require("../controller/userController");
const router = express.Router();

router.route("/sign-up").post(signUp);
router.route("/log-in").post(logIn);
router.route("/log-out").get(logout)
module.exports = router;
