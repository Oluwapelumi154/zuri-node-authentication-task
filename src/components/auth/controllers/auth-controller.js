const {
  authResponseMsg,
  errorResponseMsg,
  successResponseMsg,
  setCookie,
  removeCookie
} = require('../../../utils');
const { authService } = require('../services');

exports.authenticateUser = async (req, res) => {
  const { body } = req;
  const { status, statusCode, message, data } =
    await authService.authenticateUser(body);
  if (statusCode === 200) {
    setCookie(res, data.token);
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message);
  }
};

exports.forgotUserPassword = async (req, res) => {
  const { body } = req;
  const { status, statusCode, message, data } =
    await authService.forgotUserPassword(body);
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message);
  }
};

exports.forgotStaffPassword = async (req, res) => {
  const { body } = req;
  const { status, statusCode, message, data } =
    await authService.forgotStaffPassword(body);
  if (statusCode === 200) {
    return successResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message);
  }
};

exports.resetUserPassword = async (req, res) => {
  const { query, body } = req;
  const { status, statusCode, message, data } =
    await authService.resetUserPassword(query, body);
  if (statusCode === 200) {
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message);
  }
};

exports.resetStaffPassword = async (req, res) => {
  const { query, body } = req;
  const { status, statusCode, message, data } =
    await authService.resetStaffPassword(query, body);
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
    setCookie(res, data.token);
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
    setCookie(res, data.token);
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message);
  }
};

exports.isAuthenticated = async (req, res, next) => {
  const { headers } = req;
  const { status, statusCode, message, data } =
    await authService.isAdminAuthenticated(headers);
  if (statusCode === 200) {
    req.user = data;
    return next();
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message);
  }
};

exports.logOut = async (req, res) => {
  removeCookie(res, 'loggedOut');
  return successResponseMsg(res, 'success', 200, 'Succesfully Logged Out');
};
