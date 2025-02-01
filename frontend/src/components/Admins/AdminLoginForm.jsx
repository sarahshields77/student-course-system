import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/api";

function AdminLoginForm() {
    const [formData, setFormData] = useState({ adminId: "", password: "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/admins/login", formData);
            alert(response.data.message);
    
            // Set user in context with isAdmin flag
            setUser({ ...response.data.admin, isAdmin: true });
            console.log("Admin Set in Context:", { ...response.data.admin, isAdmin: true });
    
            navigate("/admin-dashboard");
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Admin Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Admin ID</label>
                                <input
                                    type="text"
                                    name="adminId"
                                    className="form-control"
                                    value={formData.adminId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            {success && <div className="alert alert-success mt-3">{success}</div>}
                            <div className="text-center">
                                <button type="submit" className="btn btn-secondary w-25">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLoginForm;
