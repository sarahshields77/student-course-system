import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to the Student-Course Management System</h1>
            <p>Select an option below to continue:</p>
            <div style={{ marginTop: "20px" }}>
                <Link to="/register">
                    <button style={{ margin: "10px" }}>Student Register</button>
                </Link>
                <Link to="/login">
                    <button style={{ margin: "10px" }}>Student Login</button>
                </Link>
                <Link to="/admin-register">
                    <button style={{ margin: "10px" }}>Admin Register</button>
                </Link>
                <Link to="/admin-login">
                    <button style={{ margin: "10px" }}>Admin Login</button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
