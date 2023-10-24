const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const generateToken = function(user) {
  return sign({
    id: user.id,
    email: user.email,
    }, JWT_SECRET, { expiresIn: "4h" });
};

module.exports = generateToken;