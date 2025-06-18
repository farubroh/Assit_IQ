import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./component/LoginForm";
import IssueForm from "./component/IssueForm";
import Dashboard from "./component/Dashboard";
import AdminDashboard from "./component/AdminDashboard";
import DeveloperDashboard from './component/developer/DeveloperDashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from sessionStorage
    const storedUser = sessionStorage.getItem("helpdeskUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={
            user ? (
              user.role === "Admin" ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            )
          }
        /> */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "Admin" ? (
                <Navigate to="/admin-dashboard" />
              ) : user.role === "Developer" ? (
                <Navigate to="/developer-dashboard" />
              ) : (
                <Navigate to="/dashboard" /> // For Student or Teacher
              )
            ) : (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard user={user} />} />
        <Route path="/developer-dashboard" element={<DeveloperDashboard user={user} />} />
        <Route path="/create-issue" element={<IssueForm user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
