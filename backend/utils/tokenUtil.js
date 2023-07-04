const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

// Function to generate an authentication token
function generateAuthToken() {
    // Generate a token with the user's ID as the payload
    const token = jwt.sign(
        { id: uuid() },
        process.env.TOKEN_KEY,
        {
            expiresIn: '2h',
        }
    );

    return token;
}

module.exports = generateAuthToken;