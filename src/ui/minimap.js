import { world, getMapBounds, getRoomAt } from "../game/world.js";

const TILE_SIZE = 48;
const GAP = 4;

const TYPE_COLORS = {
  tavern:  { bg: "bg-amber-900/60",  border: "border-amber-700" },
  town:    { bg: "bg-stone-700/60",  border: "border-stone-500" },
  forest:  { bg: "bg-green-900/60",  border: "border-green-700" },
  dungeon: { bg: "bg-slate-800/60",  border: "border-slate-600" },
};

const DEFAULT_COLORS = { bg: "bg-gray-800/60", border: "border-gray-600" };

let container = null;
let mapLabel = null;

export function initMinimap() {
  container = document.getElementById("minimap");
  mapLabel = document.getElementById("minimap-label");
}

export function renderMinimap(state) {
  if (!container) return;

  const { minX, minY, maxX, maxY } = getMapBounds();
  const cols = maxX - minX + 1;
  const rows = maxY - minY + 1;

  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(${cols}, ${TILE_SIZE}px)`;
  container.style.gridTemplateRows = `repeat(${rows}, ${TILE_SIZE}px)`;
  container.style.gap = `${GAP}px`;

  const currentRoom = world[state.currentRoom];
  if (mapLabel) {
    mapLabel.textContent = currentRoom.name;
  }

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const roomData = getRoomAt(x, y);
      const tile = document.createElement("div");
      tile.className = "relative flex items-center justify-center rounded";
      tile.style.width = `${TILE_SIZE}px`;
      tile.style.height = `${TILE_SIZE}px`;

      if (!roomData) {
        tile.classList.add("bg-transparent");
        container.appendChild(tile);
        continue;
      }

      const isVisited = state.visitedRooms.includes(roomData.id);
      const isCurrent = state.currentRoom === roomData.id;

      if (!isVisited) {
        tile.classList.add("bg-gray-900/40", "border", "border-gray-800/50");
        tile.innerHTML = `<span class="text-gray-700 text-lg">?</span>`;
        container.appendChild(tile);
        continue;
      }

      const colors = TYPE_COLORS[roomData.type] || DEFAULT_COLORS;
      tile.classList.add(colors.bg, "border", colors.border);

      if (isCurrent) {
        tile.classList.add("ring-2", "ring-emerald-400", "shadow-lg", "shadow-emerald-400/20");
      }

      tile.innerHTML = `<span class="text-xl leading-none select-none">${roomData.icon}</span>`;

      if (isCurrent) {
        const pulse = document.createElement("div");
        pulse.className = "absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse";
        tile.appendChild(pulse);
      }

      const hasExits = Object.entries(roomData.exits);
      for (const [dir] of hasExits) {
        const connector = document.createElement("div");
        connector.className = "absolute bg-gray-600/60";
        switch (dir) {
          case "north":
            connector.className += " w-0.5 h-2 left-1/2 -translate-x-1/2 -top-2";
            break;
          case "south":
            connector.className += " w-0.5 h-2 left-1/2 -translate-x-1/2 -bottom-2";
            break;
          case "east":
            connector.className += " h-0.5 w-2 top-1/2 -translate-y-1/2 -right-2";
            break;
          case "west":
            connector.className += " h-0.5 w-2 top-1/2 -translate-y-1/2 -left-2";
            break;
        }
        tile.appendChild(connector);
      }

      container.appendChild(tile);
    }
  }
}

export function showSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.remove("hidden");
}

export function hideSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.add("hidden");
}
