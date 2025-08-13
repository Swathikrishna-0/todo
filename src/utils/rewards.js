export const playfulRewards = [
  "10 kisses 💋",
  "Roast battle—your move 🔥",
  "Sexy dance performance 💃",
  "Late-night cuddle DLC 🛌",
  "Spicy voice note 🎧",
  "Strip tease (limited edition) 😏",
  "Custom love coupon 🎟️",
  "Winner chooses date night 🍣",
  "Bike wash roleplay 🏍️🫧",
  "Car rev session + ride 🏎️💨"
]

export const randomReward = () =>
  playfulRewards[Math.floor(Math.random() * playfulRewards.length)]
