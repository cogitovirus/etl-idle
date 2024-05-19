// utils/randomNameGenerator.ts
const adjectives = ["Quick", "Excited", "Bright", "Happy", "Bold"];
const nouns = ["Lion", "Dog", "Cat", "Tiger", "Elephant"];

export function generateRandomName(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective}${noun}`;
}
