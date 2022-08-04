const router = require('express').Router();
const { validate } = require('../../../middlewares');
const { authenticateStaff } = require('../../auth/controllers/auth-controller');
const { createUser } = require('../controllers');
const { staffToCreate } = require('../schema');
const { staffToLogin } = require('../schema/schema');

router.post('/register', validate(staffToCreate()), createUser);
router.post('/login', validate(staffToLogin()), authenticateStaff);
module.exports = router;
