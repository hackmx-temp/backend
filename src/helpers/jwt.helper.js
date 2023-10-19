const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports.generateToken = function(user) {
  const payload = {
    id: user.id,
    is_leader: user.is_leader,
  }
  return sign(payload, JWT_SECRET, { expiresIn: "4h" });
};
