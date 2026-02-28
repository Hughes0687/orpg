import "./style.css";
import { printLine, printCommand, onSubmit, onItemClick, focusInput, clearOutput } from "./ui/terminal.js";
import { processInput, startGame, getState } from "./game/engine.js";
import { createIntro } from "./game/intro.js";
import { initMinimap, renderMinimap, showSidebar } from "./ui/minimap.js";
import { initGear, renderGear, renderHP } from "./ui/gear.js";
import { initActions, renderActions, showActions } from "./ui/actions.js";
import { initInventory, toggleInventory, renderInventory, isInventoryOpen } from "./ui/inventory.js";

let gameStarted = false;

function handleAction(command) {
  if (!gameStarted) return;
  printCommand(command);
  const result = processInput(command);
  if (result) printLine(result);
  updateUI(getState());
}

function handleInventoryToggle() {
  if (!gameStarted) return;
  toggleInventory(getState());
}

initMinimap();
initGear();
initActions(handleAction, handleInventoryToggle);
initInventory(handleAction);

function updateUI(state) {
  renderMinimap(state);
  renderGear(state);
  renderHP(state);
  renderActions(state);
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
    if (result) printLine(result);
    updateUI(getState());
  } else {
    const result = intro.processInput(value);
    if (result) printLine(result);
  }
});

onItemClick(handleAction);

document.addEventListener("click", focusInput);
