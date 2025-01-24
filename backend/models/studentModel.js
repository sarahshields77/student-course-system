const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: String,
  city: String,
  phone: String,
  email: { type: String, required: true, unique: true },
  program: String,
  favouriteTopic: String,  // Custom field 1
  strongestSkill: String, // Custom field 2
});

module.exports = mongoose.model('Student', studentSchema);
