import React, { useState } from "react";
import axios from "../../api/api";

function AdminAddStudent() {
    const [formData, setFormData] = useState({
        studentNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/admins/students/add", formData);
            setSuccess(response.data.message);
            setError(null);
            setFormData({
                studentNumber: "",
                password: "",
                firstName: "",
                lastName: "",
                email: "",
            });
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
            setSuccess(null);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Add a New Student</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Student Number</label>
                    <input
                        type="text"
                        name="studentNumber"
                        value={formData.studentNumber}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                {success && <p className="text-success">{success}</p>}
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">Add Student</button>
            </form>
        </div>
    );
}

export default AdminAddStudent;
