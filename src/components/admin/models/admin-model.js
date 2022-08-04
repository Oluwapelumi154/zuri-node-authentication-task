const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'superAdmin'],
    required: true,
    default: 'admin'
  }
});
const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;
