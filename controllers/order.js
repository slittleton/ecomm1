const { Order } = require("../models/order");

// ORDER BY ID  =====================================================
exports.orderById = (req, res, callback, id) => {
  // console.log('ORDER BY ID', id)
  Order.findById(id)

    .populate("products.product", "name, price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({ error: err });
      }
      req.order = order;
      callback();
    });
};

// CREATE ORDER =====================================================
exports.createOrder = async (req, res, next) => {
  let newOrder = {
    products: req.body.order.userOrder.products,
    amount: req.body.order.userOrder.orderTotal,
    address: req.body.order.user.address,
    user: req.body.order.user._id
  };
  const order = await new Order(newOrder);

  order.save((error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        error
      });
    }
    console.log("DATA", data);
    res.json({ data });
  });
};

// GET LIST OF ORDERS ===============================================
exports.getOrdersList = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(error) });
      }
      res.json(orders);
    });
};

// ORDER STATUS VALUES ==============================================
exports.getOrderStatusList = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

// UPDATE ORDER STATUS ==============================================
exports.updateOrderStatus = (req, res) => {
  Order.updateOne(
    { _id: req.order._id },
    { $set: { status: req.body.orderStatus } },
    (err, order) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(order);
    }
  );
};
