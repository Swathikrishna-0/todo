// All reaction GIFs under /public/reactions
export const REACTIONS = [
  "/reactions/big.gif",
  "/reactions/bigg.gif",
  "/reactions/boot.gif",
  "/reactions/box.gif",
  "/reactions/box2.gif",
  "/reactions/buddies.gif",
  "/reactions/claps.gif",
  "/reactions/clapss.gif",
  "/reactions/dance.gif",
  "/reactions/fly.gif",
  "/reactions/fy.gif",
  "/reactions/hearts.gif",
  "/reactions/heartss.gif",
  "/reactions/hi.gif",
  "/reactions/hug.gif",
  "/reactions/hug2.gif",
  "/reactions/kis.gif",
  "/reactions/kiss.gif",
  "/reactions/kiss2.gif",
  "/reactions/kisss.gif",
  "/reactions/letgo.gif",
  "/reactions/ly.gif",
  "/reactions/proud.gif",
  "/reactions/push.gif",
  "/reactions/shy.gif",
  "/reactions/think.gif",
  "/reactions/yes.gif"
];

export function randomReaction() {
  return REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
}

// Optional: preload for smoother first render
export function preloadReactions() {
  REACTIONS.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}
