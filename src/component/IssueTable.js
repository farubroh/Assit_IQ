import React, { useState, useEffect } from "react";
import AssignModal from "./AssignModal";
import RejectModal from "./RejectModal";

function IssueTable({ issues, status, refresh }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRejectIssue, setSelectedRejectIssue] = useState(null);

  const [user, setUser] = useState(null);

  // Columns & buttons differ based on status
  const showAssignColumn = status === "PENDING";
  const showChangeAssignee = status === "PENDING";
  const showAssigneeColumn = status === "INPROGRESS";
  const showDoneByColumn = status === "COMPLETED";
  const showRejectedByColumn = status === "REJECTED";

  const openRejectModal = (issue) => {
    setSelectedRejectIssue(issue);
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setSelectedRejectIssue(null);
    setRejectModalOpen(false);
  };


  const openAssignModal = (issue) => {
    setSelectedIssue(issue);
    setModalOpen(true);
  };

  const closeAssignModal = () => {
    setSelectedIssue(null);
    setModalOpen(false);
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("helpdeskUser");
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <table width="100%" border="1" cellPadding="10" cellSpacing="0" style={{ borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f5f5f5" }}>
          <tr>
            <th>#</th>
            <th>SerialId</th>
            <th>Title</th>
            <th>Description</th>
            <th>Issuer</th>
            <th>Department</th>
            <th>Role</th>
            <th>Designation</th>
            {showAssignColumn && <th>Assign To</th>}
            {showAssigneeColumn && <th>Assignee</th>}
            {showDoneByColumn && <th>Done By</th>}
            {showRejectedByColumn && <th>Rejected By</th>}
            <th>Status</th>
            {(showAssignColumn || showChangeAssignee) && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {issues.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                No {status.toUpperCase()} issues found.
              </td>
            </tr>
          )}

          {issues.map((issue, index) => (
            <tr key={issue.id}>
              <td>{index + 1}</td>
              <td>{issue.serialId}</td>
              <td>{issue.title}</td>
              <td>{issue.description}</td>

              <td>{issue.user.username}</td>
              <td>{issue.user.department}</td>
              <td>{issue.user.role}</td>
              <td>{issue.user.designation ?? '-'}</td>

              {showAssignColumn && (
                <td>{issue.developerName ? issue.developerName : "-"}</td>
              )}
              {showAssigneeColumn && <td>{issue.developerName || "-"}</td>}
              {showDoneByColumn && <td>{issue.developerName || "-"}</td>}
              {showRejectedByColumn && <td>{issue.developerName || "-"}</td>}

              <td>{issue.status}</td>

              {(showAssignColumn || showChangeAssignee) && (
                <td>
                  <button
                    onClick={() => openAssignModal(issue)}
                    style={{
                      padding: "6px 10px",
                      cursor: "pointer",
                      borderRadius: 5,
                      border: "none",
                      backgroundColor: "#007bff",
                      color: "white"
                    }}
                  >
                    {issue.assignedDeveloper ? "Change Assignee" : "Assign"}
                  </button>

                  <button
                    onClick={() => openRejectModal(issue)}
                    style={{ ...btnStyle, backgroundColor: "#dc3545" }}
                  >
                    Reject
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign Modal */}
      {modalOpen && selectedIssue && (
        <AssignModal
          issue={selectedIssue}
          onClose={closeAssignModal}
          onAssigned={() => {
            closeAssignModal();
            refresh(); // Refresh data after assignment
          }}
        />
      )}

      {rejectModalOpen && selectedRejectIssue && (
        <RejectModal
          issue={selectedRejectIssue}
          user={user}
          onClose={closeRejectModal}
          onRejected={() => {
            closeRejectModal();
            refresh(); // refresh after rejection
          }}
        />
      )}
    </div>
  );
}

export default IssueTable;

const btnStyle = {
  padding: "6px 10px",
  cursor: "pointer",
  borderRadius: 5,
  border: "none",
  backgroundColor: "#007bff",
  color: "white"
};

