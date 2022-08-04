const authController = require('./auth-controller');

module.exports = Object.freeze({
  login: authController.authenticateUser
});
