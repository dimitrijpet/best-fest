// middleware.js

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config'); // Import your JWT secret key

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Authentication required' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decoded; // Attach decoded user information to request object
        next();
    });
}

module.exports = {
    authenticateToken
};
