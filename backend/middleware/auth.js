
const jwt = require('jsonwebtoken');
const {TOKEN_KEY} = require('../config/config');

const verifyToken = (req, res, next) => {
  const authCookie = req.headers.cookie?.split(';').find((cookie) => cookie.trim().startsWith('authorization='));
  const tokenFromCookie = authCookie?.split('=')[1];
  const token =
        req.body.token || req.query.token ||
        req.headers['authorization'] || tokenFromCookie;

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    decoded.id = decoded.id.toString();
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = verifyToken;
