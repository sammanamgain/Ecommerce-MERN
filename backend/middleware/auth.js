const Error = require("../utils/Error");
const jwt = require("jsonwebtoken");
const catchAsync = require("../middleware/catchAsync.js");
const User = require("../Models/userModel.js");

exports.isAuthenticatedUser = catchAsync(async (req, res, next) => {

  const { token } = req.cookies;

  if (!token) {
    return next(new Error(404, "please login to access this route"));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decodedData.id);

  req.user = user;

  req.user.id = decodedData._id;

  

  next();
});



//first yo middleware run hunxa without hitting that api routes also , then it returns anthother funciton which will be executed when middleware hits on that
exports.authorizedroles = (...roles) => {
//console.log(roles);

  return (req, res, next) => {
    //console.log(req.user.role);
    if (req.user.role == undefined) {
      next(new Error("404", "you are not allowed to access this route"));
    } else if (req.user.role == "user") {
      next(new Error("403", "A normal user cannot access this route"));
    }
    next();
  };
};
