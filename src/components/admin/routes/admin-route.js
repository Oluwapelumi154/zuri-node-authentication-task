const router = require('express').Router();
const { validate } = require('../../../middlewares');
const { authenticateAdmin } = require('../../auth/controllers/auth-controller');
const { createAdmin } = require('../controllers');
const { adminToCreate } = require('../schemas');
const { adminToLogin } = require('../schemas/schema');

router.post('/register', validate(adminToCreate()), createAdmin);
router.post('/login', validate(adminToLogin()), authenticateAdmin);

module.exports = router;
