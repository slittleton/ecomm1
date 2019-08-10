const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { addressSchema } = require('./address')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
      unique: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    salt: String,
    isAdmin: {
      type: Boolean,
      default: false
    },
    history: {
      type: Array,
      default: []
    },
    address: {
      type: addressSchema
    }
  },
  { timestamps: true }
);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().min(7).max(50).required(),
    password: Joi.string().min(1).max(50).required()
  }
  return Joi.validate(user, schema)
}


userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
  return token;
};
userSchema.methods.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
userSchema.statics.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

exports.User = mongoose.model("User", userSchema);
exports.validateUser = validateUser;
