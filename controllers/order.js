const { Order, Cartitem } = require('../models/order');


// ORDER BY ID  =====================================================
exports.orderById = (req, res, callback, id) => {
  Order.findById(id)
  .populate("products.product", "name, price")
  .exec((err, order) => {
    if(err||!order){ return res.status(400).json({error: err})}

    req.order = order;
    callback()
  })
}

// CREATE ORDER =====================================================
exports.createOrder = (req,res) => {


  res.send("Order Created")
}

// GET LIST OF ORDERS ===============================================

// ORDER STATUS VALUES ==============================================

// UPDATE ORDER STATUS ==============================================