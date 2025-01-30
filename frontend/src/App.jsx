import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import LandingPage from './components/LandingPage';
import RegisterForm from './components/Students/RegisterForm';
import LoginForm from './components/Students/LoginForm';
import Dashboard from './components/Students/Dashboard';
import AdminRegisterForm from './components/Admins/AdminRegisterForm';
import AdminLoginForm from './components/Admins/AdminLoginForm';
import AdminDashboard from './components/Admins/AdminDashboard';
import PrivateRoute from './components/Students/PrivateRoute';
import AdminPrivateRoute from './components/Admins/AdminPrivateRoute';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin-register" element={<AdminRegisterForm />} />
          <Route path="/admin-login" element={<AdminLoginForm />} />

          {/* Protected routes */}
          <Route
                      path="/dashboard"
                      element={
                          <PrivateRoute>
                              <Dashboard />
                          </PrivateRoute>
                      }
                  />
                  <Route
                      path="/admin-dashboard"
                      element={
                          <AdminPrivateRoute>
                              <AdminDashboard />
                          </AdminPrivateRoute>
                      }
                  />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
