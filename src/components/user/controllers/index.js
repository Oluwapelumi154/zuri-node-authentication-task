const userController = require('./user-controller');

module.exports = Object.freeze({
  createUser: userController.createUser,
  deleteUser: userController.deleteUser,
  getAllUser: userController.getAllUser
});
