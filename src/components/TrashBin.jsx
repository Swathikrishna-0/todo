import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "./Toasts";

export default function TrashBin({ uid }) {
  const [hot, setHot] = React.useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    if (!hot) setHot(true);
  };
  const onDragLeave = () => setHot(false);

  const onDrop = async (e) => {
    e.preventDefault();
    setHot(false);
    if (!uid) return;
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    await deleteDoc(doc(db, "users", uid, "tasks", id));
    toast("Task deleted 🗑️");
  };

  return (
    <div
      className={`hud trash ${hot ? "hot" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      title="Drag a task here to delete"
      style={{
        userSelect: "none",
        textAlign: "center",
        padding: 12,
        borderRadius: 12,
        border: "1px solid var(--outline)",
        background: "linear-gradient(180deg, #1a2233, #111829)"
      }}
    >
      <div style={{ fontSize: 28, lineHeight: 1 }}>🗑️</div>
      <div style={{ fontWeight: 700, marginTop: 6 }}>Trash</div>
      <div className="kf">Drag task here to delete</div>
    </div>
  );
}
