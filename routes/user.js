const express = require('express');
const router = express.Router();
const {checkAuth} = require('../controllers/auth')
const {userById, updateUser, getUser, userOrders} = require('../controllers/user');

router.get('/userprofile', checkAuth, userById, getUser)
router.put('/user/update', checkAuth, userById, updateUser);
router.get('/user/orders', checkAuth, userById, userOrders)


module.exports = router