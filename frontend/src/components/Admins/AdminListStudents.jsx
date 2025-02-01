import React, { useState, useEffect } from "react";
import axios from "../../api/api";

function AdminListStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("/admins/students");
                setStudents(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch students");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">List of Students</h2>
                        {students.length === 0 ? (
                            <p>No students found.</p>
                        ) : (
                            <table className="table table-bordered mt-3">
                                <thead>
                                    <tr>
                                        <th>Student Number</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Program</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student) => (
                                        <tr key={student._id}>
                                            <td>{student.studentNumber}</td>
                                            <td>{student.firstName} {student.lastName}</td>
                                            <td>{student.email}</td>
                                            <td>{student.program || "N/A"}</td>
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

export default AdminListStudents;