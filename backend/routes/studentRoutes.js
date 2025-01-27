const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerStudent,
  loginStudent,
  getStudentCourses,
  addCourse,
  updateCourse,
  dropCourse,
  getStudentProfile
} = require('../controllers/studentController');

// Public Routes
router.post('/register', registerStudent);
router.post('/login', loginStudent);

// Protected Routes
router.get('/profile', protect, getStudentProfile);
router.get('/courses', protect, getStudentCourses); // View all courses
router.post('/courses/add', protect, addCourse); // Add a course
router.put('/courses/update', protect, updateCourse); // Update a course
router.post('/courses/drop', protect, dropCourse); // Drop a course
router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
});

module.exports = router;
