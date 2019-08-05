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
  console.log(req.profile);
  console.log("PASSWORD: ",req.body.password);
  console.log(req.body)

  
  const hashPass = await User.hashPassword(req.body.password);
  req.body.password = hashPass;
  console.log(req.body.password)



  // User.findOneAndUpdate(
  //   // hash updated password

  //   { _id: req.profile._id },

  //   { $set: req.body },
  //   { new: true },
  //   (err, user) => {
  //     if (err) {
  //       return res
  //         .status(400)
  //         .json({ error: "user does not have authorization" });
  //     }
  //     user.password = undefined;
  //     user.salt = undefined;
  //     res.json(user);
  //   }
  // );

  res.send('Update')
};
