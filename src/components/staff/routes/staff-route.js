const router = require('express').Router();
const { validate } = require('../../../middlewares');
const {
  loginStaff,
  forgotStaffPassword,
  resetStaffPassword,
  logOut
} = require('../../auth/controllers');
const { createUser } = require('../controllers');
const {
  staffToCreate,
  staffToLogin,
  staffEmail,
  staffToUpdate
} = require('../schema');

router.post('/register', validate(staffToCreate()), createUser);
router.post('/login', validate(staffToLogin()), loginStaff);
router.post('/forgotPassword', validate(staffEmail()), forgotStaffPassword);
router.patch('/resetPassword', validate(staffToUpdate()), resetStaffPassword);
router.get('/logOut', logOut);
module.exports = router;
