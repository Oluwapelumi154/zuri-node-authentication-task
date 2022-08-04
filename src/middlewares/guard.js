const { errorResponseMsg } = require('../utils');

exports.admin = (req, res, next) => {
  const { user } = req;
  console.log(user);
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
