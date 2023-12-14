const Order = require("../Models/orderModels.js");
const Product = require("../Models/productModel");
const Errorcreator = require("../utils/Error.js");
const catchAsync = require("../middleware/catchAsync.js");

//create new order
exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    shippinginfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    } = req.body;
    const order = await Order.create({
      shippinginfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user:req.user._id
      
    });
    res.status(201).json({
        success: true,
        message:"order placed successfully"
    })
});


//get single order using the order id   --admin only
exports.getOrder = catchAsync(async (req, res, next) => {
  //populate method will search in User database using linked userid and returns name and email
  const orders = await Order.findById(req.params.id).populate("user", "name,email")
  if (!orders)
  {
    return new Errorcreator(400,"Orders Not Found")
  }
  
  res.status(201).json({
    success: true,
    orders
  })
})


//get order of user 
exports.userorder = catchAsync(async (req, res, next) => {
  console.log(
    "is this router called"
  )
  
  const orders = await Order.find({user:req.user.id})
  if (!orders)
  {
    return new Errorcreator(400,"Orders Not Found")
  }
  
  res.status(201).json({
    success: true,
    orders
  })
})


