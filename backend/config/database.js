const mongoose = require("mongoose");
const connect = () => {
  mongoose
    .connect(process.env.CONNECT)
    .then(() => {
      console.log("connected");
    })
    .catch((e) => {
      console.log("sorry not working", e);
    });
};
module.exports = connect;
