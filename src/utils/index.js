const response = require('./response');
const bcrypt = require('./hash');
const jwt = require('./token');

module.exports = Object.freeze({
  /** Response */

  errorResponseMsg: response.errorReponseMsg,
  successResponseMsg: response.successReponseMsg,
  serviceResponse: response.serviceResponse,
  authResponseMsg: response.authResponseMsg,

  /** Hashss */
  hashPassword: bcrypt.hashPassword,
  comparePassword: bcrypt.comparePassword,

  signJWT: jwt.signJWT
});
