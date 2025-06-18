import React from "react";
import { Draggable } from "@hello-pangea/dnd";

function IssueCard({ issue, index }) {
  console.log("** IssueCard component with issue : ", issue);

  return (
    <Draggable draggableId={issue.issue.issueId.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: 6,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            ...provided.draggableProps.style
          }}
        >
          <strong>{issue?.issue.title}</strong>
          <p style={{ fontSize: "0.9rem" }}>{issue?.issue.description}</p>
          <small>📅 {new Date(issue?.issue.createdAt).toLocaleDateString()}</small>
        </div>
      )}
    </Draggable>
  );
}

export default IssueCard;
