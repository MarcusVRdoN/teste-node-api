const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const creatUserToken = function(userId) {
  return jwt.sign({ id: userId}, config.jwtPassword, { expiresIn: config.jwtExpiresIn });
}

module.exports = {
  criarTokenUsuario: creatUserToken
};