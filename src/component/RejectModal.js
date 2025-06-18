import React, { useState } from "react";
import axios from "axios";

const RejectModal = ({ issue, user, onClose, onRejected }) => {
  
  const [reason, setReason] = useState("");
  const payload = {
    rejectedByRole: user.role,
    rejectedById: user.id,
    rejectionReason: reason
  };

  console.log('Rejection issue payload : ', payload);

  const handleReject = async () => {
    if (!reason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    try {
      await axios.post(`http://localhost:8085/api/issues/${issue.id}/reject`, payload);
      onRejected();
      onClose();
    } catch (err) {
      console.error("Error rejecting issue:", err);
      alert("Failed to reject issue.");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Reject Issue</h3>
        <p><strong>{issue.title}</strong></p>
        <textarea
          placeholder="Enter rejection reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          style={styles.textarea}
        />
        <div style={styles.buttons}>
          <button onClick={handleReject} style={styles.rejectBtn}>Reject</button>
          <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 999
  },
  modal: {
    background: "#fff", padding: 20, borderRadius: 10, width: "400px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  },
  textarea: {
    width: "100%", padding: 10, borderRadius: 5, border: "1px solid #ccc"
  },
  buttons: {
    marginTop: 15, display: "flex", justifyContent: "flex-end", gap: "10px"
  },
  rejectBtn: {
    backgroundColor: "#dc3545", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "5px"
  },
  cancelBtn: {
    backgroundColor: "#6c757d", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "5px"
  }
};
