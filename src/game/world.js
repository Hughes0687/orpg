export const world = {
  // ── Row 0 (y=0) ──────────────────────────────────────────────────
  outskirts: {
    name: "The Outskirts",
    description:
      "Beyond the town gates, the land grows wild and dangerous. Trampled grass and scattered bones hint at frequent skirmishes. Creatures from the dark lands roam here freely.",
    exits: { south: "town_square" },
    items: [],
    coords: { x: 2, y: 0 },
    icon: "⚔️",
    type: "combat",
  },

  // ── Row 1 (y=1) ──────────────────────────────────────────────────
  old_tower: {
    name: "The Old Tower",
    description:
      "A crumbling stone tower rises above you, ivy crawling up its sides. The heavy oak door is slightly ajar, creaking in the wind. Dust motes float in the pale light that filters through cracks in the walls.",
    exits: { east: "town_square" },
    items: ["torn scroll", "iron ring", "bone amulet"],
    coords: { x: 1, y: 1 },
    icon: "🏰",
    type: "dungeon",
  },

  town_square: {
    name: "Town Square",
    description:
      "The town square stretches out before you, cobblestones worn smooth by countless footsteps. A weathered fountain stands at the center, its water long dried up. Merchant stalls line the edges, and townsfolk bustle about their daily affairs.",
    exits: {
      north: "outskirts",
      south: "market_square",
      east: "green_field",
      west: "old_tower",
    },
    items: [],
    coords: { x: 2, y: 1 },
    icon: "⛲",
    type: "town",
  },

  green_field: {
    name: "Green Field",
    description:
      "A wide, sunlit meadow stretches before you. Wildflowers sway gently in a warm breeze, and butterflies dance between tall blades of grass. A well-worn dirt path cuts through the green toward a farmstead to the east.",
    exits: { west: "town_square", east: "farmstead", south: "field_path_e" },
    items: [],
    coords: { x: 3, y: 1 },
    icon: "🌱",
    type: "field",
  },

  farmstead: {
    name: "The Farmstead",
    description:
      "A modest stone farmhouse sits beside a fenced pasture. A few chickens scratch at the dirt, and the smell of fresh bread drifts from an open window. The farmer's tools lean against the wall, well-used but cared for.",
    exits: { west: "green_field", south: "old_ruins" },
    items: ["wool cloak", "rope belt", "farmer's gloves"],
    coords: { x: 4, y: 1 },
    icon: "🏠",
    type: "field",
  },

  // ── Row 2 (y=2) ──────────────────────────────────────────────────
  graveyard: {
    name: "The Graveyard",
    description:
      "Crooked headstones jut from the earth at odd angles, half-swallowed by moss and creeping vines. A thin mist clings to the ground. The air feels heavy here, and the silence is broken only by the occasional croak of a raven.",
    exits: { east: "field_path_w" },
    items: ["grave dust", "silver pendant"],
    coords: { x: 0, y: 2 },
    icon: "🪦",
    type: "graveyard",
  },

  field_path_w: {
    name: "Western Field Path",
    description:
      "A dirt trail runs between low stone walls, flanked by rolling green pastures. Sheep graze in the distance, oblivious to the world's troubles. The path connects the quieter western reaches to the market.",
    exits: { west: "graveyard", east: "market_square" },
    items: [],
    coords: { x: 1, y: 2 },
    icon: "👣",
    type: "trail",
  },

  market_square: {
    name: "Market Square",
    description:
      "A bustling open-air market fills this square with color and noise. Stalls draped in canvas sell everything from dried herbs to dented armor. A town crier shouts the day's news from atop an overturned crate.",
    exits: {
      north: "town_square",
      south: "tavern",
      east: "field_path_e",
      west: "field_path_w",
    },
    items: ["leather gloves", "cloth pants"],
    coords: { x: 2, y: 2 },
    icon: "⚖️",
    type: "market",
  },

  field_path_e: {
    name: "Eastern Field Path",
    description:
      "The trail narrows here, winding between a patchwork of tilled fields and wild hedgerows. Scarecrows stand watch over the crops with button eyes and burlap grins. Birdsong fills the air.",
    exits: { west: "market_square", north: "green_field", east: "old_ruins", south: "forest_edge" },
    items: [],
    coords: { x: 3, y: 2 },
    icon: "👣",
    type: "trail",
  },

  old_ruins: {
    name: "The Old Ruins",
    description:
      "Broken columns and shattered archways are all that remain of some ancient structure. Weeds push through cracked flagstones, and faded carvings hint at a forgotten civilization. Something glints among the rubble.",
    exits: { west: "field_path_e", north: "farmstead" },
    items: ["iron ring", "torn scroll"],
    coords: { x: 4, y: 2 },
    icon: "🧱",
    type: "ruins",
  },

  // ── Row 3 (y=3) ──────────────────────────────────────────────────
  tavern: {
    name: "The Rusty Flagon",
    description:
      "You stand in a dimly lit tavern. The smell of ale and woodsmoke fills the air. A crackling fireplace casts dancing shadows on the stone walls. A few patrons huddle over their drinks, paying you no mind.",
    exits: { north: "market_square", south: "forest_trail" },
    items: ["rusty key", "leather helmet"],
    coords: { x: 2, y: 3 },
    icon: "🍺",
    type: "tavern",
  },

  forest_edge: {
    name: "Forest Edge",
    description:
      "The open fields give way to a wall of ancient oaks. Dappled sunlight filters through the canopy, casting shifting patterns on the mossy ground. A narrow trail disappears into the gloom to the south.",
    exits: { north: "field_path_e", south: "deep_forest" },
    items: ["wooden staff"],
    coords: { x: 3, y: 3 },
    icon: "🌲",
    type: "forest",
  },

  // ── Row 4 (y=4) ──────────────────────────────────────────────────
  forest_trail: {
    name: "Spooky Forest Trail",
    description:
      "A twisting path snakes between gnarled trees whose branches claw at the sky like skeletal fingers. Strange mushrooms glow faintly along the trail's edge, and unsettling whispers seem to drift from deeper in the woods.",
    exits: { north: "tavern", south: "stream", east: "deep_forest" },
    items: [],
    coords: { x: 2, y: 4 },
    icon: "👣",
    type: "trail",
  },

  deep_forest: {
    name: "The Deep Forest",
    description:
      "Thick undergrowth and towering trees block out nearly all light. The air is damp and cool, heavy with the scent of rotting leaves. Eyes seem to watch from the darkness between the trunks. This is hunting ground for something dangerous.",
    exits: { north: "forest_edge", west: "forest_trail", east: "hidden_cave" },
    items: ["traveler's boots"],
    coords: { x: 3, y: 4 },
    icon: "🌲",
    type: "combat",
  },

  hidden_cave: {
    name: "The Hidden Cave",
    description:
      "Behind a curtain of hanging vines, a narrow cave mouth opens into the hillside. Inside, the walls glisten with moisture and veins of pale crystal. The remains of a campfire suggest someone — or something — has sheltered here recently.",
    exits: { west: "deep_forest" },
    items: ["leather vest", "crystal shard"],
    coords: { x: 4, y: 4 },
    icon: "🕳️",
    type: "cave",
  },

  // ── Row 5 (y=5) ──────────────────────────────────────────────────
  stream: {
    name: "The Whispering Stream",
    description:
      "A clear brook babbles over smooth stones, cutting a gentle path through the forest floor. Ferns and mossy rocks line its banks. The water is cold and refreshing — a peaceful respite from the dangers that lurk nearby.",
    exits: { north: "forest_trail" },
    items: ["mossy stone"],
    coords: { x: 2, y: 5 },
    icon: "🌊",
    type: "water",
  },
};

export function getMapBounds() {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const room of Object.values(world)) {
    minX = Math.min(minX, room.coords.x);
    minY = Math.min(minY, room.coords.y);
    maxX = Math.max(maxX, room.coords.x);
    maxY = Math.max(maxY, room.coords.y);
  }
  return { minX, minY, maxX, maxY };
}

export function getRoomAt(x, y) {
  for (const [id, room] of Object.entries(world)) {
    if (room.coords.x === x && room.coords.y === y) {
      return { id, ...room };
    }
  }
  return null;
}
