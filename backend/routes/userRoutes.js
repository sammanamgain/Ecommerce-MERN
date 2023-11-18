const express = require("express");
const { signUp,logIn } = require("../controller/userController");
const router = express.Router();

router.route("/sign-up").post(signUp);
router.route("/log-in").post(logIn);
module.exports = router;
