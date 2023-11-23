const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Your Name"],
    maxLength: [30, "Name cann't exceed 30 characters"],
    minLenght: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "please Enter your Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    minLength: [0, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
//adding a event
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 12);
});

//jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
userSchema.methods.comparePassword = async function (input_password) {
  return bcryptjs.compare(input_password, this.password);
};
userSchema.methods.getResetPasswordToken = async function () {
  //generating tokens
  //it generates a random hex string
  const resetToken = crypto.randomBytes(20).toString("hex");
  //It creates a token useing sha356 algorithm and update with resetTOken and digesting a process which just convert objects into a hex value
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 60 * 1000;
  console.log(this.resetPasswordExpire);
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
