const { staffModel } = require('../models');

exports.create = async (data) => {
  const user = await staffModel.create(data);
  return user;
};

exports.findByEmail = async (email) => {
  const user = await staffModel.findOne({ email });
  return user;
};
