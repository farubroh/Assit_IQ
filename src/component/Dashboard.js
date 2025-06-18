import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard({ user }) {
  const [issues, setIssues] = useState([]);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Define keys & labels for tab logic
  const statusTabs = [
    { key: "PENDING", label: "Pending" },
    { key: "INPROGRESS", label: "In Progress" },
    { key: "COMPLETED", label: "Completed" },
    { key: "REJECTED", label: "Rejected" }
  ];

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8085/api/issues/user/${user.id}?status=${activeTab}`
        );
        setIssues(res.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setIssues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [activeTab, user.id]);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "2rem" }}>
      <h2>📊 Issue Dashboard</h2>
      <p>
        Welcome, <strong>{user.username}</strong> | Role:{" "}
        <strong>{user.role}</strong>
      </p>

      {/* Tabs */}
      <div style={{ margin: "1rem 0", display: "flex", gap: "10px" }}>
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === tab.key ? "#007bff" : "#f0f0f0",
              color: activeTab === tab.key ? "white" : "black",
              border: activeTab === tab.key ? "1px solid #007bff" : "1px solid #ccc",
              borderRadius: "5px",
              fontWeight: activeTab === tab.key ? "bold" : "normal",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p>🔄 Loading {activeTab.replace("_", " ")} issues...</p>
      ) : (
        <table width="100%" border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th>#</th>
              <th>SerialId</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.length > 0 ? (
              issues.map((issue, index) => (
                <tr key={issue.id}>
                  <td>{index + 1}</td>
                  <td>{issue.serialId}</td>
                  <td>{issue.title}</td>
                  <td>{issue.description}</td>
                  <td>{issue.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No {activeTab.replace("_", " ")} issues found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}


      {/* ➕ Create Issue Button */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button
          onClick={() => navigate("/create-issue")}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          ➕ Create New Issue
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
