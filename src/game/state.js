import { classes } from "./characters.js";

export function createGameState(name, classId) {
  const cls = classes[classId];
  return {
    player: {
      name,
      class: cls.name,
      classId,
      hp: cls.hp,
      maxHp: cls.hp,
      stats: { ...cls.stats },
      inventory: [],
      equipment: {
        helmet: null,
        shoulders: null,
        chest: null,
        gloves: null,
        belt: null,
        pants: null,
        boots: null,
        amulet: null,
        ring1: null,
        ring2: null,
      },
    },
    currentRoom: "tavern",
    visitedRooms: ["tavern"],
    gameOver: false,
  };
}

const SAVE_KEY = "orpg_saves";

export function saveCharacter(state) {
  const saves = loadAllSaves();
  const existing = saves.findIndex((s) => s.player.name === state.player.name);
  if (existing !== -1) {
    saves[existing] = state;
  } else {
    saves.push(state);
  }
  localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
}

export function loadAllSaves() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY)) || [];
  } catch {
    return [];
  }
}

export function deleteSave(name) {
  const saves = loadAllSaves().filter((s) => s.player.name !== name);
  localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
}
