const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 25
    }
  }
)

module.exports = mongoose.model('Category', categorySchema);