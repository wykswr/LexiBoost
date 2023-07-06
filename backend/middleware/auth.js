const jwt = require('jsonwebtoken');
const {TOKEN_KEY} = require('../config/config');

const verifyToken = (req, res, next) => {
  // const token =
  //       req.body.token || req.query.token ||
  //       req.headers['authorization']?.slice(7);
  //
  // if (!token) {
  //   return res.status(403).send('A token is required for authentication');
  // }
  // try {
  //   // TODO Set up a TOKEN_KEY env variable in docker
  //   const decoded = jwt.verify(token, TOKEN_KEY);
  //   decoded.id = decoded.id.toString();
  //   req.user = decoded;
  // } catch (err) {
  //   console.log(err);
  //   return res.status(401).send('Invalid Token');
  // }
  req.user = {
    id: '64a70a6e426d71fcc0486ebc',
  };
  return next();
};

module.exports = verifyToken;
