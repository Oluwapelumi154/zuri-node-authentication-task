const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
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
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    imgUrl: String,
    role: {
      type: String,
      required: true,
      default: 'user'
    },
    resetToken: String,
    verified: {
      type: String,
      required: true,
      default: false
    },
    passwordChangedAt: Date,
    resetTokenExpiresAt: Date
  },
  { timestamps: true }
);
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
