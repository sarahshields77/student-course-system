import React, { useState, useEffect } from 'react';
import axios from '../../api/api';

function AdminListCourses() {
   const [courses, setCourses] = useState([]);
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("/admins/courses");
                setCourses(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg p-4">
                        <h2>List of Courses</h2>
                        {courses.length === 0 ? (
                            <p>No courses found.</p>
                        ) : (
                            <table className="table table-bordered mt-3">
                                <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Course Name</th>
                                        <th>Section</th>
                                        <th>Semester</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course) => (
                                        <tr key={course._id}>
                                            <td>{course.courseCode}</td>
                                            <td>{course.courseName}</td>
                                            <td>{course.section || "N/A"}</td>
                                            <td>{course.semester || "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminListCourses;
