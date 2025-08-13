export default function TaskCard({ task }) {
  return (
    <div className="task" draggable onDragStart={(e)=>e.dataTransfer.setData('text/plain', task.id)}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong>{task.title}</strong>
        <span className="badge">{task.category} · +{task.points}</span>
      </div>
      {task.dueAt && <div className="kf">Due: {new Date(task.dueAt).toLocaleDateString()}</div>}
    </div>
  )
}
