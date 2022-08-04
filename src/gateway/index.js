const router = require('express').Router();
const { staffRoute } = require('../components/staff-manager/routes');
const { adminRoute } = require('../components/admin/routes');
const { userRoute } = require('../components/user/routes');

router.use('/user', userRoute);
router.use('/staff', staffRoute);
router.use('/admin', adminRoute);
module.exports = router;
