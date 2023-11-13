const express = require('express');
const app = express();
const product = require('./routes/productroutes');
const error = require('./middleware/customError');
app.use(express.json());
app.use('/api/v1', product);
//calling error handler middleware
app.use(error)
module.exports = app;