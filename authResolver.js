// authResolver.js

const { authenticate } = require('./auth');
const { generateToken } = require('./auth');

// This function represents the logic for handling login requests
async function login(username, password) {
    const user = await authenticate(username, password);
    if (user) {
        // Authentication successful, generate token and refresh token
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        // Return both tokens to the client
        return { token, refreshToken };
    } else {
        throw new Error('Invalid username or password');
    }
}

// Placeholder function for generating JWT tokens (will be implemented later)
function generateRefreshToken(user) {
    // Implement logic to generate refresh token (e.g., using UUID or random string)
    return 'refresh_token_placeholder';
}

module.exports = {
    login
};
