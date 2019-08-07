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
  console.log(req.body)

  res.send("Order Created")
}

// GET LIST OF ORDERS ===============================================
exports.listOrders =(req,res) => {
  Order.find()
    .populate('user', "_id name address")
    .sort('-created')
    .exec((err,orders) => {
      if(err){return res.status(400).json({error: errorHandler(error)})};
      res.json((orders))
    })

}

// ORDER STATUS VALUES ==============================================
exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
}

// UPDATE ORDER STATUS ==============================================
exports.updateOrderStatus = (req, res) => {
  Order.update(
    {_id: req.body.orderId },
    { $set: {status: req.body.status }},
    (err, order) => {
      if(err) {
        return res.status(400).json({error: err})
      }
      res.json(order)
    }
  )
}