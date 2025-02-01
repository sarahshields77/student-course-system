import React, { useState, useEffect } from "react";
import axios from "../../api/api";

function AddCourseForm() {
    const [availableCourses, setAvailableCourses] = useState([]); 
    const [selectedCourse, setSelectedCourse] = useState(""); 
    const [success, setSuccess] = useState(null); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("/courses/list"); 
                setAvailableCourses(response.data);
            } catch (error) {
                setError("Error fetching courses");
            }
        };
        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/students/courses/add", { courseId: selectedCourse });
            setSuccess(response.data.message); 
            setError(null); 
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred"); 
            setSuccess(null); 
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h3 className="text-center mb-4">Add a Course</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Select a Course</label>
                                <select
                                    className="form-select"
                                    value={selectedCourse} 
                                    onChange={(e) => setSelectedCourse(e.target.value)} 
                                    required
                                >
                                    <option value="">-- Select a Course --</option>
                                    {availableCourses.map((course) => (
                                        <option key={course._id} value={course.courseCode}>
                                            {course.courseCode} - {course.courseName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-secondary">Add Course</button>
                            </div>
                            {success && <p className="text-success mt-2">{success}</p>}
                            {error && <p className="text-danger mt-2">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCourseForm;
