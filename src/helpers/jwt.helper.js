const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports.generateToken = function(user, registeredUser) {
  return sign({
    email: user.email,
    password: registeredUser.password
    }, JWT_SECRET, { expiresIn: "4h" });
};
