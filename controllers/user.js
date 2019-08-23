const { User, validateUser } = require("../models/user");

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

  if (req.body.password) {
    // if password changed then hash and save new password
    const hashPass = await User.hashPassword(req.body.password);
    req.body.password = hashPass;
  }

  let user = req.profile;
  user = Object.assign(user, req.body);

  user.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ message: "User Updated Successfully" });
  });
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
  let history = [];

  req.body.order.products.forEach(order => {
    history.push({
      _id: order._id,
      name: order.name,
      category: order.category,
      description: order.description,
      price: order.price,
      quantity: order.quantity,
      orderTotal: req.order.orderTotal
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile.id },
    { $push: { history: history } },
    { new: true },
    (err, info) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
    }
  );
};
