import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

/** Master catalog — add more items freely. Put matching images under /public/garage */
export const GARAGE_ITEMS = [
  // Premium Sports Cars
  { id: "car_gt650", name: "Aston Martin GT 650", type: "car", tier: "Premium", img: "/garage/car_gt650.png" },
  { id: "car_bmw_m8", name: "BMW M8 Competition", type: "car", tier: "Premium", img: "/garage/car_bmw_m8.png" },
  { id: "car_ferrari_488", name: "Ferrari 488 Pista", type: "car", tier: "Premium", img: "/garage/car_ferrari_488.png" },
  { id: "car_lambo_sv", name: "Lamborghini Aventador SVJ", type: "car", tier: "Premium", img: "/garage/car_lambo_sv.png" },
  { id: "car_rimac_nevera", name: "Rimac Nevera", type: "car", tier: "Premium", img: "/garage/car_rimac_nevera.png" },

  // Premium Bikes
  { id: "bike_bmw_s1000", name: "BMW S1000RR M Package", type: "bike", tier: "Premium", img: "/garage/bike_bmw_s1000.png" },
  { id: "bike_bmw_k1600", name: "BMW K1600 Grand America", type: "bike", tier: "Premium", img: "/garage/bike_bmw_k1600.png" },
  { id: "bike_gt650", name: "Royal Enfield Continental GT 650", type: "bike", tier: "Premium", img: "/garage/bike_gt650.png" },
  { id: "bike_kawasaki_h2", name: "Kawasaki Ninja H2R", type: "bike", tier: "Premium", img: "/garage/bike_kawasaki_h2.png" },
  { id: "bike_ducati_v4", name: "Ducati Panigale V4 SP2", type: "bike", tier: "Premium", img: "/garage/bike_ducati_v4.png" },

  // Hypercars
  { id: "car_bugatti", name: "Bugatti Chiron Super Sport", type: "car", tier: "Hyper", img: "/garage/car_bugatti.png" },
  { id: "car_mclaren_765", name: "McLaren 765LT", type: "car", tier: "Hyper", img: "/garage/car_mclaren_765.png" },
  { id: "car_porsche_gt3", name: "Porsche 911 GT3 RS", type: "car", tier: "Hyper", img: "/garage/car_porsche_gt3.png" },
  { id: "car_koenigsegg", name: "Koenigsegg Jesko Absolut", type: "car", tier: "Hyper", img: "/garage/car_koenigsegg.png" },

  // BGMI Premium Skins
  { id: "skin_bgmi_phoenix", name: "BGMI Phoenix Ascend Skin", type: "skin", tier: "Epic", img: "/garage/skin_bgmi_phoenix.png" },
  { id: "skin_bgmi_shadow", name: "BGMI Shadow Strike Suit", type: "skin", tier: "Epic", img: "/garage/skin_bgmi_shadow.png" },
  { id: "skin_bgmi_gold", name: "BGMI Royal Gold Outfit", type: "skin", tier: "Legendary", img: "/garage/skin_bgmi_gold.png" },

  // Legendary Unlocks / Final Flex
  { id: "garage_bg_animated", name: "Animated Garage Background", type: "cosmetic", tier: "Legendary", img: "/garage/garage_bg_animated.png" },
  { id: "skin_bgmi_dragon", name: "BGMI Dragon’s Wrath Outfit", type: "skin", tier: "Mythic", img: "/garage/skin_bgmi_dragon.png" }
];

/** Pick a random locked item (so unlocks feel exciting). */
export function pickRandomLocked(ownedIds) {
  const owned = Array.isArray(ownedIds) ? ownedIds : [];
  const locked = GARAGE_ITEMS.filter(x => x && x.id && !owned.includes(x.id));
  if (!locked.length) return null;
  const idx = Math.floor(Math.random() * locked.length);
  return locked[idx];
}

/** Unlock one item and return it; no-op if everything owned. */
export async function unlockNextGarageItem(db, uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const data = snap.data() || {};
  const owned = Array.isArray(data.ownedItemIds) ? data.ownedItemIds : [];
  const next = pickRandomLocked(owned);
  if (!next) return null;

  await updateDoc(ref, { ownedItemIds: arrayUnion(next.id) });
  return next;
}
