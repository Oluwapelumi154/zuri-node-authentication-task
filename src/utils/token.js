const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.signJWT = (userId, email) => {
  const token = jwt.sign({ _id: userId, email }, 'hello', {
    expiresIn: '2d'
  });
  return token;
};

exports.verifyJWT = (token) => {
  const isValid = jwt.verify(token, 'hello');
  return isValid;
};

exports.generateToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  return { token, hashedToken };
};

exports.hashToken = (token) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  return hashedToken;
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
