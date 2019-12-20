/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
      const secret = process.env.JWT_SECRET;

      jwt.verify(authorization, secret, function(err, decodedToken) {
        if (err) {
          res.status(401).json({ you: 'shall not pass!' });
        } else {
          req.token = decodedToken;

          next();
        }
      });
    } else {
      res.status(400).json({ message: 'Login and try again, please.' });
    }
};
