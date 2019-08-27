const { Product, validateProduct } = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({ error: "product not found" });
      }
      req.product = product;
      next();
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
exports.createProduct = async (req, res) => {
  const form = await new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "image could not be uploaded" });
    }

    const { error } = validateProduct(fields);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, category, description, price, quantity } = fields;

    if (!name || !category || !description || !price || !quantity) {
      return res.status(400).json({ error: "all fields are required" });
    }

    console.log("CATEGORY", category)
    const product = await new Product(fields);
    console.log('PRODUCT', product);

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
    res.json({message:"Product Successfully Deleted "});
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
      res.json({ message: "Product Updated Successfully" });
    });
  });
};

// SEARCH PRODUCTS ============================================================
exports.productsSearch = (req, res) => {
  console.log(req.query.price);

  let query = {};
  // ready query for search
  if (req.query.searchTerm) {
    query.name = { $regex: req.query.searchTerm, $options: "i" };
  }
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.price) {
    query.$and = [
      { price: { $lte: parseInt(req.query.price[1]) } },
      { price: { $gte: parseInt(req.query.price[0]) } }
    ];
  }
  // search for products using query
  Product.find(query, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ products: products });
  }).select("-photo");
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
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found"
        });
      }
      res.json(products);
    });
};

// SUBTRACT FROM QUANTITY ====================================================
exports.decreaseQuantity = (req, res, next) => {
  console.log('DECREASE QUANTITY')
  let bulkOps = req.body.order.products.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } }
      }
    };
  });
  Product.bulkWrite(buldOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({ error: "Could not update product" });
    }
    next();
  });
};
