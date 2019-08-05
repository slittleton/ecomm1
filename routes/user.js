const express = require('express');
const router = express.Router();
const {checkAuth} = require('../controllers/auth')
const {userById, updateUser} = require('../controllers/user');
const bcrypt = require("bcrypt");


router.get('/userprofile', checkAuth, userById, (req, res)=>{
  const {name, email, history, isAdmin, _id} = req.profile
  const user = {name, email, history, isAdmin, _id};
  res.json(user)
})

router.put('/user/update', checkAuth, userById, updateUser);





module.exports = router