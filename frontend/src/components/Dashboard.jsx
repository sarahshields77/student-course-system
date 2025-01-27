import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/api';

function Dashboard() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("/students/profile");
                setProfile(response.data.user);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Welcome, {profile.firstName} {profile.lastName}!</h1>
            <p>Program: {profile.program}</p>
            <p>Student Number: {profile.studentNumber}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;
