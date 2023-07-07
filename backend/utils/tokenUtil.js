const jwt = require('jsonwebtoken');
const {TOKEN_KEY} = require('../config/config');

/**
 * Function to generate an authentication token
 * @param id
 * @returns {*}
 */
function generateAuthToken(id) {
  // Generate a token with the user's ID as the payload
  const payload = {
    id: id,
    timestamp: Date.now(),
  };

  // TODO: Set up a TOKEN_KEY environment variable in your environment
  const token = jwt.sign(payload, TOKEN_KEY, {
    expiresIn: '2h',
  });

  return token;
}

module.exports = generateAuthToken;
