const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");

exports.productById = (req, res, callback, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({ error: "product not found" });
      }
      req.product = product;
      callback();
    });
};

// GET PRODUCT =========================================================
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// GET PHOTO ===========================================================
exports.productPhoto = (req, res) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
};

// CREATE PRODUCT =======================================================
exports.createProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "image could not be uploaded" });
    }

    const { name, category, description, price, quantity, sold } = fields;

    if (!name || !category || !description || !price || !quantity || !sold) {
      return res.status(400).json({ error: "all fields are required" });
    }

    const product = new Product(fields);

    // Handle Uploaded Photo
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: "photo must be less than 1mb" });
      }
    }
    product.photo.data = fs.readFileSync(files.photo.path);
    product.photo.contentType = files.photo.type;

    product.save((err, data) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json(data);
    });
  });
};

// DELETE PRODUCT =======================================================

exports.deleteProduct = (req, res) => {
  // productById runs on params in routes/product.js
  // and sets product info in req.product
  req.product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.send("product deleted");
  });
};

// UPDATE PRODUCT =======================================================

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    //files refers to the uploaded image
    if (err) {
      return res.status(400).json({ error: "error uploading image" });
    }

    let product = req.product; // original product info
    //product properties reassigned to properites from update (ie fields)
    product = Object.assign(product, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: "photo must be less than 1mb" });
      }

      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, data) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.json({ message: "Update Successful" });
    });
  });
};

// SEARCH PRODUCTS ============================================================
exports.productsSearch = (req, res) => {
  const query = {};

  if (req.query.search) {
    // search item titles
    query.name = { $regex: req.query.search, $options: "i" };
  }
  if (req.query.category && req.query.category !== "ALL") {
    //search by category
    query.category = req.query.category;
  }

  Product.find(query, (err, products) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(products);
  }).select("-photo"); // do not send photo, use productPhoto() to get photo
};

// GET PRODUCTS ================================================================
exports.productsList = (req, res) => {
  const order = req.query.order ? req.query.order : "asc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  // const limit = req.query.limit ? parseInt(req.query.limit) : 12;

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .exec((err, products)=>{
      if(err){
        return(res.status(400).json({
          error: "Products not found"
        }))
      }
      res.json(products)
    })

};


// SUBTRACT FROM QUANTITY ====================================================
exports.decreaseQuantity = (req, res, callback) => {
  let bulkOps = req.body.order.products.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count}}
      }
    }
  })
  Product.bulkWrite(buldOps, {}, (error, products)=> {
    if(error) {
      return res.status(400).json({error: "Could not update product"})
    }
    callback();
  })
}