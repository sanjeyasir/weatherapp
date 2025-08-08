// src/utils.js
export const emojiPairs = [
  '🐶', '🐶',
  '🍕', '🍕',
  '🚗', '🚗',
  '🌈', '🌈',
  '🎉', '🎉',
  '⚽', '⚽',
  '🍎', '🍎',
  '🎵', '🎵',
];

export function getSeededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function shuffleWithSeed(array, seed) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(getSeededRandom(seed + i) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getTodaySeed() {
  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
  return parseInt(today.replace(/-/g, ''), 10);
}
