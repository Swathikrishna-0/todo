import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import TaskCard from "./TaskCard";
import { toast } from "./Toasts";

export default function Column({ uid, title, status, tasks, onCompleted, readOnly = false }) {
  const onDrop = async (e) => {
    if (readOnly) return;
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const ref = doc(db, "users", uid, "tasks", id);
    const payload = { status };
    if (status === "done") payload.completedAt = serverTimestamp();
    await updateDoc(ref, payload);
    if (status === "done") onCompleted?.();
    toast(status === "done" ? "BOOM! Task completed. 🎉" : `Moved to ${title}.`);
  };

  return (
    <div className="column" onDragOver={(e) => !readOnly && e.preventDefault()} onDrop={onDrop}>
      <div className="col-head">
        <strong>{title}</strong><span className="badge">{tasks.length}</span>
      </div>
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} uid={uid} readOnly={readOnly} />
      ))}
    </div>
  );
}
