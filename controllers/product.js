const Product = require('../models/product');


exports.productById = (req, res, callback, id) => {
  Product.findById(id)
    .populate('category')
    .exec((err, product)=> {
      if(err || !product) {
        return res.status(400).json({error: "product not found"})
      }
      req.product = product;
      callback();
    })
    
}

exports.createProduct = (req, res) => {

console.log(req.body)


// use product model to save product to database
  res.send('ok')
} 