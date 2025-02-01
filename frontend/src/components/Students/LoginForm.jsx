import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/api';


function LoginForm() {
    const [formData, setFormData] = useState({ studentNumber: '', password: ''});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { setUser } = useAuth(); // use context to manage logged-in user state
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/students/login', formData);
            alert(response.data.message);

            // set user in context and redirect to the dashboard
            setUser(response.data.student);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
     };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Student Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Student Number</label>
                                <input
                                    type="text"
                                    name="studentNumber"
                                    className="form-control"
                                    value={formData.studentNumber}
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

export default LoginForm;