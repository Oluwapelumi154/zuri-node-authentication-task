const { body } = require('express-validator');

module.exports = {
  userToCreate: () => [
    body('firstName').trim().notEmpty().withMessage('This is a required field'),
    body('lastName').trim().notEmpty().withMessage('This is a required field'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid Email')
      .notEmpty()
      .withMessage('This is a required field'),
    body('password').trim().notEmpty().withMessage('This is a required field')
  ],
  userToLogin: () => [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid Email')
      .notEmpty()
      .withMessage('This is a required field'),
    body('password').trim().notEmpty().withMessage('This is a required field')
  ]
};
