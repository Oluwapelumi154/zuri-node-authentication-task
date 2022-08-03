require('dotenv').config();
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const app = express();
app.use(compression());
app.use(morgan('dev'));

module.exports = app;
