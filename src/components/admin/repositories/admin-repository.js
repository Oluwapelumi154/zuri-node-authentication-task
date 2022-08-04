const { adminModel } = require('../models');

exports.create = async (data) => {
  const user = await adminModel.create(data);
  return user;
};

exports.findByEmail = async (email) => {
  const user = await adminModel.findOne({ email });
  return user;
};

exports.findById = async (adminId) => {
  const user = await adminModel.findById(adminId);
  return user;
};
