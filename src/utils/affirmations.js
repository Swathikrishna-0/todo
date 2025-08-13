export const AFFIRMATIONS = [
  // Quick hype
  "You’ve got this—and I’ve got you. 💪❤️",
  "That’s my man. One more? 😘✨",
  "Proud of you—level up unlocked! 🏆💋",
  "You’re unstoppable today. Keep riding. 🏍️⚡",
  "Clean headshot on that task. ACE! 🎯🔥",
  "You make productivity look sexy. 😏🚀",
  "Boom. Another win for us. 🌟🤝",
  "Crushing it like a pro. Next round? 🎮⚔️",
  "The way you focus… irresistibly hot. 😮‍💨💖",
  "Little steps, big W’s. Keep going. 🧠➡️🏁",
  // Gratitude & love
  "Thank you for working so hard for us. I see you. 🤍",
  "I love the man you’re becoming—dedicated and real. 🙌",
  "You always have my back. I’m yours, fully. 🔒❤️",
  "You make me feel safe and seen. Thank you. 🫶",
  "Your presence calms my world. Stay with me. 🌗🤍",
  "I’m grateful you’re mine. Every day. 🌅💞",
  "You inspire me to push my limits too. 🚀👩‍❤️‍👨",
  "You’re my favorite teammate—on and off the map. 🎮💑",
  "Let’s grow old and playful together. ♾️✨",
  "My biggest pride is being your person. 🏅💘",
  // Tough-times
  "Tough times don’t last. You do. 🛡️",
  "Think of what you’ve already survived. This is light work. 🔥",
  "Keep doing the right things; the rest will follow. 🧭",
  "Your peace and values are priceless—protect them. 🕊️",
  "Accept, adjust, advance. You always do. 🔁",
  "This too shall pass. I believe in you. 🌤️",
  "You’re allowed to stumble. Champions stand up faster. 🏋️",
  "Do life at your pace—not theirs. ⏱️",
  "Warrior mode: on. 🗡️🛡️",
  "Your inner light’s still on. I can see it. ✨",
  // Playful + spicy (PG-13)
  "Ten more and you earn Kiss DLC. 💋🎟️",
  "You complete tasks; I complete you. 😏💞",
  "Reporting live: you’re dangerously handsome and productive. 📣🔥",
  "Task done—collect cuddle currency at checkout. 🛒🧸",
  "I owe you 3 kisses. Claim window: now. 💋💋💋",
  "Next milestone: roast battle winner picks the date. 🔥🍜",
  "New perk unlocked: “Sexy Talk” voice note. 🎧😉",
  "Bike revs for my star. Ready for a ride? 🏍️💨",
  "Productivity looks great on you… and off you. 😌✨",
  "Approved: one flirty dance later. 💃🪩",
  // BGMI/Gamer themed
  "Mission cleared. Loot the kisses. 🎒💋",
  "Rank up: Bronze → Silver. Radiant soon? 🌟",
  "Killfeed: Task deleted by YOU (+15XP). 📰🎮",
  "Drop zone secured. Next objective in sight. 🪂🎯",
  "Squad buff applied: +Focus +Confidence. 🧪🧠",
  "You’re my MVP. Always. 🏆",
  "Radiant energy detected. Keep farming XP. 💎⚡",
  "Safe zone shrinking—move to next task. 🌀➡️",
  "Ace round. Economy stable. Buy time = cuddle time. 🧮🫂",
  "Victory dance later. You earned it. 🕺🏁"
]

// (Optional) add stickers later; for now just emojis in text.
export function randomAffirmation() {
  return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]
}
