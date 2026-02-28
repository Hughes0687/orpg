import { getItem, isEquippable, SLOT_LABELS } from "../game/items.js";

let overlay = null;
let onAction = null;
let visible = false;

export function initInventory(actionCb) {
  overlay = document.getElementById("inventory-overlay");
  onAction = actionCb;
}

export function toggleInventory(state) {
  visible = !visible;
  if (visible) {
    renderInventory(state);
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
}

export function isInventoryOpen() {
  return visible;
}

export function renderInventory(state) {
  if (!overlay || !visible) return;

  const { inventory, equipment } = state.player;
  overlay.innerHTML = "";

  const backdrop = el("div", "absolute inset-0 bg-gray-950/80");
  backdrop.addEventListener("click", () => toggleInventory(state));
  overlay.appendChild(backdrop);

  const panel = el("div", "absolute inset-4 bg-gray-900 border border-gray-700 rounded-lg flex flex-col overflow-hidden z-10");

  // Header
  const header = el("div", "flex items-center justify-between px-4 py-2.5 border-b border-gray-800 shrink-0");
  const title = el("span", "text-xs uppercase tracking-widest text-emerald-400 font-bold");
  title.textContent = "Inventory";
  header.appendChild(title);

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "text-gray-500 hover:text-gray-300 text-sm font-bold transition-colors";
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", () => toggleInventory(state));
  header.appendChild(closeBtn);
  panel.appendChild(header);

  const body = el("div", "flex-1 overflow-y-auto p-4 flex flex-col gap-4");

  // Backpack section
  const backpackSection = el("div", "flex flex-col gap-2");
  const backpackTitle = el("span", "text-[10px] uppercase tracking-widest text-gray-500 font-bold");
  backpackTitle.textContent = "Backpack";
  backpackSection.appendChild(backpackTitle);

  if (inventory.length === 0) {
    const empty = el("span", "text-xs text-gray-600 italic");
    empty.textContent = "Empty";
    backpackSection.appendChild(empty);
  } else {
    for (const itemName of inventory) {
      const item = getItem(itemName);
      const row = el("div", "flex items-center justify-between gap-2 px-2 py-1.5 rounded bg-gray-800/60 border border-gray-800");

      const info = el("div", "flex flex-col gap-0.5 min-w-0");
      const nameEl = el("span", "text-xs text-gray-200 truncate");
      nameEl.textContent = item?.name || itemName;
      info.appendChild(nameEl);

      if (item?.description) {
        const desc = el("span", "text-[10px] text-gray-500 truncate");
        desc.textContent = item.description;
        info.appendChild(desc);
      }

      row.appendChild(info);

      if (isEquippable(itemName)) {
        const equipBtn = document.createElement("button");
        equipBtn.type = "button";
        equipBtn.className = "shrink-0 px-2 py-0.5 rounded border border-emerald-700/60 bg-emerald-900/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-800/50 transition-colors";
        equipBtn.textContent = "Equip";
        equipBtn.addEventListener("click", () => onAction(`equip ${itemName}`));
        row.appendChild(equipBtn);
      }

      backpackSection.appendChild(row);
    }
  }

  body.appendChild(backpackSection);

  // Equipped section
  const equippedSection = el("div", "flex flex-col gap-2");
  const equippedTitle = el("span", "text-[10px] uppercase tracking-widest text-gray-500 font-bold");
  equippedTitle.textContent = "Equipped";
  equippedSection.appendChild(equippedTitle);

  let hasEquipped = false;
  for (const [slot, itemName] of Object.entries(equipment)) {
    if (!itemName) continue;
    hasEquipped = true;

    const item = getItem(itemName);
    const row = el("div", "flex items-center justify-between gap-2 px-2 py-1.5 rounded bg-gray-800/60 border border-gray-800");

    const info = el("div", "flex flex-col gap-0.5 min-w-0");
    const nameRow = el("div", "flex items-center gap-1.5");
    const slotTag = el("span", "text-[9px] uppercase tracking-wider text-emerald-600 font-bold");
    slotTag.textContent = SLOT_LABELS[slot];
    nameRow.appendChild(slotTag);
    const nameEl = el("span", "text-xs text-gray-200 truncate");
    nameEl.textContent = item?.name || itemName;
    nameRow.appendChild(nameEl);
    info.appendChild(nameRow);

    if (item?.stats) {
      const statText = Object.entries(item.stats).map(([k, v]) => `+${v} ${k.slice(0, 3).toUpperCase()}`).join("  ");
      const stats = el("span", "text-[10px] text-gray-500");
      stats.textContent = statText;
      info.appendChild(stats);
    }

    row.appendChild(info);

    const unequipBtn = document.createElement("button");
    unequipBtn.type = "button";
    unequipBtn.className = "shrink-0 px-2 py-0.5 rounded border border-red-800/60 bg-red-900/20 text-red-400 text-[10px] font-bold uppercase tracking-wider hover:bg-red-800/40 transition-colors";
    unequipBtn.textContent = "Unequip";
    unequipBtn.addEventListener("click", () => onAction(`unequip ${slot}`));
    row.appendChild(unequipBtn);

    equippedSection.appendChild(row);
  }

  if (!hasEquipped) {
    const empty = el("span", "text-xs text-gray-600 italic");
    empty.textContent = "Nothing equipped";
    equippedSection.appendChild(empty);
  }

  body.appendChild(equippedSection);
  panel.appendChild(body);
  overlay.appendChild(panel);
}

function el(tag, classes) {
  const e = document.createElement(tag);
  if (classes) e.className = classes;
  return e;
}
