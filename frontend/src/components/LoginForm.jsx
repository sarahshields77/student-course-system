import React, { useState } from "react";
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [formData, setFormData] = useState({ studentNumber: '', password: ''});
    const [error, setError] = useState(null);
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
            // save user info to state or local storage here

            // redirect to the dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
     };

    return (
        <div>
            <h2>Student Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Student Number</label>
                    <input
                        type="text"
                        name="studentNumber"
                        value={formData.studentNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;