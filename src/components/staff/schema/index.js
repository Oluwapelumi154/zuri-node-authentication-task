const schema = require('./staff-schema');

module.exports = Object.freeze({
  /** Schema */
  staffToCreate: schema.staffToCreate,
  staffEmail: schema.staffEmail,
  staffToLogin: schema.staffToLogin,
  staffToUpdate: schema.staffToUpdate
});
