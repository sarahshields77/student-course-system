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
        <div>
            <h2>Admin Registration</h2>
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Register</button>
            </form>           
        </div>
    );
}

export default AdminRegisterForm;