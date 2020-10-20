const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../api/config.js');

module.exports = (req, res, next) => {
  // verifying user is logged in
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token. jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ error: 'you do not have permission' });
      } else {
        // valid token
        req.jwt = token;
        next();
      }
    })
  } else {
    res.status(401).json({ error: 'there is no token associated' });
  }
}