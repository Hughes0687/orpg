import "./style.css";
import { printLine, printCommand, onSubmit, focusInput, clearOutput } from "./ui/terminal.js";
import { processInput, startGame, getState } from "./game/engine.js";
import { createIntro } from "./game/intro.js";
import { initMinimap, renderMinimap, showMinimap } from "./ui/minimap.js";

let gameStarted = false;

initMinimap();

const intro = createIntro((state) => {
  gameStarted = true;
  clearOutput();
  printLine(startGame(state));
  showMinimap();
  renderMinimap(state);
});

printLine(intro.getInitialOutput());

onSubmit((value) => {
  printCommand(value);

  if (gameStarted) {
    const result = processInput(value);
    if (result) printLine(result);
    renderMinimap(getState());
  } else {
    const result = intro.processInput(value);
    if (result) printLine(result);
  }
});

document.addEventListener("click", focusInput);
