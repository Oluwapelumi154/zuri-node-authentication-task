const { validationResult } = require('express-validator');
const { errorResponseMsg } = require('../utils');

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return errorResponseMsg(res, 'fail', 422, errors.array());
};
module.exports = validate;
