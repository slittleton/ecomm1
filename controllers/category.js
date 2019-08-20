const { Category, validateCategory } = require("../models/category");

exports.createCategory = async (req, res) => {
  console.log(req.body);

  const { error } = validateCategory(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send({error:error.details[0].message})
  };
  
  const category = await new Category(req.body);


  await category.save((err, data) => {
    if (err) {
      console.log('ERROR', err);
      return res.status(400).json({ error: err });
    }
    res.json(data);
  });
};

exports.getCategories = async( req, res) => {
  Category.find()
  .sort()
  .exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "categories not found"
      });
    }
    res.json(categories);
  });
}
