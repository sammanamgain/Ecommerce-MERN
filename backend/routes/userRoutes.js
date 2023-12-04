const express = require("express");
const { signUp,logIn,logout, forgetpassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile,
    getAllUsers, getSingleUser, updateUserRole, deleteProfile
} = require("../controller/userController");
const { isAuthenticatedUser, authorizedroles} = require("../middleware/auth");
const router = express.Router();

router.route("/sign-up").post(signUp);
router.route("/log-in").post(logIn);
router.route("/log-out").get(logout);
router.route("/forget").post(forgetpassword)
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/update/password").put(isAuthenticatedUser,updateUserPassword)
router.route("/update/profile").put(isAuthenticatedUser, updateUserProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizedroles("admin"),getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizedroles("admin"),getSingleUser).put(isAuthenticatedUser,authorizedroles("admin"),updateUserRole).delete(isAuthenticatedUser,authorizedroles("admin"),deleteProfile);

module.exports = router;

