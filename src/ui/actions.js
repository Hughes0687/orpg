import { world } from "../game/world.js";

const DIRECTIONS = ["north", "south", "east", "west"];
const DIR_LABELS = { north: "N", south: "S", east: "E", west: "W" };

let bar = null;
let dirButtons = {};
let onAction = null;
let inventoryToggleCb = null;

export function initActions(actionCb, inventoryCb) {
  bar = document.getElementById("action-bar");
  onAction = actionCb;
  inventoryToggleCb = inventoryCb;
  if (!bar) return;

  bar.innerHTML = "";

  const wrapper = el("div", "flex items-center gap-4");

  // D-pad
  const dpad = el("div", "grid grid-cols-3 grid-rows-3 gap-0.5 shrink-0");
  dpad.style.width = "5.5rem";
  dpad.style.height = "5.5rem";

  const dpadSlots = [
    null, "north", null,
    "west", null, "east",
    null, "south", null,
  ];

  for (let i = 0; i < 9; i++) {
    const dir = dpadSlots[i];
    if (i === 4) {
      const center = el("div", "w-full h-full rounded bg-gray-800/40 border border-gray-700/40 flex items-center justify-center text-[10px] text-gray-600 select-none");
      center.textContent = "●";
      dpad.appendChild(center);
      continue;
    }
    if (!dir) {
      dpad.appendChild(el("div", "w-full h-full"));
      continue;
    }
    const btn = dirBtn(dir);
    dirButtons[dir] = btn;
    dpad.appendChild(btn);
  }

  wrapper.appendChild(dpad);

  const actions = el("div", "flex items-center gap-1.5 flex-wrap");

  actions.appendChild(actionBtn("Look", "👁", () => onAction("look")));
  actions.appendChild(actionBtn("Take", "✋", () => onAction("take")));
  actions.appendChild(actionBtn("Inventory", "🎒", () => inventoryToggleCb()));
  actions.appendChild(actionBtn("Help", "❓", () => onAction("help")));

  wrapper.appendChild(actions);
  bar.appendChild(wrapper);
}

export function renderActions(state) {
  if (!bar) return;

  const room = world[state.currentRoom];
  const exits = room ? room.exits : {};

  for (const dir of DIRECTIONS) {
    const btn = dirButtons[dir];
    if (!btn) continue;
    const available = !!exits[dir];
    btn.disabled = !available;
    btn.classList.toggle("opacity-30", !available);
    btn.classList.toggle("cursor-not-allowed", !available);
    btn.classList.toggle("hover:bg-emerald-800/40", available);
    btn.classList.toggle("hover:border-emerald-600/60", available);
  }
}

export function showActions() {
  if (bar) bar.classList.remove("hidden");
}

function dirBtn(dir) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "w-full h-full rounded border border-gray-700/60 bg-gray-800/60 text-emerald-400 font-bold text-xs flex items-center justify-center transition-colors select-none";
  btn.textContent = DIR_LABELS[dir];
  btn.addEventListener("click", () => {
    if (!btn.disabled) onAction(`go ${dir}`);
  });
  return btn;
}

function actionBtn(label, icon, handler) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "px-2.5 py-1.5 rounded border border-gray-700/60 bg-gray-800/60 text-gray-300 text-[11px] font-bold flex items-center gap-1 transition-colors select-none hover:bg-emerald-800/40 hover:border-emerald-600/60 hover:text-emerald-300";
  btn.innerHTML = `<span class="text-sm">${icon}</span>${label}`;
  btn.addEventListener("click", handler);
  return btn;
}

function el(tag, classes) {
  const e = document.createElement(tag);
  if (classes) e.className = classes;
  return e;
}
