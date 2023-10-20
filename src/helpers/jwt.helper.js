const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports.generateToken = function(registeredUser) {
  return sign(registeredUser, JWT_SECRET, { expiresIn: "4h" });
};
