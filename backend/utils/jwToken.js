const dotenv = require("dotenv");
dotenv.config({ path: "../config/.env" });
const sendToken = (user, statusCode, res, next) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
    next();
};
module.exports = sendToken;
