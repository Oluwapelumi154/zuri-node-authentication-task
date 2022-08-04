const response = require('./response');
const bcrypt = require('./hash');
const token = require('./token');
const mail = require('./mail');

module.exports = Object.freeze({
  /** Response */

  errorResponseMsg: response.errorReponseMsg,
  successResponseMsg: response.successReponseMsg,
  serviceResponse: response.serviceResponse,
  authResponseMsg: response.authResponseMsg,

  /** Hashss */
  hashPassword: bcrypt.hashPassword,
  comparePassword: bcrypt.comparePassword,

  signJWT: token.signJWT,
  generateToken: token.generateToken,
  verifyJWT: token.verifyJWT,
  compareTime: token.compareTime,
  sendEmail: mail.sendEmail
});
