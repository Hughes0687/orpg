import { saveCharacter } from "./state.js";
import { parseCommand, commands } from "./commands.js";

let state = null;

export function startGame(gameState) {
  state = gameState;
  saveCharacter(state);
  return getWelcome();
}

export function processInput(input) {
  const { command, args } = parseCommand(input);

  if (!command) return null;

  const handler = commands[command];
  if (!handler) {
    return `Unknown command: "${command}". Type "help" for a list of commands.`;
  }

  const result = handler(state, args);
  saveCharacter(state);
  return result;
}

export function getState() {
  return state;
}

function getWelcome() {
  return [
    "",
    "========================================",
    "          ORPG - A Text Adventure       ",
    "========================================",
    "",
    `  Welcome, ${state.player.name} the ${state.player.class}.`,
    "",
    '  Type "help" to see available commands.',
    "",
    commands.look(state),
  ].join("\n");
}
