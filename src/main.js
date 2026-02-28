import "./style.css";
import { printLine, printCommand, onSubmit, focusInput } from "./ui/terminal.js";
import { processInput, getWelcome } from "./game/engine.js";

printLine(getWelcome());

onSubmit((value) => {
  printCommand(value);
  const result = processInput(value);
  if (result) {
    printLine(result);
  }
});

document.addEventListener("click", focusInput);
