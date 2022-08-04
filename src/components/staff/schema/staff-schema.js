const { body } = require('express-validator');

module.exports = {
  staffToCreate: () => [
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
      .isIn(['data-analyst', 'developer', 'auditor'])
      .withMessage('role must be data-analyst, developer, auditor')
      .notEmpty()
      .withMessage('This is a required field')
  ],
  staffToLogin: () => [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid Email')
      .notEmpty()
      .withMessage('This is a required field'),
    body('password').trim().notEmpty().withMessage('This is a required field')
  ]
};
