const express = require('express');
const router = express.Router();
const {checkAuth} = require('../controllers/auth')
const {userById, updateUser, getUser, userOrders} = require('../controllers/user');

router.get('/userprofile', checkAuth, getUser)
router.put('/user/update/:userId', checkAuth, updateUser);
router.get('/user/orders', checkAuth, userOrders)

router.param("userId", userById)

module.exports = router