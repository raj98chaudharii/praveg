
// Import required modules
const jwt = require('jsonwebtoken'); // JSON Web Token for authentication
require('dotenv').config(); // Load environment variables from .env file

// Middleware function to authenticate requests
module.exports = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token = req.header('Authorization');

  // If no token is provided, deny access
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid token errors
    res.status(401).json({ message: 'Invalid token' });
  }
};
