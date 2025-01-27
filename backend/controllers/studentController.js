const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerStudent = async (req, res) => {
    const { studentNumber, password, firstName, lastName, address, city, phone, email, program, favouriteTopic, strongestSkill } = req.body;
    
    try {
        // check if student exists
        const existingStudent = await Student.findOne({ studentNumber });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Raw password:', password);
        console.log('Hashed password:', hashedPassword);

        // create new student
        const student = await Student.create({
            studentNumber,
            password: hashedPassword,
            firstName,
            lastName,
            address,
            city,
            phone,
            email,
            program,
            favouriteTopic,
            strongestSkill
        });

        res.status(201).json({
            message: 'Student registered successfully',
            student: {
                id: student._id,
                studentNumber: student.studentNumber,
                firstName: student.firstName,
                lastName: student.lastName,
                address: student.address,
                city: student.city,
                phone: student.phone,
                email: student.email,
                program: student.program,
                favouriteTopic: student.favouriteTopic,
                strongestSkill: student.strongestSkill
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
exports.loginStudent = async (req, res) => {
    const { studentNumber, password } = req.body;

    try {
        const student = await Student.findOne({ studentNumber });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT with role
        const token = jwt.sign(
            { id: student._id, role: 'student' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true }).json({
            message: 'Logged in successfully',
            student: { id: student._id, studentNumber: student.studentNumber },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentProfile = async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Forbidden: Not a student' });
        }

        const student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ user: student });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student profile' });
    }
};

exports.getStudentCourses = async (req, res) => { 
    try {
        const student = await Student.findById(req.user.id).populate('courses');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student.courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addCourse = async (req, res) => { 
    const { courseId } = req.body;
    try {
        const student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // check if course exists in the Courses collection
        const course = await Course.findOne({ courseCode: courseId });
        if (!course) {
            return res.status(404).json({ message: 'Course not found in database' });
        }

        // check if course is already linked to the student
        if (student.courses.includes(course._id)) {
            return res.status(400).json({ message: 'Course already added to student' });
        }

        student.courses.push(course._id);
        await student.save();

        res.status(200).json({ message: 'Course added successfully to the student', courses: student.courses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCourse = async (req, res) => { 
    const { courseId, newSection } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        course.section = newSection;
        await course.save();

        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.dropCourse = async (req, res) => {
    const { courseId } = req.body; // courseId is expected to be the courseCode (e.g., COMP308)

    try {
        // Find the student and populate their courses
        const student = await Student.findById(req.user.id).populate('courses');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        console.log("Student before dropping course:", student.courses);

        // Find the course object by courseCode
        const course = await Course.findOne({ courseCode: courseId });
        if (!course) {
            return res.status(404).json({ message: 'Course not found in database' });
        }
        console.log("Course to be dropped:", course);

        // Filter out the course from the student's courses array
        student.courses = student.courses.filter(
            (existingCourse) => existingCourse._id.toString() !== course._id.toString()
        );
        console.log("Student after filtering courses:", student.courses);

        // Save the updated student record
        await student.save();

        res.status(200).json({ message: 'Course dropped successfully', courses: student.courses });
    } catch (error) {
        console.error("Error dropping course:", error.message);
        res.status(500).json({ error: error.message });
    }
};


