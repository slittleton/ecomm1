const { Message, validateMessage } = require("../models/message");

exports.messageById = (req, res, callback, id) => {
  Message.findById(id).exec((err, message) => {
    if (err || !message) {
      return res.status(400).json({ error: "message not found" });
    }
    req.message = message;
    callback();
  });
};

exports.postMessage = async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) { return res.status(400).json({ error: error.details[0].message })};

  const message = await new Message(req.body);

  await message.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(data);

  });

};

exports.getMessages = async (req, res) => {
  Message.find()
    .sort()
    .exec((err, message) => {
      if (err) {
        return res.status(400).json({
          error: "message not found"
        });
      }
      res.json(message);
    });
};

exports.deleteMessage = async (req, res) => {
  req.message.remove((err, deletedmessage) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.send("message deleted");
  });
};
