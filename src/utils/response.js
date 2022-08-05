exports.serviceResponse = (status, statusCode, message, data) => ({
  status,
  statusCode,
  message,
  data
});

exports.authResponseMsg = (res, status, statusCode, message, data) =>
  res.status(statusCode).json({
    status,
    message,
    isAuthenticated: true,
    data
  });

exports.setCookie = (res, token) =>
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true
  });

exports.removeCookie = (res, token) => {
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
};

exports.successReponseMsg = (res, status, statusCode, message, data) =>
  res.status(statusCode).json({
    status,
    statusCode,
    message,
    data
  });

exports.errorReponseMsg = (res, status, statusCode, message) =>
  res.status(statusCode).json({
    status,
    statusCode,
    message
  });
