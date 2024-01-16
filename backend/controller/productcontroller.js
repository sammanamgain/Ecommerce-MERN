const Product = require("../Models/productModel");
const Errorcreator = require("../utils/Error.js");
const catchAsync = require("../middleware/catchAsync.js");
const ApiFeatures = require("../utils/apiFeatures.js");
//create the product  admin
exports.createproduct = catchAsync(async (req, res, next) => {
  console.log(req.body);
  req.body.user = req.user.id;

  const data = await Product.create(req.body);
  if (!data) {
    let e = new Errorcreator(500, "failed to create Product");
    console.log(e);

    return next(e, req, res, next);
  }

  res.status(201).json({
    success: true,
    data,
  });
});

//get all products
exports.getallproducts = catchAsync(async (req, res, next) => {
  console.log("request comes in ......");
  const count = await Product.countDocuments();
  const resultperpage = 8;
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);

  const data = await apiFeatures.query;

  // const data = await Product.find();

  if (!data || data.length === 0) {
    let e = new Errorcreator(500, "not found || invalid id");
    return next(e, req, res, next);
  }
  res.status(200).json({ success: true, message: data, count: count });
  next();
});

//update the product admin
exports.updateproduct = catchAsync(async (req, res, next) => {
  const data = await Product.findById(req.params.id);
  if (!data) {
    let e = new Errorcreator(500, "not found || invalid id");
    return next(e, req, res, next);
  }
  const updateddata = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({ success: true, messgae: updateddata });
});

//delete the product admin
exports.deleteproduct = catchAsync(async (req, res, next) => {
  const data = await Product.findById(req.params.id);
  if (!data) {
    let e = new Errorcreator(500, "not found || invalid id");
    return next(e, req, res, next);
  }
  const deleteddata = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, messgae: deleteddata });
});

//get a single product
exports.getSingleProduct = catchAsync(async (req, res, next) => {
  
  let id = req.params.id;
  console.log(id);
  const singledata = await Product.findById(id);
  if (!singledata) {
    let e = new Errorcreator(500, "not found");
    return next(e, req, res, next);
  }
  res.status(200).json({ success: true, messgae: singledata });
});

//create new reviews or update the review
exports.createproductreview = catchAsync(async (req, res, next) => {
  const { rating, comment, productid } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  console.log(productid);
  const product = await Product.findById(productid);
  console.log(product);
  let isreviewd = false;
  isreviewed = product.reviews.forEach((element) => {
    if (element.user.toString === req.user._id.toString) {
      isreviewd = true;
    }
  });
  if (isreviewed) {
    product.reviews.forEach((ele) => {
      if (ele.user.toString === req.user._id.toString) {
        ele.rating = rating;
        ele.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((e) => {
    avg += e.rating;
  });
  avg = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

//Get all reviews of the product
exports.getproductReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new Error(400, "Product not found"));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete a Review
exports.deleteReview = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new Error(404, "Prduct not found"));
  }
  //console.log(product)
  // console.log(rev._id.toString());
  //only selecting other people review , so the person who wants to delete the review will be lost
  const reviews = product.reviews.filter((rev) => {
    return rev._id.toString() !== req.query.id.toString();
  });
  let avg = 0;
  reviews.forEach((e) => {
    avg += e.rating;
  });
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    const ratings = avg / reviews.length;
  }

  const numofReviews = reviews.length;
  const data = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numofReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(201).json({
    success: true,
  });
});
