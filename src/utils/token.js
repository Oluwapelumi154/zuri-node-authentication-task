const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.signJWT = (userId, email) => {
  const token = jwt.sign({ _id: userId, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '2d'
  });
  return token;
};

exports.verifyJWT = (token) => {
  const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return isValid;
};

exports.generateToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  return { resetToken, hashedResetToken };
};

exports.hashToken = (resetToken) => {
  const token = crypto.createHash('sha256').update(resetToken).digest('hex');
  return token;
};

exports.compareTime = (jwtTimeStamp, passwordChangedAt) => {
  if (passwordChangedAt) {
    const changedAtTimeStamp = parseInt(
      passwordChangedAt.getTime() / 10000,
      10
    );
    return jwtTimeStamp < changedAtTimeStamp;
  }
  return false;
};
