import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import IssueCard from "./IssueCard";

function Column({ status, issues }) {
  console.log("** AISLOG :: status : ", status);
  console.log("** AISLOG :: issues : ", issues);

  const statusTitle = {
    PENDING: "🕒 Pending",
    INPROGRESS: "🚧 In Progress",
    COMPLETED: "✅ Completed",
    REJECTED: "❌ Rejected"
  };

  return (
    <div style={{ flex: 1 }}>
      <h3>{statusTitle[status]}</h3>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: 300, backgroundColor: "#f4f4f4", padding: 10, borderRadius: 8 }}
          >
            {issues.map((issue, index) => (
              <IssueCard key={issue.issueId} issue={issue} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
