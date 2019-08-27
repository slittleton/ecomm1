const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { addressSchema } = require("./address");

// CART ITEM MODEL ================================
const cartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    name: {
      type: String,
      required: true,
      maxlength: 50
    },
    price: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

// ORDER SCHEMA =================================
const orderSchema = new mongoose.Schema(
  {
    products: [cartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: addressSchema,
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    updated: Date,
    user: { type: ObjectId, ref: "User", required: true }
  },
  { timeStamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, CartItem };
