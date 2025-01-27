import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Welcome to the Student-Course Management System</h1>
            <p className="mb-4">Select an option below to continue:</p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                <Link to="/register" className="btn btn-primary">
                    Student Register
                </Link>
                <Link to="/login" className="btn btn-secondary">
                    Student Login
                </Link>
                <Link to="/admin-register" className="btn btn-success">
                    Admin Register
                </Link>
                <Link to="/admin-login" className="btn btn-warning">
                    Admin Login
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
