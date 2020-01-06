const jwt = require("jsonwebtoken");
// const secret = require('./secret');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secret = "this is my secret";

  if (authorization) {
    jwt.verify(authorization, secret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: "invalid token" })
      } else {
        req.token = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({ message: "Authorization is reqd" })
  }
};