const router = require('express').Router();
const { validate, guard } = require('../../../middlewares');
const {
  loginUser,
  resetUserPassword,
  forgotUserPassword,
  isAuthenticated,
  logOut
} = require('../../auth/controllers');
const {
  createUser,
  deleteUser,
  getAllUser,
  verifyUser
} = require('../controllers');
const {
  userToCreate,
  userId,
  userToLogin,
  userEmail,
  userToUpdate
} = require('../schema');

router.post('/register', validate(userToCreate()), createUser);
router.post('/login', validate(userToLogin()), loginUser);
router.delete(
  '/:userId',
  validate(userId()),
  isAuthenticated,
  guard.superAdmin,
  deleteUser
);
router.post('/forgotPassword', validate(userEmail()), forgotUserPassword);
router.patch('/resetPassword', validate(userToUpdate()), resetUserPassword);
router.get('/verify-email', verifyUser);
router.get('/all', isAuthenticated, guard.superAdmin, getAllUser);
router.get('/all', isAuthenticated, guard.admin, getAllUser);
router.get('/logOut', logOut);

module.exports = router;
