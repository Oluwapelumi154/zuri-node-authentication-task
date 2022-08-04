const { authResponseMsg, errorResponseMsg } = require('../../../utils');
const { adminService } = require('../services');

exports.createAdmin = async (req, res) => {
  const { body } = req;
  const { status, statusCode, message, data } = await adminService.create(body);
  if (statusCode === 201) {
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message, data);
  }
};
