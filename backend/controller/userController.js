const Errorcreator = require("../utils/Error.js");
const catchAsync = require("../middleware/catchAsync.js");
const User = require("../Models/userModel.js");
exports.signUp = catchAsync(async (req, res, next) => {
  const { name, password, email } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "sampleid", url: "jdklfjsl" },
  });
    const token = user.getJWTToken();
  res.status(201).json({ success: true, user,token });
});

exports.logIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
    {
        return next(new Errorcreator(400,"please Enter your email and password"))
    }
    // as we have made false to select property of password ,we have to explicitly select password field too
    const user = await User.findOne({ email }).select("+password");
    if (!user)
    {
        return next(new Errorcreator(401, "Invalid email or password"));
    }
    const isPasswordMatched = user.comparePassword(password);
      if (!isPasswordMatched) {
        return next(new Errorcreator(401, "Invalid email or password"));
    }
     const token = user.getJWTToken();
     res.status(201).json({ success: true, user, token });
 })