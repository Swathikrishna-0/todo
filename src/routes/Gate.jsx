import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const APP_CONFIG_ID = 'globals' // /config/globals
const PASSCODE = 'MadhuSwathi'         // exact match, emoji supported

export default function Gate() {
  const { user, ready } = useAuth()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fx = async () => {
      if (!ready || !user) return
      const uref = doc(db, 'users', user.uid)
      const usnap = await getDoc(uref)
      if (usnap.exists() && usnap.data().role === 'player') navigate('/play')
    }
    fx()
  }, [ready, user])

  const submit = async (e) => {
    e.preventDefault()
    if (!user) return
    if (code !== PASSCODE) { setError('Wrong code. Try again.'); return }

    const cfgRef = doc(db, 'config', APP_CONFIG_ID)
    const cfg = await getDoc(cfgRef)
    if (!cfg.exists()) {
      await setDoc(doc(db, 'users', user.uid), { role: 'player', xp: 0, completedCount: 0, streakDays: 0, lastLoginDate: null, levels: 1 }, { merge: true })
      await setDoc(cfgRef, { playerUid: user.uid })
      navigate('/play')
    } else {
      const { playerUid } = cfg.data()
      if (playerUid === user.uid) {
        await setDoc(doc(db, 'users', user.uid), { role: 'player' }, { merge: true })
        navigate('/play')
      } else {
        setError('This passcode is already bound to another user.')
      }
    }
  }

  return (
    <div className="gate">
      <h2>Enter Access Code</h2>
      <div className="kf">Only the player can enter. (BGMI Ops)</div>
      <form onSubmit={submit} className="cf" style={{marginTop:10}}>
        <input className="input" autoFocus
               value={code} onChange={e=>setCode(e.target.value)} />
        <button className="btn" type="submit">Enter</button>
      </form>
      {error && <div className="kf" style={{color:'#ff6b6b', marginTop:8}}>{error}</div>}
    </div>
  )
}
