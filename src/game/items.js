export const SLOT_LABELS = {
  helmet:    "Helmet",
  shoulders: "Shoulders",
  chest:     "Chest",
  gloves:    "Gloves",
  belt:      "Belt",
  pants:     "Pants",
  boots:     "Boots",
  amulet:    "Amulet",
  ring1:     "Ring",
  ring2:     "Ring",
};

export const SLOT_ICONS = {
  helmet:    "🪖",
  shoulders: "🛡️",
  chest:     "👕",
  gloves:    "🧤",
  belt:      "🪢",
  pants:     "👖",
  boots:     "👢",
  amulet:    "📿",
  ring1:     "💍",
  ring2:     "💍",
};

export const items = {
  "rusty key": {
    name: "Rusty Key",
    type: "misc",
    description: "An old iron key, covered in rust.",
  },
  "wooden staff": {
    name: "Wooden Staff",
    type: "gear",
    slot: "chest",
    description: "A sturdy wooden staff.",
    stats: { strength: 1 },
  },
  "torn scroll": {
    name: "Torn Scroll",
    type: "misc",
    description: "A scroll with faded writing.",
  },
  "leather helmet": {
    name: "Leather Helmet",
    type: "gear",
    slot: "helmet",
    description: "A simple leather cap.",
    stats: { constitution: 1 },
  },
  "iron ring": {
    name: "Iron Ring",
    type: "gear",
    slot: "ring",
    description: "A plain iron band.",
    stats: { strength: 1 },
  },
  "wool cloak": {
    name: "Wool Cloak",
    type: "gear",
    slot: "shoulders",
    description: "A heavy wool cloak.",
    stats: { constitution: 2 },
  },
  "traveler's boots": {
    name: "Traveler's Boots",
    type: "gear",
    slot: "boots",
    description: "Well-worn leather boots.",
    stats: { dexterity: 1 },
  },
  "cloth pants": {
    name: "Cloth Pants",
    type: "gear",
    slot: "pants",
    description: "Simple cloth trousers.",
    stats: { constitution: 1 },
  },
  "rope belt": {
    name: "Rope Belt",
    type: "gear",
    slot: "belt",
    description: "A rough rope belt.",
    stats: { strength: 1 },
  },
  "leather gloves": {
    name: "Leather Gloves",
    type: "gear",
    slot: "gloves",
    description: "Supple leather gloves.",
    stats: { dexterity: 1 },
  },
  "bone amulet": {
    name: "Bone Amulet",
    type: "gear",
    slot: "amulet",
    description: "A carved bone pendant.",
    stats: { wisdom: 2 },
  },
  "leather vest": {
    name: "Leather Vest",
    type: "gear",
    slot: "chest",
    description: "A sturdy leather vest.",
    stats: { constitution: 2 },
  },
};

export function getItem(name) {
  return items[name.toLowerCase()] || null;
}

export function isEquippable(name) {
  const item = getItem(name);
  return item && item.type === "gear";
}

export function getEquipSlot(name) {
  const item = getItem(name);
  if (!item || item.type !== "gear") return null;
  return item.slot;
}
