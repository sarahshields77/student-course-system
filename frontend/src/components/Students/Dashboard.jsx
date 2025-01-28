import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/api';
import AddCourseForm from './AddCourseForm';
import UpdateCourseForm from './UpdateCourseForm';
import DropCourseForm from './DropCourseForm';
import CourseList from './CourseList';

function Dashboard() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [view, setView] = useState("home");

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
        <div className="container mt-4">
            <h1 className="text-center">Welcome, {profile.firstName} {profile.lastName}!</h1>
            <p className="text-center">Program: {profile.program}</p>
            <p className="text-center">Student Number: {profile.studentNumber}</p>

            <div className="text-center mt-3">
                <button 
                    className="btn btn-primary m-2" 
                    onClick={() => setView("addCourse")}>
                    Add a Course
                </button>
                <button 
                    className="btn btn-warning m-2" 
                    onClick={() => setView("updateCourse")}>
                    Update a Course
                </button>
                <button 
                    className="btn btn-danger m-2" 
                    onClick={() => setView("dropCourse")}>
                    Drop a Course
                </button>
                <button 
                    className="btn btn-info m-2" 
                    onClick={() => setView("listCourses")}>
                    List Your Courses
                </button>
                <button 
                    className="btn btn-secondary m-2" 
                    onClick={logout}>
                    Logout
                </button>
            </div>

            <div className="mt-4">
                {view === "addCourse" && <AddCourseForm />}
                {view === "updateCourse" && <UpdateCourseForm />}
                {view === "dropCourse" && <DropCourseForm />}
                {view === "listCourses" && <CourseList />}
            </div>
        </div>
    );
}

export default Dashboard;
