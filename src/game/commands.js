import { world } from "./world.js";

const DIRECTION_ALIASES = {
  n: "north",
  s: "south",
  e: "east",
  w: "west",
  u: "up",
  d: "down",
};

function normalizeDirection(dir) {
  return DIRECTION_ALIASES[dir] || dir;
}

export function parseCommand(input) {
  const trimmed = input.trim().toLowerCase();
  const [command, ...args] = trimmed.split(/\s+/);
  return { command, args, raw: trimmed };
}

export const commands = {
  look(state) {
    const room = world[state.currentRoom];
    const lines = [`\n** ${room.name} **\n`, room.description];

    const exits = Object.keys(room.exits);
    if (exits.length > 0) {
      lines.push(`\nExits: ${exits.join(", ")}`);
    }

    if (room.items.length > 0) {
      lines.push(`You notice: ${room.items.join(", ")}`);
    }

    return lines.join("\n");
  },

  go(state, args) {
    if (args.length === 0) {
      return "Go where? Specify a direction (north, south, east, west).";
    }

    const direction = normalizeDirection(args[0]);
    const room = world[state.currentRoom];
    const nextRoomId = room.exits[direction];

    if (!nextRoomId) {
      return `You can't go ${direction} from here.`;
    }

    state.currentRoom = nextRoomId;
    return commands.look(state);
  },

  take(state, args) {
    if (args.length === 0) {
      return "Take what?";
    }

    const itemName = args.join(" ");
    const room = world[state.currentRoom];
    const itemIndex = room.items.findIndex(
      (i) => i.toLowerCase() === itemName.toLowerCase()
    );

    if (itemIndex === -1) {
      return `There is no "${itemName}" here.`;
    }

    const item = room.items.splice(itemIndex, 1)[0];
    state.player.inventory.push(item);
    return `You pick up the ${item}.`;
  },

  inventory(state) {
    if (state.player.inventory.length === 0) {
      return "You aren't carrying anything.";
    }
    return "You are carrying:\n" + state.player.inventory.map((i) => `  - ${i}`).join("\n");
  },

  status(state) {
    const { player } = state;
    return [
      `Name: ${player.name}`,
      `HP:   ${player.hp}/${player.maxHp}`,
    ].join("\n");
  },

  help() {
    return [
      "Available commands:",
      "  look          - Examine your surroundings",
      "  go <dir>      - Move in a direction (north/south/east/west or n/s/e/w)",
      "  take <item>   - Pick up an item",
      "  inventory     - Check what you're carrying",
      "  status        - View your stats",
      "  help          - Show this message",
    ].join("\n");
  },
};

commands.l = commands.look;
commands.i = commands.inventory;
