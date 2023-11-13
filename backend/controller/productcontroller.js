const Product = require("../Models/productModel");
const Errorcreator=require("../utils/Error");
//create the product  admin
exports.createproduct = async (req, res, next) => {
  console.log(req.body);
  try {
    const data = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({ error: e });
  }
};
//get all products
exports.getallproducts = async (req, res, next) => {
  const data = await Product.find();
  res.status(200).json({ message: data });
  next();
};
//update the product admin
exports.updateproduct = async (req, res, next) => {
  const data = await Product.findById(req.params.id);
  if (!data) {
    return res
      .status(500)
      .json({ success: false, message: "product not found" });
  }

  const updateddata = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({ success: true, messgae: updateddata });
};

//delete the product admin
exports.deleteproduct = async (req, res, next) => {
  const data = await Product.findById(req.params.id);
  if (!data) {
    return res
      .status(500)
      .json({ success: false, message: "product not found" });
  }

  const deleteddata = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, messgae: deleteddata });
};
//get a single product
exports.getSingleProduct = async (req, res, next) => {
    try {
       

        const singledata = await Product.findById(req.params.id);
        console.log(singledata);
        res.status(200).json({ success: true, messgae: singledata });
    }
    catch (err)
    {
         
        
         let e = new Errorcreator(500, "not found");
       
         return next(e);
    }
};
