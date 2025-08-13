import React from "react";
import { GARAGE_ITEMS } from "../utils/garage";

export default function Garage({ ownedIds = [] }) {
  const ownedSet = React.useMemo(() => new Set(ownedIds), [ownedIds]);

  // Build + sort: owned first, then locked (stable by catalog order)
  const items = React.useMemo(() => {
    const enriched = GARAGE_ITEMS.map((it) => ({
      ...it,
      owned: ownedSet.has(it.id),
    }));
    // Sort: owned (true) -> false, so put them first by descending owned
    enriched.sort((a, b) => (b.owned === a.owned ? 0 : b.owned ? 1 : -1));
    return enriched;
  }, [ownedSet]);

  // Start at first owned if available, else index 0
  const firstOwnedIdx = React.useMemo(() => {
    const idx = items.findIndex((x) => x.owned);
    return idx === -1 ? 0 : idx;
  }, [items]);

  const [i, setI] = React.useState(firstOwnedIdx);

  // When ownership changes, jump to first owned (or 0 if none)
  React.useEffect(() => {
    setI(firstOwnedIdx);
  }, [firstOwnedIdx]);

  const total = items.length;
  const ownedCount = items.filter((x) => x.owned).length;

  const prev = () => setI((i - 1 + total) % total);
  const next = () => setI((i + 1) % total);

  const cur = items[i];

  return (
    <div className="garage">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>Garage Collection</strong>
        <span className="badge">
          {ownedCount}/{total} owned
        </span>
      </div>

      {/* Carousel */}
      <div
        style={{
          marginTop: 10,
          border: "1px solid #2b3147",
          borderRadius: 12,
          padding: 12,
          display: "grid",
          gridTemplateColumns: "48px 1fr 48px",
          gap: 10,
          alignItems: "center",
        }}
      >
        <button className="btn secondary" onClick={prev} aria-label="Previous">
          ‹
        </button>

        <div style={{ display: "grid", gap: 8, justifyItems: "center" }}>
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              height: 350, // Increased from 220 to 350 (or even 400+ if you prefer)
              borderRadius: 12,
              border: "1px solid #24304a",
              display: "grid",
              placeItems: "center",
              background: "#11182a",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {cur.img ? (
              <img
                src={cur.img}
                alt={cur.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // fills height without letterboxing
                }}
              />
            ) : (
              <div style={{ fontSize: 64 }}>
                {cur.type === "bike" ? "🏍️" : cur.type === "car" ? "🏎️" : "🎮"}
              </div>
            )}
            {!cur.owned && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,.55)",
                  display: "grid",
                  placeItems: "center",
                  backdropFilter: "blur(1px)",
                }}
              >
                <span className="badge" style={{ fontSize: 14 }}>
                  Locked 🔒
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span className="badge">{cur.type.toUpperCase()}</span>
            <span className="badge">{cur.tier}</span>
            <span className="badge">
              {cur.owned ? "Owned ✅" : "Locked 🔒"}
            </span>
          </div>

          <div style={{ fontWeight: 700 }}>{cur.name}</div>

          {/* Dots */}
          <div
            style={{
              display: "flex",
              gap: 6,
              marginTop: 6,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  border: "1px solid #2b3147",
                  background: idx === i ? "var(--accent)" : "#1a2130",
                  cursor: "pointer",
                }}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <button className="btn secondary" onClick={next} aria-label="Next">
          ›
        </button>
      </div>

      <div className="kf" style={{ marginTop: 8 }}>
        Owned items are shown first. Unlock more by hitting milestones.
      </div>
    </div>
  );
}
