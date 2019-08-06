const User = require("../models/user");

exports.userById = (req, res, callback) => {
  const _id = req.auth._id;
  User.findById(_id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "user not found" });
    }
    user.password = undefined;
    req.profile = user;

    callback();
  });
};

exports.updateUser = async (req, res) => {
  if (req.body.password) { // if password changed then hash and save new password
    const hashPass = await User.hashPassword(req.body.password);
    req.body.password = hashPass;
  }

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "user does not have authorization" });
      }
      user.password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};
