import React, { useState } from 'react';
import AdminAddStudent from './AdminAddStudent';
import AdminListStudents from './AdminListStudents';
import AdminListCourses from './AdminListCourses';
import AdminListStudentsByCourse from './AdminListStudentsByCourse';

function AdminDashboard() {
    const [view, setView] = useState(null);

    return (
        <div className="container text center mt-5">
            <h2 className="text-center mb-4">Welcome to the Admin Dashboard!</h2>

            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                <button 
                    className="btn btn-secondary m-2" 
                    onClick={() => setView("addStudent")}>
                    Add a Student
                </button>
                <button 
                    className="btn btn-secondary m-2" 
                    onClick={() => setView("listStudents")}>
                    List All Students
                </button>
                <button 
                    className="btn btn-secondary m-2" 
                    onClick={() => setView("listCourses")}>
                    List All Courses
                </button>
                <button 
                    className="btn btn-secondary m-2" 
                    onClick={() => setView("listStudentsByCourse")}>
                    List Students by Course
                </button>
            </div>

            <div className="mt-4">
                {view === "addStudent" && <AdminAddStudent />}
                {view === "listStudents" && <AdminListStudents />}
                {view === "listCourses" && <AdminListCourses />}
                {view === "listStudentsByCourse" && <AdminListStudentsByCourse />}
            </div>
        </div>
    );
}

export default AdminDashboard;
