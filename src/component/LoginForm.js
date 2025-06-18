import React, { useState } from "react";
import axios from "axios";

function LoginForm({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8085/api/login", credentials);
      const user = res.data;

      // Store user in session
      sessionStorage.setItem("helpdeskUser", JSON.stringify(user));
      onLoginSuccess(user);
    } catch (err) {
      console.error(err);
      setError("❌ Invalid User ID or Password");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "2.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>🔐 Helpdesk Login</h2>

        {error && (
          <p style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🔓 Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
