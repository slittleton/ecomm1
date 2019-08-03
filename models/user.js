const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { addressSchema } = require('./address')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50
    },
    email: {
      type: String,
      trim: true,
      required: true
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

module.exports = mongoose.model("User", userSchema);
