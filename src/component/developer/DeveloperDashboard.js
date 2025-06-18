import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";

const statusOrder = ["PENDING", "INPROGRESS", "COMPLETED", "REJECTED"];

function DeveloperDashboard({ user }) {
  console.log('** AISLOG :: developer dashboard component is loaded with user : ', user);
  const [issuesByStatus, setIssuesByStatus] = useState({
    PENDING: [],
    INPROGRESS: [],
    COMPLETED: [],
    REJECTED: []
  });

//   useEffect(() => {
//     // Fetch issues assigned to this developer
//     axios.get(`http://localhost:8085/api/developers/${user.id}/issues`)
//       .then(res => {
//         console.log('** AISLOG : specific developer issue : ', res.data);

//         const grouped = { PENDING: [], INPROGRESS: [], COMPLETED: [], REJECTED: [] };
//         res.data.forEach(issue => {
//           grouped[issue.status]?.push(issue);
//         });
//         setIssuesByStatus(grouped);
//       });
//   }, [user.id]);
  useEffect(() => {
    axios.get(`http://localhost:8085/api/developers/${user.id}/issues`)
        .then(res => {
            console.log('** AISLOG : specific developer issue : ', res.data);
            setIssuesByStatus(res.data); // ✅ No need to regroup
        });
  }, [user.id]);

  const handleDragEnd = async ({ source, destination }) => {
    if (!destination || source.droppableId === destination.droppableId) return;

    const issue = issuesByStatus[source.droppableId][source.index];
    const updatedStatus = destination.droppableId;

    try {
      console.log('** Hey, trying to change the issue having id: ', issue);
    //   await axios.put(`http://localhost:8085/api/issues/${issue?.issue.issueId}/status`, { status: updatedStatus });
    await axios.put(`http://localhost:8085/api/issues/${issue?.issue.issueId}/status`, {
            workedBy: user.id, // Assuming logged-in developer info
            fromStatus: issue.status,
            toStatus: updatedStatus,
            rejectionReason: updatedStatus === 'REJECTED' ? 'Spam' : null // or provide one if it's a rejection
    });

      // Move item in UI
      const newSource = [...issuesByStatus[source.droppableId]];
      newSource.splice(source.index, 1);

      const newDest = [...issuesByStatus[destination.droppableId]];
      newDest.splice(destination.index, 0, { ...issue, status: updatedStatus });

      setIssuesByStatus({
        ...issuesByStatus,
        [source.droppableId]: newSource,
        [destination.droppableId]: newDest
      });
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="developer-dashboard" style={{ display: "flex", gap: "1rem" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {statusOrder.map(status => (
          <Column key={status} status={status} issues={issuesByStatus[status]} />
        ))}
      </DragDropContext>
    </div>
  );
}

export default DeveloperDashboard;
