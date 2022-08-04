const authController = require('./auth-controller');

module.exports = Object.freeze({
  loginUser: authController.authenticateUser,
  forgotUserPassword: authController.forgotUserPassword,
  resetUserPassword: authController.resetUserPassword,
  resetStaffPassword: authController.resetStaffPassword,
  forgotStaffPassword: authController.forgotStaffPassword,
  loginStaff: authController.authenticateStaff,
  loginAdmin: authController.authenticateAdmin,
  isAuthenticated: authController.isAuthenticated
});
