const router = require('express').Router();
const { validate } = require('../../../middlewares');
const { loginAdmin, logOut } = require('../../auth/controllers');
const { createAdmin } = require('../controllers');
const { adminToCreate } = require('../schemas');
const { adminToLogin } = require('../schemas/admin-schema');

router.post('/register', validate(adminToCreate()), createAdmin);
router.post('/login', validate(adminToLogin()), loginAdmin);
router.get('/logOut', logOut);
module.exports = router;
