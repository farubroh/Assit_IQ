import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function IssueForm({ user }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: user?.id || "",
    name: user?.username || "",
    role: user?.role || "",
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      userId: user?.id
    };

    try {
      await axios.post("http://localhost:8085/api/issues", payload);
      setForm({ ...form, title: "", description: "" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("❌ Could not submit issue.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "3rem auto", fontFamily: "Arial, sans-serif" }}>
      {/* Top Bar with Back Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>📝 Submit New Issue</h2>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🔙 Back to Dashboard
        </button>
      </div>

      {/* Card Form */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <p style={{ marginBottom: "1rem" }}>
          👋 Welcome, <strong>{user?.username}</strong> | Role: <strong>{user?.role}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Issue Title"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your issue..."
              required
              rows="5"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                resize: "vertical"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            📩 Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
}

export default IssueForm;
