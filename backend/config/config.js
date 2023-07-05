// config.js
require('dotenv').config();

const config = {
  mongoURI: process.env.ATLAS_URI,
  // Other configuration settings
};

module.exports = config;
