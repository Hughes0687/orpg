import { createGameState } from "./state.js";
import { parseCommand, commands } from "./commands.js";

let state = createGameState();

export function processInput(input) {
  const { command, args } = parseCommand(input);

  if (!command) return null;

  const handler = commands[command];
  if (!handler) {
    return `Unknown command: "${command}". Type "help" for a list of commands.`;
  }

  return handler(state, args);
}

export function getWelcome() {
  return [
    "========================================",
    "          ORPG - A Text Adventure       ",
    "========================================",
    "",
    'Type "help" to see available commands.',
    "",
    commands.look(state),
  ].join("\n");
}
