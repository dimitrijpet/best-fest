// auth.js

const bcrypt = require('bcrypt');

// Mock user database
const users = [
    { id: 1, username: 'user1', password: '$2b$10$R9jSCdAv/8m52RK8CXexjO96zPwGz5yBRMAyeEs2gBK28NyIRLx9u' } // hashed password: 'password'
];

async function authenticate(username, password) {
    const user = users.find(u => u.username === username);
    if (!user) return null;

    if (await bcrypt.compare(password, user.password)) {
        return user;
    } else {
        return null;
    }
}
const jwt = require('jsonwebtoken');

// Your JWT secret key (keep it secret and safe)
const JWT_SECRET = '7468ecde0e8181fd4b5932613193ff52a2fc700101302cf4025e77b057dd64a0'; // Replace with your actual secret key

function generateToken(user) {
    return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
}

function verifyRefreshToken(refreshToken) {
    // Implement logic to verify the refresh token (e.g., check against a database)
    // For simplicity, we'll assume the refresh token is valid if it's not empty
    if (refreshToken) {
        // Retrieve user information from the refresh token (if applicable)
        // For now, we'll return a mock user object
        return { id: 1, username: 'user1' };
    } else {
        return null;
    }
}

module.exports = {
    authenticate,
    generateToken,
    verifyRefreshToken
};
