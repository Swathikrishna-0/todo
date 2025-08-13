import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'

export function useUserTasks(uid) {
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    if (!uid) return
    const q = query(
      collection(db, 'users', uid, 'tasks'),
      where('archived', '==', false),
      orderBy('createdAt', 'asc')
    )
    const unsub = onSnapshot(q, snap => {
      setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [uid])
  return tasks
}

export function useUserMeta(uid) {
  const [meta, setMeta] = useState(null)
  useEffect(() => {
    if (!uid) return
    const ref = doc(db, 'users', uid)
    const unsub = onSnapshot(ref, snap => setMeta(snap.exists() ? snap.data() : null))
    return () => unsub()
  }, [uid])
  return meta
}
