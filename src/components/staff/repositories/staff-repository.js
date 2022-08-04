const { staffModel } = require('../models');

exports.create = async (data) => {
  const user = await staffModel.create(data);
  return user;
};

exports.findByEmail = async (email) => {
  const user = await staffModel.findOne({ email });
  return user;
};

exports.update = async (email, data) => {
  const user = await staffModel.findOneAndUpdate(email, data, {
    new: true,
    runValidators: true
  });
  return user;
};

exports.findByToken = async (resetToken) => {
  const user = await staffModel.findOne({
    resetToken,
    expiresAt: { $gt: Date.now() }
  });
  return user;
};
