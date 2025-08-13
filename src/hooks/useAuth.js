import { useEffect, useState } from 'react'
import { ensureAnonAuth } from '../firebase'

export default function useAuth() {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    ensureAnonAuth().then(u => { setUser(u); setReady(true) })
  }, [])
  return { user, ready }
}
