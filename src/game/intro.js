import { getClassList, formatStats } from "./characters.js";
import { createGameState, loadAllSaves } from "./state.js";

const STEPS = {
  TITLE: "title",
  CHOOSE_ACTION: "choose_action",
  ENTER_NAME: "enter_name",
  CHOOSE_CLASS: "choose_class",
  CONFIRM: "confirm",
  LOAD_SELECT: "load_select",
};

export function createIntro(onComplete) {
  let step = STEPS.TITLE;
  let charName = "";
  let charClassId = "";

  function getTitleScreen() {
    return [
      "",
      "  ██████  ██████  ██████   ██████ ",
      "  ██  ██  ██  ██  ██  ██  ██      ",
      "  ██  ██  ██████  ██████  ██  ███ ",
      "  ██  ██  ██  ██  ██      ██   ██ ",
      "  ██████  ██  ██  ██       ██████ ",
      "",
      "        A   T E X T   R P G",
      "",
      "  Press ENTER to begin...",
      "",
    ].join("\n");
  }

  function getActionMenu() {
    const saves = loadAllSaves();
    const lines = [
      "",
      "========================================",
      "            CHARACTER SELECT",
      "========================================",
      "",
      "  [1]  New Character",
    ];
    if (saves.length > 0) {
      lines.push("  [2]  Load Character");
    }
    lines.push("", 'Enter your choice:');
    return lines.join("\n");
  }

  function getClassMenu() {
    const classList = getClassList();
    const lines = [
      "",
      "========================================",
      "            CHOOSE YOUR CLASS",
      "========================================",
      "",
    ];
    for (const cls of classList) {
      lines.push(`  [${cls.index}]  ${cls.name}`);
      lines.push(`      ${cls.description}`);
      lines.push(formatStats(cls.stats));
      lines.push(`      HP: ${cls.hp}  Mana: ${cls.mana}`);
      lines.push("");
    }
    lines.push("Enter your choice:");
    return lines.join("\n");
  }

  function getConfirmScreen() {
    const classList = getClassList();
    const cls = classList.find((c) => c.id === charClassId);
    return [
      "",
      "========================================",
      "          CONFIRM YOUR CHARACTER",
      "========================================",
      "",
      `  Name:  ${charName}`,
      `  Class: ${cls.name}`,
      "",
      formatStats(cls.stats),
      `  HP: ${cls.hp}  Mana: ${cls.mana}`,
      "",
      "  [1]  Start Adventure",
      "  [2]  Start Over",
      "",
      "Enter your choice:",
    ].join("\n");
  }

  function getLoadScreen() {
    const saves = loadAllSaves();
    const lines = [
      "",
      "========================================",
      "           SAVED CHARACTERS",
      "========================================",
      "",
    ];
    saves.forEach((save, i) => {
      lines.push(`  [${i + 1}]  ${save.player.name} - Lv.${save.player.level || 1} ${save.player.class} (HP: ${save.player.hp}/${save.player.maxHp})`);
    });
    lines.push("", "  [0]  Back", "", "Enter your choice:");
    return lines.join("\n");
  }

  function getInitialOutput() {
    return getTitleScreen();
  }

  function processInput(input) {
    const trimmed = input.trim();

    switch (step) {
      case STEPS.TITLE:
        step = STEPS.CHOOSE_ACTION;
        return getActionMenu();

      case STEPS.CHOOSE_ACTION: {
        const saves = loadAllSaves();
        if (trimmed === "1") {
          step = STEPS.ENTER_NAME;
          return "\nEnter your character's name:";
        }
        if (trimmed === "2" && saves.length > 0) {
          step = STEPS.LOAD_SELECT;
          return getLoadScreen();
        }
        return 'Invalid choice. Enter "1" for New Character' + (saves.length > 0 ? ' or "2" for Load Character.' : ".");
      }

      case STEPS.ENTER_NAME: {
        if (trimmed.length === 0) {
          return "Name cannot be empty. Enter a name:";
        }
        if (trimmed.length > 20) {
          return "Name must be 20 characters or fewer. Enter a name:";
        }
        charName = trimmed;
        step = STEPS.CHOOSE_CLASS;
        return getClassMenu();
      }

      case STEPS.CHOOSE_CLASS: {
        const classList = getClassList();
        const choice = parseInt(trimmed, 10);
        const selected = classList.find((c) => c.index === choice);
        if (!selected) {
          return `Invalid choice. Enter a number 1-${classList.length}:`;
        }
        charClassId = selected.id;
        step = STEPS.CONFIRM;
        return getConfirmScreen();
      }

      case STEPS.CONFIRM: {
        if (trimmed === "1") {
          const state = createGameState(charName, charClassId);
          onComplete(state);
          return null;
        }
        if (trimmed === "2") {
          charName = "";
          charClassId = "";
          step = STEPS.CHOOSE_ACTION;
          return getActionMenu();
        }
        return 'Enter "1" to start or "2" to start over.';
      }

      case STEPS.LOAD_SELECT: {
        const saves = loadAllSaves();
        if (trimmed === "0") {
          step = STEPS.CHOOSE_ACTION;
          return getActionMenu();
        }
        const idx = parseInt(trimmed, 10) - 1;
        if (isNaN(idx) || idx < 0 || idx >= saves.length) {
          return `Invalid choice. Enter 1-${saves.length} or 0 to go back:`;
        }
        const loadedState = saves[idx];
        onComplete(loadedState);
        return null;
      }

      default:
        return null;
    }
  }

  return { getInitialOutput, processInput };
}
