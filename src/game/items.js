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
    color: "#b45309",
  },
  "wooden staff": {
    name: "Wooden Staff",
    type: "gear",
    slot: "chest",
    description: "A sturdy wooden staff.",
    stats: { strength: 1 },
    color: "#a16207",
  },
  "torn scroll": {
    name: "Torn Scroll",
    type: "misc",
    description: "A scroll with faded writing.",
    color: "#e5d5b0",
  },
  "leather helmet": {
    name: "Leather Helmet",
    type: "gear",
    slot: "helmet",
    description: "A simple leather cap.",
    stats: { constitution: 1 },
    color: "#b87333",
  },
  "iron ring": {
    name: "Iron Ring",
    type: "gear",
    slot: "ring",
    description: "A plain iron band.",
    stats: { strength: 1 },
    color: "#9ca3af",
  },
  "wool cloak": {
    name: "Wool Cloak",
    type: "gear",
    slot: "shoulders",
    description: "A heavy wool cloak.",
    stats: { constitution: 2 },
    color: "#d1c4a9",
  },
  "traveler's boots": {
    name: "Traveler's Boots",
    type: "gear",
    slot: "boots",
    description: "Well-worn leather boots.",
    stats: { dexterity: 1 },
    color: "#8b5e3c",
  },
  "cloth pants": {
    name: "Cloth Pants",
    type: "gear",
    slot: "pants",
    description: "Simple cloth trousers.",
    stats: { constitution: 1 },
    color: "#c8b88a",
  },
  "rope belt": {
    name: "Rope Belt",
    type: "gear",
    slot: "belt",
    description: "A rough rope belt.",
    stats: { strength: 1 },
    color: "#c9a96e",
  },
  "leather gloves": {
    name: "Leather Gloves",
    type: "gear",
    slot: "gloves",
    description: "Supple leather gloves.",
    stats: { dexterity: 1 },
    color: "#a0522d",
  },
  "bone amulet": {
    name: "Bone Amulet",
    type: "gear",
    slot: "amulet",
    description: "A carved bone pendant.",
    stats: { wisdom: 2 },
    color: "#e8dcc8",
  },
  "leather vest": {
    name: "Leather Vest",
    type: "gear",
    slot: "chest",
    description: "A sturdy leather vest.",
    stats: { constitution: 2 },
    color: "#8b6914",
  },
  "crystal shard": {
    name: "Crystal Shard",
    type: "misc",
    description: "A sliver of pale crystal that hums faintly when held.",
    color: "#a5f3fc",
  },
  "silver pendant": {
    name: "Silver Pendant",
    type: "gear",
    slot: "amulet",
    description: "A tarnished silver pendant with an etched rune.",
    stats: { intellect: 2 },
    color: "#c0c0c0",
  },
  "grave dust": {
    name: "Grave Dust",
    type: "misc",
    description: "A small pouch of fine grey dust scraped from a headstone.",
    color: "#a1a1aa",
  },
  "farmer's gloves": {
    name: "Farmer's Gloves",
    type: "gear",
    slot: "gloves",
    description: "Thick, dirt-stained work gloves. Surprisingly sturdy.",
    stats: { strength: 2 },
    color: "#92400e",
  },
  "mossy stone": {
    name: "Mossy Stone",
    type: "misc",
    description: "A smooth, flat stone covered in soft green moss. It feels oddly warm.",
    color: "#4ade80",
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
