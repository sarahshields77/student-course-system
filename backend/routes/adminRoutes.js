const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { loginAdmin, addAdmin, getAdminProfile, addStudent, getAllStudents } = require('../controllers/adminController');

// Routes for admin operations
router.post('/register', addAdmin);
router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);
router.post('/students/add', protect, addStudent);
router.get('/students', protect, getAllStudents);
router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
});

module.exports = router;
