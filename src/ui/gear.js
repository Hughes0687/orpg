import { SLOT_LABELS, SLOT_ICONS, getItem } from "../game/items.js";

const LAYOUT = [
  [null,    "helmet",    null],
  [null,    "amulet",    null],
  ["shoulders", "chest", "gloves"],
  [null,    "belt",      null],
  [null,    "pants",     null],
  [null,    "boots",     null],
  ["ring1", null,        "ring2"],
];

let container = null;

export function initGear() {
  container = document.getElementById("gear-slots");
}

export function renderGear(state) {
  if (!container) return;

  const { equipment } = state.player;
  container.innerHTML = "";

  for (const row of LAYOUT) {
    for (const slotId of row) {
      const cell = document.createElement("div");

      if (!slotId) {
        cell.className = "w-10 h-10";
        container.appendChild(cell);
        continue;
      }

      const equippedName = equipment[slotId];
      const isEmpty = !equippedName;
      const item = equippedName ? getItem(equippedName) : null;

      cell.className = "w-10 h-10 rounded border flex items-center justify-center relative group cursor-default transition-colors";

      if (isEmpty) {
        cell.classList.add("border-gray-700/60", "bg-gray-800/40", "text-gray-600");
        cell.innerHTML = `<span class="text-sm select-none">${SLOT_ICONS[slotId]}</span>`;
      } else {
        cell.classList.add("border-emerald-700/60", "bg-emerald-900/30", "text-emerald-300");
        cell.innerHTML = `<span class="text-sm select-none">${SLOT_ICONS[slotId]}</span>`;
      }

      const tooltip = document.createElement("div");
      tooltip.className = "absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-[10px] text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10";

      if (isEmpty) {
        tooltip.textContent = `${SLOT_LABELS[slotId]} - Empty`;
      } else {
        const statText = item?.stats
          ? " (" + Object.entries(item.stats).map(([k, v]) => `+${v} ${k.slice(0, 3).toUpperCase()}`).join(", ") + ")"
          : "";
        tooltip.textContent = `${item?.name || equippedName}${statText}`;
      }

      cell.appendChild(tooltip);
      container.appendChild(cell);
    }
  }
}

export function showGear() {
  const panel = document.getElementById("gear-panel");
  if (panel) panel.classList.remove("hidden");
}

export function hideGear() {
  const panel = document.getElementById("gear-panel");
  if (panel) panel.classList.add("hidden");
}
