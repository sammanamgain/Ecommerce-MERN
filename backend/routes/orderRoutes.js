const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedroles } = require("../middleware/auth");
const {
  newOrder,
  getOrder,
  getuserOrder,
} = require("../controller/orderController");
router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
  .route("/order/:id")
  .post(isAuthenticatedUser, authorizedroles("admin"), getOrder);
router.route("/order/me").post(isAuthenticatedUser, getuserOrder);
module.exports = router;
