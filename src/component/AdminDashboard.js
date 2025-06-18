import React, { useState, useEffect } from "react";
import axios from "axios";
import IssueTable from "./IssueTable";

const statusTabs = [
    { key: "PENDING", label: "Pending" },
    { key: "INPROGRESS", label: "In Progress" },
    { key: "COMPLETED", label: "Completed" },
    { key: "REJECTED", label: "Rejected" }
  ];

function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all issues by status (admin sees all)
  const fetchIssues = async (status) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8085/api/issues/status/${status}`);
      setIssues(res.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues(activeTab);
  }, [activeTab]);

  return (
    <div style={{ maxWidth: 1000, margin: "auto", padding: "2rem" }}>
      <h2>🛠 Admin Issue Dashboard</h2>
      
      {/* Tabs */}
      <div style={{ marginBottom: 20 }}>
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              marginRight: 10,
              padding: "8px 16px",
              backgroundColor: activeTab === tab.key ? "#007bff" : "#eee",
              color: activeTab === tab.key ? "white" : "black",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: activeTab === tab.key ? "bold" : "normal",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading issues...</p>
      ) : (
        <IssueTable
          issues={issues}
          status={activeTab}
          refresh={() => fetchIssues(activeTab)}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
