const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log('No token provided'); // For debugging, not an error
    return res.status(403).json({ message: 'Forbidden: No token provided' });
}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token to req.user
    console.log('Decoded token:', decoded);
    next(); // Proceed to the next middleware or controller
} catch (error) {
    console.error('Invalid token:', error); // Log the invalid token
    res.status(403).json({ message: 'Forbidden: Invalid token' });
}
};

module.exports = { protect };