// config.js
require('dotenv').config();

const config = {
  mongoURI: process.env.ATLAS_URI,
  TOKEN_KEY: process.env.TOKEN_KEY
  // Other configuration settings
};

module.exports = config;
