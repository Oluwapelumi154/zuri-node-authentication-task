const { userModel } = require('../models');

exports.create = async (data) => {
  const user = await userModel.create(data);
  return user;
};

exports.findByEmail = async (email) => {
  const user = await userModel.findOne({ email });
  return user;
};
