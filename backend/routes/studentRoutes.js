const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerStudent,
  loginStudent,
  getStudentCourses,
  addCourse,
  updateCourse,
  dropCourse
} = require('../controllers/studentController');

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

// View all courses taken by a student
router.get('/courses', protect, getStudentCourses);

// Add a course
router.put('/courses', protect, addCourse);

// Update a course
router.put('/courses', protect, updateCourse);

// Drop a course
router.delete('/courses', protect, dropCourse);

module.exports = router;
