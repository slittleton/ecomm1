const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET USER BY ID =========================================================
exports.userById = (req, res, next) => {
  const _id = req.auth._id;

  User.findById(_id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "user not found" });
    }
    req.profile = user;

    next();
  });
};

// UPDATE USER PROFILE ====================================================
exports.updateUser = async (req, res) => {
  //////////// UPDATE PASSWORD //////////////
  if (req.body.password) {
    const { _id } = req.auth;
    await User.findOne({ _id }, async (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that email does not exist. Please signup"
        });
      }

      const validPassword = await bcrypt.compare(
        req.body.password.oldPassword,
        user.password
      );
      console.log("VALID", validPassword);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid email or password." });
      }
      user.password = undefined;

      // if password changed then hash and save new password
      const hashPass = await User.hashPassword(req.body.password.newPassword);

      user.password = hashPass;
      console.log("USER", user);
      await user.save();
      user.password = undefined;

      return res.json({
        passwordUpdate: { message: "Password Successfully Updated" }
      });
    });
  } else {
    /////////// UPDATE USER INFO/////////////
    let user = req.profile;
    user = Object.assign(user, req.body);

    user.save((err, data) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      if (req.body.address) {
        res.json({
          addressUpdated: { message: "User Address Updated Successfully" }
        });
      } else {
        res.json({ userInfo: { message: "User Info Updated Successfully" } });
      }
    });
  }
};

// GET USER ==============================================================
exports.getUser = (req, res) => {
  const { name, email, history, isAdmin, _id, address } = req.profile;
  const user = { name, email, history, isAdmin, _id, address };
  res.json(user);
};

// GET USER ORDER HISTORY =========================================
exports.userOrders = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name address")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(orders);
    });
};

// ADD ORDER TO USER ORDERS ======================================
exports.addToUserOrderHistory = (req, res, next) => {
  let orderItems = [];
  console.log("BODY ORDER", req.body.order)

  req.body.order.forEach(item => {
    orderItems.push({
      _id: item.product._id,
      name: item.product.name,
      category: item.product.category,
      description: item.product.description,
      price: item.product.price,
      count: item.count
    });
  });

  let userOrder = {
    orderTotal: req.body.orderTotal,
    products: orderItems,
    date: new Date()
  };

  let user = req.profile;

  user.history = [...user.history, userOrder];
  // user.history = []; // Clear user history


  req.body.order = {userOrder, user}

  // console.log("USER ORDER", userOrder);
  // console.log("UPDATED USER HISTORY", user);
  user.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
  });

  next();
};
