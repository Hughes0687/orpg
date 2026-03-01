import { SLOT_LABELS, SLOT_ICONS, getItem } from "../game/items.js";
import { xpForLevel } from "../game/leveling.js";
import { getEffectiveStats } from "../game/combat.js";

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
let hpBarFill = null;
let hpText = null;
let manaBarFill = null;
let manaText = null;
let xpBarFill = null;
let xpText = null;
let levelText = null;
let statsGrid = null;

const STAT_META = {
  strength:  { label: "STR", icon: "\u2694\uFE0F", color: "text-red-400" },
  defense:   { label: "DEF", icon: "\uD83D\uDEE1\uFE0F", color: "text-blue-400" },
  intellect: { label: "INT", icon: "\uD83D\uDCD6", color: "text-purple-400" },
  speed:     { label: "SPD", icon: "\u26A1",       color: "text-yellow-400" },
  luck:      { label: "LCK", icon: "\uD83C\uDF40", color: "text-green-400" },
};

export function initGear() {
  container = document.getElementById("gear-slots");
  hpBarFill = document.getElementById("hp-bar-fill");
  hpText = document.getElementById("hp-text");
  manaBarFill = document.getElementById("mana-bar-fill");
  manaText = document.getElementById("mana-text");
  xpBarFill = document.getElementById("xp-bar-fill");
  xpText = document.getElementById("xp-text");
  levelText = document.getElementById("level-text");
  statsGrid = document.getElementById("stats-grid");
}

export function renderGear(state) {
  if (!container) return;

  const { equipment } = state.player;
  container.innerHTML = "";

  for (const row of LAYOUT) {
    for (const slotId of row) {
      const cell = document.createElement("div");

      if (!slotId) {
        cell.className = "w-12 h-12";
        container.appendChild(cell);
        continue;
      }

      const equippedName = equipment[slotId];
      const isEmpty = !equippedName;
      const item = equippedName ? getItem(equippedName) : null;

      cell.className = "w-12 h-12 rounded border flex items-center justify-center relative group cursor-default transition-colors";

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

export function renderHP(state) {
  if (!hpBarFill || !hpText) return;

  const { hp, maxHp } = state.player;
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100));

  hpBarFill.style.width = `${pct}%`;

  if (pct > 50) {
    hpBarFill.className = "h-full rounded-full transition-all duration-300 bg-emerald-500";
  } else if (pct > 25) {
    hpBarFill.className = "h-full rounded-full transition-all duration-300 bg-yellow-500";
  } else {
    hpBarFill.className = "h-full rounded-full transition-all duration-300 bg-red-500";
  }

  hpText.textContent = `${hp} / ${maxHp}`;
}

export function renderXP(state) {
  if (!xpBarFill || !xpText || !levelText) return;

  const { level, xp } = state.player;
  const needed = xpForLevel(level);
  const pct = Math.max(0, Math.min(100, (xp / needed) * 100));

  xpBarFill.style.width = `${pct}%`;
  xpText.textContent = `${xp} / ${needed}`;
  levelText.textContent = level;
}

export function renderMana(state) {
  if (!manaBarFill || !manaText) return;

  const { mana, maxMana } = state.player;
  const pct = Math.max(0, Math.min(100, (mana / maxMana) * 100));

  manaBarFill.style.width = `${pct}%`;
  manaText.textContent = `${mana} / ${maxMana}`;
}

export function renderStats(state) {
  if (!statsGrid) return;

  const base = state.player.stats;
  const effective = getEffectiveStats(state.player);

  statsGrid.innerHTML = "";

  for (const [stat, meta] of Object.entries(STAT_META)) {
    const baseVal = base[stat] || 0;
    const totalVal = effective[stat] || 0;
    const bonus = totalVal - baseVal;

    const row = document.createElement("div");
    row.className = "contents";

    const label = document.createElement("span");
    label.className = `${meta.color} font-bold`;
    label.textContent = `${meta.icon} ${meta.label}`;

    const value = document.createElement("span");
    value.className = "text-gray-300 text-right";
    if (bonus > 0) {
      value.innerHTML = `${baseVal} <span class="text-emerald-400">+${bonus}</span>`;
    } else {
      value.textContent = `${totalVal}`;
    }

    statsGrid.appendChild(label);
    statsGrid.appendChild(value);
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
