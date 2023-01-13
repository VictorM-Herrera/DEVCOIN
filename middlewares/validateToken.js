//validar o verificar token, lo hacemos desde un middleware(rutas protegidas)
const jwt = require("jsonwebtoken");
const { decode } = require("punycode");

const validateToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    res.status(401).send({
      error: "You need an authorization token",
    });
    return;
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, `${process.env.TOKENJSW}`, (error, decoded) => {
      if (error) {
        return res.json({
          message: "Invalid Token",
        });
      } else {
        res.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = validateToken;
