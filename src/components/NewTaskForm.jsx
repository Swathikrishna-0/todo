import { useState, useRef } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { pointsForTask } from '../utils/gamify';
import { toast } from './Toasts';

export default function NewTaskForm({ uid }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');
  const [due, setDue] = useState('');
  const dateRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const points = pointsForTask(category);
    await addDoc(collection(db, 'users', uid, 'tasks'), {
      title: title.trim(),
      category,
      points,
      status: 'todo',
      archived: false,
      dueAt: due ? new Date(due).toISOString() : null,
      createdAt: serverTimestamp(),
      completedAt: null
    });
    setTitle('');
    setCategory('Work');
    setDue('');
    toast('Task added. Let’s ride! 🏍️');
  };

  return (
    <form className="form" onSubmit={submit}>
      <input
        className="input"
        placeholder="Task title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <select
          className="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Work</option>
          <option>Masters</option>
          <option>Personal</option>
          <option>Fitness</option>
          <option>General</option>
        </select>

        {/* Date field with white icon */}
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            ref={dateRef}
            className="input"
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            style={{
              paddingRight: '32px',
              cursor: 'pointer'
            }}
          />
          <svg
            onClick={() => dateRef.current?.showPicker?.()}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="20"
            height="20"
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'auto',
              cursor: 'pointer'
            }}
          >
            <path d="M7 10h5v5H7z" opacity=".3" />
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 
              0-2 .9-2 2v14c0 1.1.9 2 
              2 2h14c1.1 0 2-.9 
              2-2V6c0-1.1-.9-2-2-2zm0 
              16H5V9h14v11zM7 11h5v5H7z" />
          </svg>
        </div>

        <button className="btn" type="submit">
          Add
        </button>
      </div>

      <div className="kf">Points auto-weighted by category. Earn XP, unlock rewards.</div>
    </form>
  );
}
