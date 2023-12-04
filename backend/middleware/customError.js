const Error = require("../utils/Error");
const customError = (error, req, res, next) => {
  error.statuscode = error.statuscode || 500;
  error.message = error.message || "Server Error";

  //wrong mongodb id error
  if (error.name === "CastError") {
    const message = `Resource not found : Invalid :${error.path}`;
    error = new Error(400, message);
  }

  //Mongoose duplicate key error
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} Entered`;
    error = new Error(400, message);
  }
  //WRONG jwt error
  if (error.name === "JsonWebTokenError") {
    const message = `Json web token is invalid,try again`;
    error = new Error(400, message);
  }
  //jwt expire error
  if (error.name === "TokenExpiredError") {
    const message = `Json web token is Expired,try again`;
    error = new Error(400, message);
  }

  res.status(error.statuscode).json({ success: false, message: error.stack });
  next();
};
module.exports = customError;
