import React, { useState, useEffect } from "react";
import axios from "../../api/api";

function AdminListStudentsByCourse() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch available courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("/admins/courses");
                setCourses(response.data);
            } catch (err) {
                setError("Failed to fetch courses");
            }
        };
        fetchCourses();
    }, []);

    // Fetch students enrolled in the selected course
    const fetchStudents = async () => {
        if (!selectedCourse) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/admins/courses/${selectedCourse}/students`);
            setStudents(response.data);
        } catch (err) {
            setError("Failed to fetch students for this course");
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">View Students by Course</h2>
                        <div className="mb-3">
                            <label className="form-label">Select a Course:</label>
                            <select
                                className="form-select"
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                            >
                                <option value="">-- Select a Course --</option>
                                {courses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course.courseCode} - {course.courseName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-secondary" onClick={fetchStudents} disabled={!selectedCourse}>
                                Get Students
                            </button>
                        </div>
                        {loading && <p>Loading students...</p>}
                        {error && <p className="text-danger">{error}</p>}

                        {students.length > 0 && (
                            <div className="mt-4">
                                <h3>Students Enrolled in {courses.find(c => c._id === selectedCourse)?.courseName || "this course"}:</h3>
                                <table className="table table-bordered mt-3">
                                    <thead>
                                        <tr>
                                            <th>Student Number</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student._id}>
                                                <td>{student.studentNumber}</td>
                                                <td>{student.firstName} {student.lastName}</td>
                                                <td>{student.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminListStudentsByCourse;
