// Custom, non-linear rank gates (cumulative XP)
export const RANKS = [
  { id: "bronze",     name: "Bronze",     minXP: 0   },   // < 30
  { id: "silver",     name: "Silver",     minXP: 50  },   // 30+
  { id: "gold",       name: "Gold",       minXP: 150  },   // 50+
  { id: "platinum",   name: "Platinum",   minXP: 250 },   // 100+
  { id: "diamond",    name: "Diamond",    minXP: 500 },   // 180+
  { id: "crown",      name: "Crown",      minXP: 650 },   // 250+
  { id: "ace",        name: "Ace",        minXP: 800 },   // 400+
  { id: "conqueror",  name: "Conqueror",  minXP: 1000 }    // 550+
];

// Extra tiers AFTER Conqueror (you gave more milestones)
export const CONQUEROR_TIERS = [
  { name: "Conqueror I",   minXP: 1500 },  // already included above
  { name: "Conqueror II",  minXP: 2000 },
  { name: "Conqueror III", minXP: 2500 },
  { name: "Conqueror IV",  minXP: 3000 }
];

// Core: get current rank object from XP
export function getRankFromXP(xp) {
  let current = RANKS[0];
  for (const r of RANKS) if (xp >= r.minXP) current = r; else break;
  // If we’re in/above Conqueror, attach tier label based on extra milestones
  if (current.id === "conqueror") {
    let tier = CONQUEROR_TIERS[0].name;
    for (const t of CONQUEROR_TIERS) if (xp >= t.minXP) tier = t.name; else break;
    return { ...current, name: tier };
  }
  return current;
}

// Progress to next rank (or next Conqueror tier)
export function getNextGate(xp) {
  // List all gates including Conqueror tiers
  const gates = [
    ...RANKS.map(r => ({ label: r.name, minXP: r.minXP })),
    ...CONQUEROR_TIERS.slice(1).map(t => ({ label: t.name, minXP: t.minXP })) // exclude duplicate 550
  ].sort((a,b) => a.minXP - b.minXP);

  let next = null, prev = { label: "Start", minXP: 0 };
  for (const g of gates) {
    if (xp < g.minXP) { next = g; break; }
    prev = g;
  }
  return { prev, next }; // next can be null if maxed
}

// Percentage progress within current gate
export function rankProgress(xp) {
  const { prev, next } = getNextGate(xp);
  const start = prev.minXP ?? 0;
  const end = next?.minXP ?? Math.max(start + 1, xp + 1); // avoid /0 at cap
  const pct = Math.max(0, Math.min(100, Math.round(((xp - start) / (end - start)) * 100)));
  return { start, end, pct, nextLabel: next?.label || "Maxed" };
}
