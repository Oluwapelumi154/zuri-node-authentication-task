const { authResponseMsg, errorResponseMsg } = require('../../../utils');
const { authService } = require('../services');

exports.authenticateUser = async (req, res) => {
  const { body } = req;
  const { status, statusCode, message, data } =
    await authService.authenticateUser(body);
  if (statusCode === 200) {
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message);
  }
};

exports.authenticateAdmin = async (req, res) => {
  const { body } = req;
  const { status, statusCode, message, data } =
    await authService.authenticateAdmin(body);
  if (statusCode === 200) {
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message);
  }
};

exports.authenticateStaff = async (req, res) => {
  const { body } = req;
  const { status, statusCode, message, data } =
    await authService.authenticateStaff(body);
  if (statusCode === 200) {
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message);
  }
};
