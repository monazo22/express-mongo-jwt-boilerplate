const jwt = require("jsonwebtoken");
const config = require("../config");

exports.getEmailFromToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, config.secret);
  const { email } = decoded;
  return email;
};
