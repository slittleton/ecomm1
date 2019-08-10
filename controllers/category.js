const { Category, validateCategory } = require("../models/category");

exports.createCategory = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category(req.body);

  await category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(data);
  });
};
