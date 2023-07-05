const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const {TOKEN_KEY} = require("../config/config");

// Function to generate an authentication token
function generateAuthToken(id) {
    // Generate a token with the user's ID as the payload
    const token = jwt.sign(
        { id: id },
        //TODO Set up a TOKEN_KEY env variable in docker
        TOKEN_KEY,
        {
            expiresIn: '2h',
        }
    );

    return token;
}

module.exports = generateAuthToken;