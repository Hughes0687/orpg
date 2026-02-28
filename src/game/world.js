export const world = {
  tavern: {
    name: "The Rusty Flagon",
    description:
      "You stand in a dimly lit tavern. The smell of ale and woodsmoke fills the air. A crackling fireplace casts dancing shadows on the stone walls. A few patrons huddle over their drinks, paying you no mind.",
    exits: {
      north: "town_square",
    },
    items: ["rusty key"],
  },

  town_square: {
    name: "Town Square",
    description:
      "The town square stretches out before you, cobblestones worn smooth by countless footsteps. A weathered fountain stands at the center, its water long dried up. To the south lies the tavern, and a dark forest path leads east. A crumbling stone tower looms to the west.",
    exits: {
      south: "tavern",
      east: "forest_path",
      west: "old_tower",
    },
    items: [],
  },

  forest_path: {
    name: "Forest Path",
    description:
      "Tall oaks loom overhead, their branches intertwining to form a canopy that blocks most of the sunlight. The air is cool and damp. Strange sounds echo from deeper in the woods. The path back to town lies to the west.",
    exits: {
      west: "town_square",
    },
    items: ["wooden staff"],
  },

  old_tower: {
    name: "The Old Tower",
    description:
      "A crumbling stone tower rises above you, ivy crawling up its sides. The heavy oak door is slightly ajar, creaking in the wind. Dust motes float in the pale light that filters through cracks in the walls. The town square is back to the east.",
    exits: {
      east: "town_square",
    },
    items: ["torn scroll"],
  },
};
