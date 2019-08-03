const User = require("../models/user");


exports.userById = (req, res, callback) => {
  const _id = req.auth._id
  User.findById(_id).exec((err, user) => {
    if (err || !user) {return res.status(400).json({ error: "user not found" })}
    user.password = undefined;
    req.profile = user;

    callback();
  });
};




