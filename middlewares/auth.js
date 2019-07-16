const jwt = require("jsonwebtoken");
const config = require("../config/config");

const auth = function(req, res, next) {
  let token = req.headers.auth;

  if(!token) {
    return res.status(401).send("Token não enviado!");
  }

  jwt.verify(token, config.jwtPassword, function(error, decoded) {
    if(error) {
      return res.status(401).send("Token inválido!");
    }

    res.locals.authData = decoded;

    return next();
  });
}

module.exports = auth;