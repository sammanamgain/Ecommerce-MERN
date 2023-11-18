class Errorcreator extends Error {
  constructor(statuscode, message) {
    //parent class expects a error message
    super(message);
    this.statuscode = statuscode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = Errorcreator;
