const mongoose = require('mongoose');

const { Schema } = mongoose;

const staffSchema = new Schema({
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
  imgUrl: String,
  role: {
    type: String,
    enum: ['data-analyst', 'developer', 'auditor'],
    required: true
  }
});
const staffModel = mongoose.model('staff', staffSchema);
module.exports = staffModel;
