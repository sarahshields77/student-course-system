const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to request object
    req.user = decoded;

    next(); // continue to next middleware or controller
  } catch (error) {
      res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};

module.exports = { protect };
