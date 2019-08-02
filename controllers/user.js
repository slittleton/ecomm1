const User = requrie("../modles/user");


exports.userById = (req, res, callback, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {return res.status(400).json({ error: "user not found" })}
    req.profile = user;
    callback();
  });
};




