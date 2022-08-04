const { authResponseMsg, errorResponseMsg } = require('../../../utils');
const { userService } = require('../services');

exports.createUser = async (req, res) => {
  const { body } = req;
  const { status, statusCode, message, data } = await userService.create(body);
  if (statusCode === 201) {
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message, data);
  }
};
