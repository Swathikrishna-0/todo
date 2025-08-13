import { getRankFromXP, rankProgress } from "../utils/ranks";

export default function RankBadge({ xp }) {
  const rank = getRankFromXP(xp);
  const { pct } = rankProgress(xp);
  return (
    <div className="rank-badge">
      <span className={`rank ${rank.id}`}>{rank.name}</span>
      <div className="rank-bar"><div className="rank-fill" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}