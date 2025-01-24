const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// Routes for student operations
router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
});

// Protected routes
router.get('/profile', protect, (req, res) => {
  res.json({ 
    message: 'This is your profile',
    user: req.user, // access the decoded JWT payload here
   });
});

module.exports = router;
