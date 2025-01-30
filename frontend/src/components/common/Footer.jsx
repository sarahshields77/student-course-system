import React from "react";

function Footer() {
    return (
        <footer className="bg-custom text-white text-center py-3 mt-4">
            <p>&copy; {new Date().getFullYear()} Student Course System. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
