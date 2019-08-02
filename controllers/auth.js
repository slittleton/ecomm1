const User = require("../models/user");
const bcrypt = require("bcrypt");

// SIGN UP ============================================
exports.signUp = async (req, res) => {
  let user = await new User(req.body);

  //hash password and save to database
  user.password = await user.hashPassword(user.password);
  await user.save();
  user.password = undefined;

  //generate jwt
  const token = await user.generateAuthToken();
  return res.header("Authorization", token).json({ user });
};

// SIGN IN ============================================
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (err) return res.status(400).json({ error: "user not found" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    //generate jwt
    const token = await user.generateAuthToken();
    return res.header("Authorization", token).json({ user });
  });
};
