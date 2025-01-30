import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/CCbanner.jpg";

function Header() {
    return (
        <header className="bg-custom text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <img src={logo} alt="Centennial Logo" className="me-3" style={{ height: "50px" }} />
                <h3>Student Course System</h3>
                <nav>
                    <Link className="text-white mx-3 text-decoration-none" to="/">Home</Link>
                    <Link className="text-white mx-3 text-decoration-none" to="/login">Student Login</Link>
                    <Link className="text-white mx-3 text-decoration-none" to="/admin-login">Admin Login</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;

