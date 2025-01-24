const express = require('express');
const router = express.Router();
const { addCourse, listCourses } = require('../controllers/courseController');

// Routes for course operations
router.post('/add', addCourse);
router.get('/list', listCourses);

module.exports = router;
