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
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card shadow-lg p-4">
                    <h2 className="text-center mb-4">Student Registration</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Left Column */}
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Student Number</label>
                                    <input type="text" name="studentNumber" className="form-control" 
                                        value={formData.studentNumber} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control"
                                        value={formData.password} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input type="text" name="firstName" className="form-control"
                                        value={formData.firstName} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" name="lastName" className="form-control"
                                        value={formData.lastName} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" name="address" className="form-control"
                                        value={formData.address} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <input type="text" name="city" className="form-control"
                                        value={formData.city} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="text" name="phone" className="form-control"
                                        value={formData.phone} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" name="email" className="form-control"
                                        value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Program</label>
                                    <input type="text" name="program" className="form-control"
                                        value={formData.program} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Favourite Topic</label>
                                    <input type="text" name="favouriteTopic" className="form-control"
                                        value={formData.favouriteTopic} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Strongest Skill</label>
                                    <input type="text" name="strongestSkill" className="form-control"
                                        value={formData.strongestSkill} onChange={handleChange} />
                                </div>
                            </div>
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

export default RegisterForm;
