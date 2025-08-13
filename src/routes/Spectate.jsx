import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useUserMeta, useUserTasks } from '../hooks/useFirestoreSubs'
import XPBar from '../components/XPBar'
import RankBadge from '../components/RankBadge'
import Toasts from '../components/Toasts'
import TaskCard from '../components/TaskCard'

const APP_CONFIG_ID = 'globals'

export default function Spectate() {
  const { user, ready } = useAuth()
  const [playerUid, setPlayerUid] = useState(null)

  useEffect(() => {
    const fx = async () => {
      if (!ready || !user) return
      const cfgRef = doc(db, 'config', APP_CONFIG_ID)
      const cfg = await getDoc(cfgRef)
      if (!cfg.exists()) return
      const puid = cfg.data().playerUid
      setPlayerUid(puid)
      await setDoc(doc(db, 'users', user.uid), { role: 'viewer', targetUid: puid }, { merge: true })
    }
    fx()
  }, [ready, user])

  const tasks = useUserTasks(playerUid)
  const meta = useUserMeta(playerUid)

  if (!ready || !playerUid) return <div className="app">Loading…</div>

  const xp = meta?.xp ?? 0
  const completed = meta?.completedCount ?? 0

  return (
    <div className="app">
      <div className="topbar hud">
        <div className="logo"><span>BGMI</span> Spectator • Read-only</div>
        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <RankBadge xp={xp} />
          <span className="badge">Done: {completed}</span>
        </div>
      </div>

      <XPBar xp={xp} />
      <div className="board">
        <div className="column">
          <div className="col-head"><strong>To Do</strong></div>
          {tasks.filter(t=>t.status==='todo').map(t => <TaskCard key={t.id} task={t} />)}
        </div>
        <div className="column">
          <div className="col-head"><strong>In Progress</strong></div>
          {tasks.filter(t=>t.status==='doing').map(t => <TaskCard key={t.id} task={t} />)}
        </div>
        <div className="column">
          <div className="col-head"><strong>Completed</strong></div>
          {tasks.filter(t=>t.status==='done').map(t => <TaskCard key={t.id} task={t} />)}
        </div>
      </div>

      <div className="kf" style={{marginTop:12}}>Viewer mode: read-only. No edits, no drags.</div>
      <Toasts />
    </div>
  )
}
