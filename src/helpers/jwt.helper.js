const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const generateToken = function(user) {
  return sign({
    id: user.id,
    email: user.email,
    }, JWT_SECRET, { expiresIn: "4h" });
};

const generateRecoverToken = function(user) {
  return sign({
    email: user.email,
    }, JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { generateToken, generateRecoverToken };