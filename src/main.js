import "./style.css";
import { printLine, printCommand, onSubmit, onItemClick, focusInput, clearOutput } from "./ui/terminal.js";
import { processInput, startGame, getState } from "./game/engine.js";
import { createIntro } from "./game/intro.js";
import { initMinimap, renderMinimap, showSidebar } from "./ui/minimap.js";
import { initGear, renderGear, renderHP, renderMana, renderXP } from "./ui/gear.js";
import { initActions, renderActions, showActions } from "./ui/actions.js";
import { initInventory, toggleInventory, renderInventory, isInventoryOpen } from "./ui/inventory.js";
import { initCombatUI, renderCombatUI, hideMobPanel } from "./ui/combat.js";
import { startCombat, isInCombat, getCombatMob } from "./game/combat.js";
import { world } from "./game/world.js";

let gameStarted = false;

const combatCallbacks = {
  onLog: (text) => printLine(text),
  onStateChange: () => updateUI(getState()),
  onCombatEnd: (result) => {
    updateUI(getState());
    if (result === "death") {
      hideMobPanel();
    }
  },
};

function tryStartCombat(state) {
  const room = world[state.currentRoom];
  if (room?.type === "combat" && !isInCombat()) {
    startCombat(state, combatCallbacks);
  }
}

function handleAction(command) {
  if (!gameStarted) return;
  printCommand(command);
  const result = processInput(command);
  if (result === "__START_COMBAT__") {
    tryStartCombat(getState());
  } else if (result) {
    printLine(result);
  }
  updateUI(getState());
  tryStartCombat(getState());
}

function handleInventoryToggle() {
  if (!gameStarted) return;
  toggleInventory(getState());
}

initMinimap();
initGear();
initCombatUI();
initActions(handleAction, handleInventoryToggle);
initInventory(handleAction);

function updateUI(state) {
  renderMinimap(state);
  renderGear(state);
  renderHP(state);
  renderMana(state);
  renderXP(state);
  renderActions(state);
  renderCombatUI(getCombatMob());
  if (isInventoryOpen()) renderInventory(state);
}

const intro = createIntro((state) => {
  gameStarted = true;
  clearOutput();
  printLine(startGame(state));
  showSidebar();
  showActions();
  updateUI(state);
});

printLine(intro.getInitialOutput());
document.getElementById("input").value = "enter";

onSubmit((value) => {
  printCommand(value);

  if (gameStarted) {
    const result = processInput(value);
    if (result === "__START_COMBAT__") {
      tryStartCombat(getState());
    } else if (result) {
      printLine(result);
    }
    updateUI(getState());
    tryStartCombat(getState());
  } else {
    const result = intro.processInput(value);
    if (result) printLine(result);
  }
});

onItemClick(handleAction);

document.addEventListener("click", focusInput);
