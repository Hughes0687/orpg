import "./style.css";
import { printLine, printCommand, onSubmit, focusInput, clearOutput } from "./ui/terminal.js";
import { processInput, startGame } from "./game/engine.js";
import { createIntro } from "./game/intro.js";

let gameStarted = false;

const intro = createIntro((state) => {
  gameStarted = true;
  clearOutput();
  printLine(startGame(state));
});

printLine(intro.getInitialOutput());

onSubmit((value) => {
  printCommand(value);

  if (gameStarted) {
    const result = processInput(value);
    if (result) printLine(result);
  } else {
    const result = intro.processInput(value);
    if (result) printLine(result);
  }
});

document.addEventListener("click", focusInput);
