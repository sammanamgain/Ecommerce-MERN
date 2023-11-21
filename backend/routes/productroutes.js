const express = require("express");
const {
  getallproducts,
  createproduct,
  updateproduct,
  deleteproduct,
  getSingleProduct,
} = require("../controller/productcontroller");
const { isAuthenticatedUser, authorizedroles } = require("../middleware/auth");
const router = express.Router();

router.route("/product").get(getallproducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizedroles("admin"), createproduct);
router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(isAuthenticatedUser, authorizedroles("admin"), updateproduct)
  .delete(isAuthenticatedUser, authorizedroles("admin"), deleteproduct);

module.exports = router;
