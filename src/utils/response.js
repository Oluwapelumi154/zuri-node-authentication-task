exports.serviceResponse = (status, statusCode, message, data) => {
  return {
    status,
    statusCode,
    message,
    data
  };
};

exports.authResponseMsg = (res, status, statusCode, message, data) => {
  return res.status(statusCode).json({
    status,
    message,
    isAuthenticated: true,
    data
  });
};

exports.successReponseMsg = (res, status, statusCode, message, data) => {
  return res.status(statusCode).json({
    status,
    statusCode,
    message
  });
};
exports.errorReponseMsg = (res, status, statusCode, message) => {
  return res.status(statusCode).json({
    status,
    statusCode,
    message
  });
};
