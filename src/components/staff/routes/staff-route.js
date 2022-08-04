const router = require('express').Router();
const { validate } = require('../../../middlewares');
const { loginStaff } = require('../../auth/controllers');
const { createUser } = require('../controllers');
const { staffToCreate } = require('../schema');
const { staffToLogin } = require('../schema/staff-schema');

router.post('/register', validate(staffToCreate()), createUser);
router.post('/login', validate(staffToLogin()), loginStaff);
module.exports = router;
