const Product = require("../Models/productModel");
const Errorcreator = require("../utils/Error.js");
const catchAsync = require("../middleware/catchAsync.js");
const ApiFeatures = require("../utils/apiFeatures.js");
//create the product  admin
exports.createproduct = catchAsync(async (req, res, next) => {
  console.log(req.body);

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
  const count = Product.countDocuments();
  const resultperpage = 5;
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
  const singledata = await Product.findById(id);
  if (!singledata) {
    let e = new Errorcreator(500, "not found");
    return next(e, req, res, next);
  }
  res.status(200).json({ success: true, messgae: singledata });
});
