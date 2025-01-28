import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/api";

function AdminLoginForm() {
    const [formData, setFormData] = useState({ adminId: "", password: "" });
    const [error, setError] = useState(null);
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
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Admin ID</label>
                    <input
                        type="text"
                        name="adminId"
                        value={formData.adminId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLoginForm;
