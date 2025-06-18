import React, { useState, useEffect } from "react";
import axios from "axios";

function AssignModal({ issue, onClose, onAssigned }) {
  const [developers, setDevelopers] = useState([]);
  const [assigning, setAssigning] = useState(false);

  // Fetch developer list on modal open
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await axios.get("http://localhost:8085/api/developers");
        setDevelopers(res.data);
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    };
    fetchDevelopers();
  }, []);

  const handleAssign = async (developerId) => {
    setAssigning(true);
    try {
      // Call your backend to assign developer to issue
      await axios.post(`http://localhost:8085/api/issues/${issue.id}/assign`, {
        developerId
      });
      onAssigned();
    } catch (error) {
      console.error("Error assigning developer:", error);
      alert("Failed to assign developer.");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        maxWidth: 700,
        width: "90%",
        maxHeight: "80vh",
        overflowY: "auto",
      }}>
        <h3>Assign Issue: #{issue.serialId} - {issue.title}</h3>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 15,
            right: 20,
            fontSize: 20,
            border: "none",
            background: "none",
            cursor: "pointer"
          }}
        >
          &times;
        </button>

        <table width="100%" border="1" cellPadding="10" cellSpacing="0" style={{ borderCollapse: "collapse", marginTop: 10 }}>
          <thead style={{ backgroundColor: "#f5f5f5" }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Online</th>
              <th>Task Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {developers.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No developers found.</td>
              </tr>
            )}
            {developers.map((dev, idx) => (
              <tr key={dev.id}>
                <td>{idx + 1}</td>
                <td>{dev.user.username}</td>
                <td>{dev.user.designation}</td>
                <td style={{ color: dev.online ? "green" : "red" }}>
                  {dev.online ? "Online" : "Offline"}
                </td>
                <td>{dev.assignedIssues.length}</td>
                <td>
                  <button
                    disabled={assigning}
                    onClick={() => handleAssign(dev.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 5,
                      border: "none",
                      backgroundColor: "#28a745",
                      color: "white",
                      cursor: "pointer"
                    }}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignModal;
