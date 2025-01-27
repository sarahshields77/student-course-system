import React, { useState, useEffect } from "react";
import axios from "../api/api";

function DropCourseForm() {
    const [courses, setCourses] = useState([]); // To hold the courses the student is enrolled in
    const [selectedCourse, setSelectedCourse] = useState(""); // Holds the selected course
    const [success, setSuccess] = useState(null); // For success messages
    const [error, setError] = useState(null); // For error messages

    // Fetch enrolled courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("/students/courses");
                setCourses(response.data); // Update state with enrolled courses
            } catch (err) {
                setError("Error fetching courses");
            }
        };
        fetchCourses();
    }, []);

    // Handle course drop submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/students/courses/drop", { courseId: selectedCourse });
            console.log("Response from backend:", response.data);
    
            setSuccess(response.data.message); // Show success message
            setError(null); // Clear errors
    
            // Fetch updated courses from backend
            const updatedCourses = await axios.get("/students/courses");
            setCourses(updatedCourses.data);
        } catch (err) {
            console.error("Error dropping course:", err.response?.data || err.message);
            setError(err.response?.data?.message || "An error occurred");
            setSuccess(null);
        }
    };
    
    if (!courses.length) return <p>You are not enrolled in any courses.</p>;

    return (
        <div>
            <h3>Drop a Course</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Select a Course to Drop</label>
                    <select
                        className="form-select"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        required
                    >
                        <option value="">-- Select a Course --</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course.courseCode}>
                                {course.courseCode} - {course.courseName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-danger">Drop Course</button>
                {success && <p className="text-success mt-2">{success}</p>}
                {error && <p className="text-danger mt-2">{error}</p>}
            </form>
        </div>
    );
}

export default DropCourseForm;

