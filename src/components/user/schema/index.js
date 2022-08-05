const schema = require('./user-schema');

module.exports = Object.freeze({
  /** Schema */
  userToCreate: schema.userToCreate,
  userToLogin: schema.userToLogin,
  userEmail: schema.userEmail,
  userId: schema.userId,
  userToUpdate: schema.userToUpdate
});
