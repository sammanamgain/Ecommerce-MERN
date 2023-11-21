const mongoose = require("mongoose");
const connect = () => {
  mongoose
    .connect(process.env.connect)
    .then(() => {
      console.log("connected");
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports = connect;
