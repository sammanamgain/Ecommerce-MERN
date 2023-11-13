const express = require("express");
const {
  getallproducts,
  createproduct,
  updateproduct,
    deleteproduct,
  getSingleProduct
} = require("../controller/productcontroller");
const router = express.Router();

router.route("/product").get(getallproducts);
router.route("/product/new").post(createproduct);
router.route("/product/:id").get(getSingleProduct).put(updateproduct).delete(deleteproduct);

module.exports = router;
