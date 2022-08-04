const { body, param, check } = require('express-validator');

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
    check('role').not().exists(),
    check('verified').not().exists(),
    check('resetTokenExpiresAt').not().exists(),
    check('resetToken').not().exists(),
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
  ],
  userEmail: () => [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid Email')
      .notEmpty()
      .withMessage('This is a required field')
  ],
  userId: () => [
    param('userId')
      .notEmpty()
      .isMongoId()
      .withMessage('Invalid Id')
      .withMessage('This is a required field')
  ]
};
