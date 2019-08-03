const express = require('express');
const router = express.Router();
const {checkAuth} = require('../controllers/auth')
const {userById} = require('../controllers/user')


router.get('/userprofile', checkAuth, userById, (req, res)=>{
  const {name, email, history, isAdmin, _id} = req.profile
  const user = {name, email, history, isAdmin, _id};
  res.json(user)
})






module.exports = router