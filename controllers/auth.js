const {User, validateUser} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGN UP ============================================

exports.signUp = async (req, res, next) => {
  const {error} = validateUser(req.body);
  if(error){
    return res.status(400).json({error: error.details[0].message})
  }
  let user = await new User(req.body);
  //hash password and save to database
  user.password = await user.hashPassword(user.password);
  await user.save();
  user.password = undefined;

  console.log(user);
  //generate jwt
  const token = await user.generateAuthToken();
  return res.header("Authorization", token).json({ user });
};

// SIGN IN ============================================
exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (err) return res.status(400).json({ error: "user not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid email or password.");
    }
    user.password = undefined;

    //generate jwt
    const token = await user.generateAuthToken();
    return res.header("Authorization", token).json({ user });
  });
};

exports.checkAuth = async (req, res, next) => {
  const token = await req.header("Authorization");

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      // console.log('AUTH: ', decoded)
      req.auth = decoded;
    } else {
      return res.status(401).send("Unable to verify token");
    }
  } catch (ex) {
    return res.status(401).send("Invalid token");
  }
  next();
};

exports.checkAdmin = (req, res, next) => {
  if (req.auth.isAdmin) {
    // console.log('ADMIN CHECK: SUCCESS')
  } else {
    return res.status(401).send("Access Denied: user lacks admin privileges");
  }
  next();
};
