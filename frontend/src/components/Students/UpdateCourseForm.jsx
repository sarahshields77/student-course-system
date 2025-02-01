import React, { useState } from "react";
import axios from "../../api/api";

function UpdateCourseForm() {
    const [formData, setFormData] = useState({ courseId: "", newSection: "" });
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/students/update-course", formData);
            setSuccess(response.data.message);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
            setSuccess(null);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h3 className="text-center mb-4">Update a Course</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Course ID</label>
                                <input 
                                    type="text" 
                                    name="courseId" 
                                    value={formData.courseId} 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">New Section</label>
                                <input 
                                    type="text" 
                                    name="newSection" 
                                    value={formData.newSection} 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    required 
                                />
                            </div>
                            {success && <p className="text-success mt-2">{success}</p>}
                            {error && <p className="text-danger mt-2">{error}</p>}
                            <div className="text-center">
                                <button type="submit" className="btn btn-secondary">Update Course</button>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCourseForm;
