const { body } = require('express-validator');

module.exports = {
  adminToCreate: () => [
    body('firstName').trim().notEmpty().withMessage('This is a required field'),
    body('lastName').trim().notEmpty().withMessage('This is a required field'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid Email')
      .notEmpty()
      .withMessage('This is a required field'),
    body('password').trim().notEmpty().withMessage('This is a required field'),
    body('role')
      .trim()
      .isIn(['admin', 'superAdmin'])
      .withMessage('role must be admin, superAdmin')
      .notEmpty()
      .withMessage('This is a required field')
  ],
  adminToLogin: () => [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid Email')
      .notEmpty()
      .withMessage('This is a required field'),
    body('password').trim().notEmpty().withMessage('This is a required field')
  ]
};
