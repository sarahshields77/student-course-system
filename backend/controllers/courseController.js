const Course = require('../models/courseModel');

exports.addCourse = async (req, res) => {
    const { courseCode, courseName, section, semester } = req.body;

    try {
        // Check if course exists
        const existingCourse = await Course.findOne({ courseCode });
        if (existingCourse) {
            return res.status(400).json({ message: 'Course already exists' });
        }

        // Create new course
        const course = new Course({
            courseCode,
            courseName,
            section,
            semester,
        });
        await course.save();

        res.status(201).json({
            message: 'Course added successfully',
            course,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listCourses = async (req, res) => {
  try {
    const courses = await Course.find(); // Get all courses
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

