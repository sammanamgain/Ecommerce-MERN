const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const product = require("./routes/productroutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const error = require("./middleware/customError");
const cookie_parser = require("cookie-parser");
app.use(express.json());
app.use(cookie_parser());
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
//calling error handler middleware
app.use(error);
module.exports = app;
