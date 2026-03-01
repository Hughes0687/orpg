export const mobs = [
  {
    id: "goblin_scout",
    name: "Goblin Scout",
    description: "A snarling goblin with a rusty blade, darting between shadows.",
    level: 1,
    hp: 30,
    attack: 5,
    defense: 2,
    attackSpeed: 2000,
    xp: 25,
    color: "#6b8e23",
  },
  {
    id: "morgul_warg",
    name: "Morgul Warg",
    description: "A feral wolf-beast with glowing eyes and matted black fur.",
    level: 3,
    hp: 55,
    attack: 9,
    defense: 4,
    attackSpeed: 2500,
    xp: 60,
    color: "#7b68ee",
  },
  {
    id: "uruk_hai",
    name: "Uruk-hai Warrior",
    description: "A hulking armored orc bearing the white hand of Isengard.",
    level: 5,
    hp: 80,
    attack: 12,
    defense: 8,
    attackSpeed: 3500,
    xp: 120,
    color: "#8b0000",
  },
];

export function getRandomMob() {
  const template = mobs[Math.floor(Math.random() * mobs.length)];
  return { ...template, currentHp: template.hp };
}
