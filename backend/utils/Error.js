class Errorcreator extends Error {
  constructor(statuscode, message) {
    //parent class expects a error message
    super(message);
      this.statuscode = statuscode;
    
  
    
  }
}
module.exports = Errorcreator;
