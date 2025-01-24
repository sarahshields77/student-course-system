const Student = require('../models/studentModel');
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
        // Check if student exists
        const student = await Student.findOne({ studentNumber });
        if (!student) {
            console.log('Student not found', studentNumber);
            return res.status(404).json({ message: 'Student not found' });
        }

        // Verify password
        console.log('Password provided:', password);
        console.log('Hashed password in DB:', student.password);

        const isMatch = await bcrypt.compare(password, student.password);
        console.log('Password match:', isMatch);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send token as an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true }).json({
            message: 'Logged in successfully',
            student: {
                id: student._id,
                studentNumber: student.studentNumber,
                firstName: student.firstName,
                lastName: student.lastName,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  