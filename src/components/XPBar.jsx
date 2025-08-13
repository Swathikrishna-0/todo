// src/components/XPBar.jsx
import React from "react";
import { getRankFromXP, rankProgress } from "../utils/ranks";

export default function XPBar({ xp = 0 }) {
  const rank = getRankFromXP(xp);
  const { start, end, pct, nextLabel } = rankProgress(xp);

  const curWithinGate = Math.max(0, xp - start);
  const gateSize = Math.max(1, end - start); // avoid /0
  const label = nextLabel === "Maxed" ? `${rank.name} • Maxed` : `${rank.name} → ${nextLabel}`;

  return (
    <div className="xp-wrap">
      <div className="xp-head">
        <strong>{label}</strong>
        <span className="xp-numbers">
          {curWithinGate} / {gateSize} XP
        </span>
      </div>
      <div className="xp-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className={`xp-fill ${rank.id}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="xp-sub">
        Total XP: <b>{xp}</b>{end ? <> • Next gate at <b>{end}</b></> : null}
      </div>
    </div>
  );
}
