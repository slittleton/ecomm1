const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50
  },
  street: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100
  },
  city: {
    type: String,
    trim: true,
    required: true,
    maxlength: 25
  },
  state: {
    type: String,
    trim: true,
    required: true,
    maxlength: 25
  },
  zipcode: {
    type: String,
    trim: true,
    required: true,
    maxlength: 15
  }
});

exports.addressSchema = addressSchema;
exports.Address = mongoose.model("Address", addressSchema);
