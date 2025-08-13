import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';

const APP_CONFIG_ID = 'globals'; // /config/globals
const PASSCODE = 'MS';           // or 'MS❤️' exactly if you want the emoji
const SS_KEY = 'gate_code_draft';

export default function Gate() {
  const { user, ready } = useAuth();
  const [code, setCode] = useState(() => sessionStorage.getItem(SS_KEY) || '');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const loc = useLocation();
  const typingRef = useRef(false);

  // Restore focus stability
  const inputRef = useRef(null);

  // Keep draft in sessionStorage so remounts don’t wipe it
  useEffect(() => {
    sessionStorage.setItem(SS_KEY, code);
  }, [code]);

  // Avoid auto-redirect if user is actively typing
  useEffect(() => {
    const fx = async () => {
      if (!ready || !user) return;
      // Only auto-redirect when there is NO draft (so we don't blow away typing)
      if (code?.length > 0) return;

      const uref = doc(db, 'users', user.uid);
      const usnap = await getDoc(uref);
      if (usnap.exists() && usnap.data().role === 'player') {
        navigate('/play', { replace: true });
      }
    };
    fx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user]); // intentionally not depending on `code` to avoid loops

  const submit = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (code !== PASSCODE) { setError('Wrong code. Try again.'); return; }

    const cfgRef = doc(db, 'config', APP_CONFIG_ID);
    const cfg = await getDoc(cfgRef);

    // Seed user if first bind
    if (!cfg.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        role: 'player', xp: 0, completedCount: 0, streakDays: 0, lastLoginDate: null, levels: 1
      }, { merge: true });
      await setDoc(cfgRef, { playerUid: user.uid });
      sessionStorage.removeItem(SS_KEY);
      navigate('/play', { replace: true });
      return;
    }

    const { playerUid } = cfg.data();
    if (playerUid === user.uid) {
      await setDoc(doc(db, 'users', user.uid), { role: 'player' }, { merge: true });
      sessionStorage.removeItem(SS_KEY);
      navigate('/play', { replace: true });
    } else {
      setError('This passcode is already bound to another user.');
    }
  };

  return (
    <div className="gate">
      <h2>Enter Access Code</h2>
      <div className="kf">Only the player can enter. (BGMI Ops)</div>

      <form onSubmit={submit} className="cf" style={{ marginTop: 10 }}>
        <input
          ref={inputRef}
          className="input"
          autoFocus
          value={code}
          onChange={(e) => {
            typingRef.current = true;
            setCode(e.target.value);
          }}
          // optional UX niceties:
          autoComplete="one-time-code"
          inputMode="text"
          placeholder="Enter code (e.g., MS)"
        />
        <button className="btn" type="submit">Enter</button>
      </form>

      {error && <div className="kf" style={{ color: '#ff6b6b', marginTop: 8 }}>{error}</div>}
    </div>
  );
}
