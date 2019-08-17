const { Product, validateProduct } = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const queryString = require("query-string");

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
exports.createProduct = async (req, res) => {
  const form = await new formidable.IncomingForm();
  form.keepExtensions = true;

  //####TODO FIX JOI VALIDATION - CURRENTLY NOT WORKING ON  form or product
  // const {error } = validateProduct(form);
  // if(error){return res.status(400).send(error.details[0].message)}

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "image could not be uploaded" });
    }

    const { name, category, description, price, quantity, sold } = fields;

    if (!name || !category || !description || !price || !quantity || !sold) {
      return res.status(400).json({ error: "all fields are required" });
    }

    const product = await new Product(fields);

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
  console.log(req.query.price);

  let query = {};

  if (req.query.searchTerm) {
    query.name = { $regex: req.query.searchTerm, $options: "i" };
  }
  if (req.query.category) {
    query.category = req.query.category;
  }

  // TODO MONGOOSE QUERY BY PRICE RANGE
  // if (req.query.price) {
  //   query.price = {
  //     $gte: parseInt(query.price[0]),
  //     $lte: parseInt(query.price[1])
  //   };
  // }

  console.log('QUERY', query)
  // Product.find(query, (err, products) => {
  //   if (err) {
  //     return res.status(400).json({ error: errorHandler(err) });
  //   }

  //   console.log(products);

  //   // res.json({products: products}).select("-photo")
  //   res.json(query);
  // });

  res.json(query)



  // if (req.query.search) {
  //   query.name = { $regex: req.query.search, $options: "i" };
  //   // assigne category value to query.category
  //   if (req.query.category && req.query.category != "All") {
  //     query.category = req.query.category;
  //   }
  //   // find the product based on query object with 2 properties
  //   // search and category
  //   Product.find(query, (err, products) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: errorHandler(err)
  //       });
  //     }

  //     res.json({products: products});
  //   }).select("-photo");
  // }
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
exports.decreaseQuantity = (req, res, callback) => {
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
    callback();
  });
};
