import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/api';

function AdminRegisterForm() {
    const [formData, setFormData] = useState({
        adminId: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData); // For debugging
        try {
            const response = await axios.post('/admins/register', formData);
            setSuccess(response.data.message);
            setError(null);

            // Redirect to login after successful registration
            navigate('/admin-login');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            setSuccess(null);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Admin Registration</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Admin ID</label>
                                <input type="text" name="adminId" className="form-control"
                                    value={formData.adminId} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" className="form-control"
                                    value={formData.password} onChange={handleChange} required />
                            </div>

                            {/* Error & Success Messages */}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            {success && <div className="alert alert-success mt-3">{success}</div>}

                            {/* Submit Button */}
                            <div className="text-center">
                                <button type="submit" className="btn btn-secondary w-25">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminRegisterForm;