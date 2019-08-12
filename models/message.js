const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required, true,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      required, true,
      maxlength: 50,
    },
    subject: {
      type: String,
      trim: true,
      required, true,
      maxlength: 50,
    },
    messageText: {
      type: String,
      trim: true,
      required, true,
    },
  }{timestatmps: true}
)
function validateMessage(category) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(50)
      .required(),
    subject: Joi.string()
      .min(5)
      .max(50)
      .required(),
    messageText: Joi.string()
      .required(),
  };
  return Joi.validate(category, schema);
}

exports.Message = mongoose.model("Message", messageSchema)
exports.validateMessage = validateMessage