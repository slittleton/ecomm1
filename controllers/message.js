const { Message, validateMessage } = require("../models/message");

exports.receivedMessage = async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const message = new Message(req.body);

  await message.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(data);
  });
};