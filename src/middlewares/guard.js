const { errorResponseMsg } = require('../utils');

exports.admin = (req, res, next) => {
  const { user } = req;
  if (user.role === 'admin') {
    return next();
  }
  return errorResponseMsg(
    res,
    'fail',
    403,
    'unAuthorized user Login to gain access'
  );
};

exports.superAdmin = (req, res, next) => {
  const { user } = req;
  if (user.role === 'superAdmin') {
    return next();
  }
  return errorResponseMsg(
    res,
    'fail',
    403,
    'unAuthorized user Login to gain access'
  );
};

exports.developer = (req, res, next) => {
  const { user } = req;
  if (user.role === 'developer') {
    return next();
  }
  return errorResponseMsg(
    res,
    'fail',
    403,
    'unAuthorized user Login to gain access'
  );
};
