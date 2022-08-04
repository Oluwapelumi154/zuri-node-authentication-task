const { userModel } = require('../models');

exports.create = async (data) => {
  const user = await userModel.create(data);
  return user;
};

exports.findByEmail = async (email) => {
  const user = await userModel.findOne({ email });
  return user;
};

exports.update = async (email, data) => {
  const user = await userModel.findOneAndUpdate(email, data, {
    new: true,
    runValidators: true
  });
  return user;
};

exports.findByToken = async (resetToken) => {
  const user = await userModel.findOne({
    resetToken,
    expiresAt: { $gt: Date.now() }
  });
  return user;
};

exports.findById = async (userId) => {
  const user = await userModel.findById(userId);
  return user;
};

exports.deleteById = async (userId) => {
  const user = await userModel.findByIdAndDelete(userId);
  return user;
};

exports.find = async () => {
  const user = await userModel.find();
  return user;
};
