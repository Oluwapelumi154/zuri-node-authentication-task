const router = require('express').Router();
const { validate, guard } = require('../../../middlewares');
const {
  loginUser,
  resetUserPassword,
  forgotUserPassword,
  isAuthenticated
} = require('../../auth/controllers');
const { createUser, deleteUser, getAllUser } = require('../controllers');
const { userToCreate, userId, userToLogin, userEmail } = require('../schema');

router.post('/register', validate(userToCreate()), createUser);
router.post('/login', validate(userToLogin()), loginUser);
router.delete(
  '/:userId',
  validate(userId()),
  isAuthenticated,
  guard.admin,
  deleteUser
);
router.post('/forgotPassword', validate(userEmail()), forgotUserPassword);
router.patch('/resetPassword', resetUserPassword);
router.get('/all', isAuthenticated, guard.admin, getAllUser);
module.exports = router;
