const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Assuming you have a User model

exports.isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Please provide a valid token' });
        }

        const token = authHeader.split(' ')[1];

        // Verify the token
        const decodedData = jwt.verify(token, 'abdullah');

        // Find the user based on the decoded user ID
        const user = await User.query().findById(decodedData.id);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Attach the user object to the request
        req.user = user;

        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
