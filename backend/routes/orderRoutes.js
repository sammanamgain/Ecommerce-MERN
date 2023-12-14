const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedroles } = require("../middleware/auth");
const {
  newOrder,
  getOrder,
  userorder
} = require("../controller/orderController");
router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/user").get(isAuthenticatedUser, userorder);
router
  .route("/order/:id")
  .get(isAuthenticatedUser, authorizedroles("admin"), getOrder);

module.exports = router;
