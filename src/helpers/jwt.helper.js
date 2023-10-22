const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports.generateToken = function(user) {
  return sign({
    id: user.id,
    email: user.email,
    }, JWT_SECRET, { expiresIn: "4h" });
};
