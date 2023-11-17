class Errorcreator extends Error {
  constructor(statuscode, message) {
    //parent class expects a error message
    super(message);
    this.statuscode = statuscode;

    Error.captureStackTrace(this, this.constructor);
  };

 
}
console.log("this line reached");
console.log(new Errorcreator(404, "Not a valid id"));
module.exports = Errorcreator;
