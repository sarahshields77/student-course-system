import React, { useState } from 'react';
import axios from "../api/api";

function AddCourseForm() {
    const [formData, setFormData] = useState({
        courseCode: "",
        courseName: "",
        section: "",
        semester: "",
    });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const response = await axios.post("/courses/add", formData);
            setMessage({ type: "success", text: response.data.message });
            setFormData({ courseCode: "", courseName: "", section: "", semester: "" });
        } catch (error) {
            setMessage({ 
                type: "error", 
                text: error.response?.data?.message || "An error occurred",
            });
        }
    };

    return (
        <div>
            <h2>Add a Course</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Course Code</label>
                    <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} required />
                </div>
                <div>
                    <label>Course Name</label>
                    <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Section</label>
                    <input type="text" name="section" value={formData.section} onChange={handleChange} required />
                </div>
                <div>
                    <label>Semester</label>
                    <input type="text" name="semester" value={formData.semester} onChange={handleChange} required />
                </div>
                <button type="submit">Add Course</button>
            </form>
            {message && (
                <p style={{ color: message.type === "success" ? "green" : "red" }}>{message.text}</p>
            )}
        </div>
    );
}

export default AddCourseForm;