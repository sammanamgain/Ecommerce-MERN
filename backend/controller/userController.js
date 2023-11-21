const Errorcreator = require("../utils/Error.js");
const catchAsync = require("../middleware/catchAsync.js");
const User = require("../Models/userModel.js");
const sendToken = require("../utils/jwToken.js");

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, password, email } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "sampleid", url: "jdklfjsl" },
  });
  sendToken(user, 200, res, next);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Errorcreator(400, "please Enter your email and password"));
  }
  // as we have made false to select property of password ,we have to explicitly select password field too
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new Errorcreator(401, "Invalid email or password"));
  }
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new Errorcreator(401, "Invalid email or password"));
  }
  sendToken(user, 200, res, next);
});
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
