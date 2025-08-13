import React, { useEffect } from "react";
import "./styles.css";
import useAuth from "./hooks/useAuth";
import { useUserMeta, useUserTasks } from "./hooks/useFirestoreSubs";
import NewTaskForm from "./components/NewTaskForm";
import Board from "./components/Board";
import XPBar from "./components/XPBar";
import RankBadge from "./components/RankBadge";
import Garage from "./components/Garage";
import Toasts, { toast } from "./components/Toasts";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";
import confetti from "canvas-confetti";
import AffirmationModal from "./components/AffirmationModal";
import { randomAffirmation } from "./utils/affirmations";
import { randomReaction } from "./utils/reactions";
import UnlockModal from "./components/UnlockModal";
import { unlockNextGarageItem } from "./utils/garage";
import TrashBin from "./components/TrashBin";

export default function App() {
  const { user, ready } = useAuth();
  const tasks = useUserTasks(user?.uid);
  const meta = useUserMeta(user?.uid);

  // Popups
  const [affirmOpen, setAffirmOpen] = React.useState(false);
  const [affirmText, setAffirmText] = React.useState("");
  const [unlockOpen, setUnlockOpen] = React.useState(false);
  const [unlockedItem, setUnlockedItem] = React.useState(null);
  const [affirmImg, setAffirmImg] = React.useState("");

  const ensureMeta = async () => {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists())
      await setDoc(ref, {
        role: "player",
        xp: 0,
        completedCount: 0,
        streakDays: 0,
        lastLoginDate: null,
        levels: 1,
        ownedItemIds: [], // important for Garage
      });
  };

  const onCompleted = async () => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);

    await updateDoc(ref, { xp: increment(15), completedCount: increment(1) });

    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    new Audio("/sfx-rev.mp3").play().catch(() => {});

    // Affirmation popup every completion
    setAffirmText(randomAffirmation());
    setAffirmImg(randomReaction());
    setAffirmOpen(true);

    // Milestone (every 10)
    const snap = await getDoc(ref);
    const data = snap.data();
    if (data.completedCount % 10 === 0) {
      const unlocked = await unlockNextGarageItem(db, user.uid);
      if (unlocked) {
        setUnlockedItem(unlocked);
        setUnlockOpen(true); // show unlock modal
      } else {
        toast("Milestone 🎯 → All items already owned! 💯");
      }
    }
  };

  const checkStreak = async () => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    const today = new Date().toDateString();
    if (!snap.exists()) return;
    const last = snap.data().lastLoginDate;
    if (last !== today)
      await updateDoc(ref, {
        lastLoginDate: today,
        streakDays: increment(1),
        xp: increment(5),
      });
  };

  useEffect(() => {
    if (ready && user) {
      ensureMeta();
      checkStreak();
    }
  }, [ready, user]);

  if (!ready) return <div className="app">Loading…</div>;
  if (!user) return <div className="app">Auth failed. Refresh.</div>;

  const xp = meta?.xp ?? 0;
  const completed = meta?.completedCount ?? 0;

  return (
    <div className="app">
      <div className="topbar hud">
        <div className="logo">
          <span>BGMI</span> Quest • KissOps
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <RankBadge xp={xp} />
          <span className="badge">Streak: {meta?.streakDays ?? 0}d</span>
          <span className="badge">Done: {completed}</span>
        </div>
      </div>

      {/* New row: form + trash dropzone on the right */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 132px", gap: 12, alignItems: "start" }}>
        <NewTaskForm uid={user.uid} />
        <TrashBin uid={user.uid} />
      </div>

      <XPBar xp={xp} />
      <Board uid={user.uid} tasks={tasks} onCompleted={onCompleted} />

      {/* Garage uses ownedIds from user meta */}
      <Garage ownedIds={meta?.ownedItemIds || []} />

      <div className="kf" style={{ marginTop: 14 }}>
        Drag tasks to <b>Completed</b> for confetti & kisses. Drag a task to the <b>Trash</b> to delete.
      </div>

      {/* Popups */}
      <AffirmationModal
        open={affirmOpen}
        onClose={() => setAffirmOpen(false)}
        text={affirmText}
        imageUrl={affirmImg}
      />
      <UnlockModal
        open={unlockOpen}
        onClose={() => setUnlockOpen(false)}
        item={unlockedItem}
      />

      <Toasts />
    </div>
  );
}
