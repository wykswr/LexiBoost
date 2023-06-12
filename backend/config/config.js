// config.js
require('dotenv').config();

const config = {
    mongoURI: process.env.ATLAS_URI,
    hello: "hello"
    // Other configuration settings
};
module.exports = config;
