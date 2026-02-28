export const classes = {
  warrior: {
    name: "Warrior",
    description: "A battle-hardened fighter. Strong and tough, but not particularly quick or clever.",
    stats: { strength: 14, dexterity: 10, constitution: 14, intelligence: 8, wisdom: 10, charisma: 10 },
    hp: 120,
  },
  mage: {
    name: "Mage",
    description: "A scholar of the arcane arts. Brilliant and perceptive, but physically frail.",
    stats: { strength: 6, dexterity: 10, constitution: 8, intelligence: 16, wisdom: 14, charisma: 10 },
    hp: 70,
  },
  rogue: {
    name: "Rogue",
    description: "A cunning shadow-dweller. Quick and charming, but not one for a fair fight.",
    stats: { strength: 8, dexterity: 16, constitution: 10, intelligence: 12, wisdom: 10, charisma: 14 },
    hp: 90,
  },
};

export function getClassList() {
  return Object.entries(classes).map(([id, cls], i) => ({
    index: i + 1,
    id,
    ...cls,
  }));
}

export function formatStats(stats) {
  return [
    `  STR: ${stats.strength.toString().padStart(2)}   DEX: ${stats.dexterity.toString().padStart(2)}   CON: ${stats.constitution.toString().padStart(2)}`,
    `  INT: ${stats.intelligence.toString().padStart(2)}   WIS: ${stats.wisdom.toString().padStart(2)}   CHA: ${stats.charisma.toString().padStart(2)}`,
  ].join("\n");
}
