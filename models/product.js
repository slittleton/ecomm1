const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Joi = require("@hapi/joi");


const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 50
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    description: {
      type: String,
      required: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0
    },
    sold: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    categoryId: Joi.string().required(),

    description: Joi.string().min(5).max(100),
    price: Joi.number(),
    quantity: Joi.number(),
    sold: Joi.number(),

  }
}
exports.Product = mongoose.model("Product", productSchema);
exports.validateProduct = validateProduct;
