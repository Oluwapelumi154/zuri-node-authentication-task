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

exports.deleteUser = async (req, res) => {
  const { params } = req;
  const { status, statusCode, message, data } = await userService.deleteById(
    params.userId
  );
  if (statusCode === 200) {
    return errorResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message, data);
  }
};

exports.getAllUser = async (req, res) => {
  const { status, statusCode, message, data } = await userService.findAll();
  if (statusCode === 200) {
    return authResponseMsg(res, status, statusCode, message, data);
  }
  if (statusCode >= 400) {
    return errorResponseMsg(res, status, statusCode, message, data);
  }
};
