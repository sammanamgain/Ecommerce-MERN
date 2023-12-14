// const func=(x) => {
//     return (req, res, next) => {
//         x(req, res, next).catch(next);
//     }
// };
// module.exports = func;


//or
module.exports = func => {
  return (req, res, next) => {
    func(req, res, next).catch(
      (e)=>
      {
        console.log(e);
        return next(e)}
      
      );
  };
};





//direct call hunxa vanera function return gareko func ma 
// you can use the promise to resolve this 