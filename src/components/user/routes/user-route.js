const router = require('express').Router();
const { validate } = require('../../../middlewares');
const { login } = require('../../auth/controllers');
const { createUser } = require('../controllers');
const { userToCreate, userToLogin } = require('../schema');

router.post('/register', validate(userToCreate()), createUser);
router.post('/login', validate(userToLogin()), login);
module.exports = router;
