// app.js (or wherever you set up your Express app)

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// app.js (or wherever your route handlers are)

const { login } = require('./authResolver'); // Import your login function

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const { token, refreshToken } = await login(username, password);

        // Set HTTP-only cookie containing the refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'strict' // Adjust as needed based on your requirements
        });
        res.clearCookie('refreshToken'); // Clear refresh token cookie
        
        // Send access token in response body
        res.json({ token });
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(400).json({ message: 'Login failed' });
    }
});


// Use cookie parser middleware
app.use(cookieParser());
