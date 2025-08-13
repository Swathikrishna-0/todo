export const rankForXP = (xp) => {
  if (xp >= 1000) return { name: 'Radiant', icon: '🌟' }
  if (xp >= 700)  return { name: 'Diamond', icon: '💎' }
  if (xp >= 400)  return { name: 'Gold', icon: '🏆' }
  if (xp >= 200)  return { name: 'Silver', icon: '🥈' }
  return { name: 'Bronze', icon: '🥉' }
}

export const pointsForTask = (category = 'General') => {
  const map = { Work: 20, Masters: 25, Personal: 10, Fitness: 15, General: 12 }
  return map[category] ?? 12
}
