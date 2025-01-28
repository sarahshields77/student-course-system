import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/api";

function RegisterForm() {
    const [formData, setFormData] = useState({
        studentNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        phone: "",
        email: "",
        program: "",
        favouriteTopic: "",
        strongestSkill: "",
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
        try {
            const response = await axios.post("/students/register", formData);
            setSuccess(response.data.message);
            setError(null);

            // Redirect to login after successful registration
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Student Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Student Number</label>
                    <input
                        type="text"
                        name="studentNumber"
                        value={formData.studentNumber}
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
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Program</label>
                    <input
                        type="text"
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Favourite Topic</label>
                    <input
                        type="text"
                        name="favouriteTopic"
                        value={formData.favouriteTopic}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Strongest Skill</label>
                    <input
                        type="text"
                        name="strongestSkill"
                        value={formData.strongestSkill}
                        onChange={handleChange}
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
