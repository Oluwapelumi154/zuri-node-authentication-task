const jwt = require('jsonwebtoken');

exports.signJWT = (userId, email) => {
  const token = jwt.sign({ _id: userId, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '2d'
  });
  return token;
};
