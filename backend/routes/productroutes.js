const express = require("express");
const {
  getallproducts,
  createproduct,
  updateproduct,
  deleteproduct,
  getSingleProduct,
  createproductreview,
  getproductReviews,
  deleteReview,
} = require("../controller/productcontroller");
const { isAuthenticatedUser, authorizedroles } = require("../middleware/auth");
const router = express.Router();

router.route("/product").get(getallproducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedroles("admin"), createproduct);
router
  .route("/admin/product/:id")
  .get(getSingleProduct)
  .put(isAuthenticatedUser, authorizedroles("admin"), updateproduct)
  .delete(isAuthenticatedUser, authorizedroles("admin"), deleteproduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(isAuthenticatedUser, createproductreview);
router
  .route("/reviews")
  .get(getproductReviews)
  .delete(isAuthenticatedUser, deleteReview);
module.exports = router;
