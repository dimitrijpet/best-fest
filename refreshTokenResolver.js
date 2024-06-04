// refreshTokenResolver.js

const { verifyRefreshToken, generateToken } = require('./auth');

async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken; // Access refresh token from HTTP-only cookie

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }

    try {
        const user = await verifyRefreshToken(refreshToken);
        if (user) {
            // Refresh token is valid, issue new JWT token
            const token = generateToken(user);
            return res.json({ token });
        } else {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
    } catch (error) {
        console.error('Error refreshing token:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    refreshToken
};
