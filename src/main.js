import "./style.css";
import { printLine, printCommand, onSubmit, focusInput, clearOutput } from "./ui/terminal.js";
import { processInput, startGame, getState } from "./game/engine.js";
import { createIntro } from "./game/intro.js";
import { initMinimap, renderMinimap, showSidebar } from "./ui/minimap.js";
import { initGear, renderGear } from "./ui/gear.js";

let gameStarted = false;

initMinimap();
initGear();

function updateSidebar(state) {
  renderMinimap(state);
  renderGear(state);
}

const intro = createIntro((state) => {
  gameStarted = true;
  clearOutput();
  printLine(startGame(state));
  showSidebar();
  updateSidebar(state);
});

printLine(intro.getInitialOutput());

onSubmit((value) => {
  printCommand(value);

  if (gameStarted) {
    const result = processInput(value);
    if (result) printLine(result);
    updateSidebar(getState());
  } else {
    const result = intro.processInput(value);
    if (result) printLine(result);
  }
});

document.addEventListener("click", focusInput);
