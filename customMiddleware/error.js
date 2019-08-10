const winston = require("winston");
module.exports = function(err, req, res, next) {
  // Log Exception

  // other types of msgs error, warn, info,verbose,debug,silly
  winston.error(err.message, err);
  console.log(err);
  res.status(500).json({ error: `${err}` });
};
