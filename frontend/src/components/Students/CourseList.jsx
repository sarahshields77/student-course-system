import React, { useState, useEffect } from "react";
import axios from "../../api/api";

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Use the protected endpoint to fetch courses for the logged-in student
                const response = await axios.get("/students/courses");
                setCourses(response.data); // This assumes your endpoint returns an array of courses
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching courses");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">Error: {error}</p>;

    return (
        <div>
            <h2>My Courses</h2>
            {courses.length > 0 ? (
                <ul className="list-group">
                    {courses.map((course) => (
                        <li key={course._id} className="list-group-item">
                            <strong>{course.courseCode}</strong> - {course.courseName} ({course.section})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have not added any courses yet.</p>
            )}
        </div>
    );
}

export default CourseList;
