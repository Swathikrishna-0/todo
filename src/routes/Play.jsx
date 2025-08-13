// src/routes/Play.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import App from "../App";

export default function Play() {
  const { user, ready } = useAuth();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) return;                 // wait for auth
    if (!user) {                        // no user -> gate
      navigate("/gate", { replace: true });
      return;
    }

    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const role = snap.exists() ? snap.data().role : null;
        const ok = role === "player";
        setAllowed(ok);
        setChecking(false);
        if (!ok) navigate("/gate", { replace: true });
      },
      () => {
        setAllowed(false);
        setChecking(false);
        navigate("/gate", { replace: true });
      }
    );
    return () => unsub();
  }, [ready, user, navigate]);

  if (checking || !ready) return <div className="app">Loading…</div>;
  if (!allowed) return null; // redirected

  return <App />;            // ✅ only the player sees your full app
}
