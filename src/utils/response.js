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
