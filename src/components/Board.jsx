import Column from './Column'
export default function Board({ uid, tasks, onCompleted, readOnly=false }) {
  const todo = tasks.filter(t => t.status === 'todo')
  const doing = tasks.filter(t => t.status === 'doing')
  const done = tasks.filter(t => t.status === 'done')
  return (
    <div className="board">
      <Column uid={uid} title="To Do" status="todo" tasks={todo} readOnly={readOnly} />
      <Column uid={uid} title="In Progress" status="doing" tasks={doing} readOnly={readOnly} />
      <Column uid={uid} title="Completed" status="done" tasks={done} onCompleted={onCompleted} readOnly={readOnly} />
    </div>
  )
}
