require('dotenv').config();
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const apis = require('./gateway');
const { errorResponseMsg } = require('./utils');

const app = express();
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));
app.use('/api', apis);
app.use('*', (req, res) =>
  errorResponseMsg(
    res,
    404,
    'fail',
    `Can't find ${req.originalUrl} on this server`
  )
);
module.exports = app;
