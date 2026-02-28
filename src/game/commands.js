import { world } from "./world.js";
import { formatStats } from "./characters.js";
import { getItem, isEquippable, getEquipSlot, SLOT_LABELS } from "./items.js";

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
    if (!state.visitedRooms.includes(nextRoomId)) {
      state.visitedRooms.push(nextRoomId);
    }
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
      `  Name:  ${player.name}`,
      `  Class: ${player.class}`,
      `  HP:    ${player.hp}/${player.maxHp}`,
      "",
      formatStats(player.stats),
    ].join("\n");
  },

  equip(state, args) {
    if (args.length === 0) {
      return "Equip what? Usage: equip <item name>";
    }

    const itemName = args.join(" ");
    const invIndex = state.player.inventory.findIndex(
      (i) => i.toLowerCase() === itemName.toLowerCase()
    );

    if (invIndex === -1) {
      return `You don't have "${itemName}" in your inventory.`;
    }

    const actualName = state.player.inventory[invIndex];

    if (!isEquippable(actualName)) {
      return `${actualName} cannot be equipped.`;
    }

    let slot = getEquipSlot(actualName);

    if (slot === "ring") {
      slot = !state.player.equipment.ring1 ? "ring1" : "ring2";
    }

    const currentlyEquipped = state.player.equipment[slot];
    if (currentlyEquipped) {
      state.player.inventory.push(currentlyEquipped);
    }

    state.player.inventory.splice(invIndex, 1);
    state.player.equipment[slot] = actualName;

    const label = SLOT_LABELS[slot];
    let msg = `You equip ${actualName} (${label}).`;
    if (currentlyEquipped) {
      msg += ` ${currentlyEquipped} returned to inventory.`;
    }
    return msg;
  },

  unequip(state, args) {
    if (args.length === 0) {
      return "Unequip what? Usage: unequip <slot or item name>";
    }

    const query = args.join(" ").toLowerCase();

    let targetSlot = null;
    for (const [slot, equipped] of Object.entries(state.player.equipment)) {
      if (!equipped) continue;
      if (slot.toLowerCase() === query || equipped.toLowerCase() === query) {
        targetSlot = slot;
        break;
      }
    }

    if (!targetSlot) {
      return `Nothing matching "${query}" is equipped.`;
    }

    const removed = state.player.equipment[targetSlot];
    state.player.equipment[targetSlot] = null;
    state.player.inventory.push(removed);

    return `You unequip ${removed}.`;
  },

  gear(state) {
    const entries = Object.entries(state.player.equipment);
    const lines = ["Equipment:"];
    for (const [slot, item] of entries) {
      const label = SLOT_LABELS[slot].padEnd(10);
      lines.push(`  ${label} ${item || "-- empty --"}`);
    }
    return lines.join("\n");
  },

  help() {
    return [
      "Available commands:",
      "  look            - Examine your surroundings",
      "  go <dir>        - Move in a direction (n/s/e/w)",
      "  take <item>     - Pick up an item",
      "  inventory       - Check what you're carrying",
      "  equip <item>    - Equip a gear item",
      "  unequip <slot>  - Unequip a gear slot or item",
      "  gear            - View equipped gear",
      "  status          - View your stats",
      "  help            - Show this message",
    ].join("\n");
  },
};

commands.l = commands.look;
commands.i = commands.inventory;
commands.eq = commands.equip;
commands.g = commands.gear;
