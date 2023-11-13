const customError = (error, req, res, next) => {
  //console.log("middleware called");
  error.statuscode = error.statuscode || 500;
    error.message = error.message || "Server Error";
    
    res.status(error.statuscode).json({ success: false, message: error.message });
    next();
};
module.exports = customError;
