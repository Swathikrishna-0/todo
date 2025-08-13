import { useEffect, useState } from 'react'

export default function Toasts() {
  const [toasts, setToasts] = useState([])
  useEffect(() => {
    const handler = (e) => {
      const toast = { id: crypto.randomUUID(), text: e.detail }
      setToasts(prev => [toast, ...prev])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toast.id)), 3000)
    }
    window.addEventListener('toast', handler)
    return () => window.removeEventListener('toast', handler)
  }, [])
  return (
    <div className="toast-wrap">
      {toasts.map(t => <div key={t.id} className="toast">{t.text}</div>)}
    </div>
  )
}
export const toast = (text) => window.dispatchEvent(new CustomEvent('toast', { detail: text }))
