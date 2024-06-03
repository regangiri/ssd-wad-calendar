export function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360); // Random hue value (0-359)
  const lightness = Math.floor(Math.random() * 20) + 70; // Random lightness (70-90 for pastel colors)
  return `hsl(${hue}, 100%, ${lightness}%)`;
}
