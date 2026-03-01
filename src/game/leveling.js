import { classes } from "./characters.js";

export function xpForLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}

export function checkLevelUp(player) {
  const messages = [];
  let threshold = xpForLevel(player.level);

  while (player.xp >= threshold) {
    player.xp -= threshold;
    player.level++;
    player.statPoints += 5;

    const cls = classes[player.classId];
    const hpGain = cls.hpPerLevel;
    const manaGain = cls.manaPerLevel;

    player.maxHp += hpGain;
    player.maxMana += manaGain;
    player.hp = player.maxHp;
    player.mana = player.maxMana;

    messages.push(
      `\n  ** LEVEL UP! You are now level ${player.level}! **`,
      `  +${hpGain} Max HP, +${manaGain} Max Mana, +5 Stat Points`,
      `  HP and Mana fully restored.`
    );

    threshold = xpForLevel(player.level);
  }

  return messages;
}

const STAT_ALIASES = {
  str: "strength",
  dex: "dexterity",
  con: "constitution",
  int: "intelligence",
  wis: "wisdom",
  cha: "charisma",
  strength: "strength",
  dexterity: "dexterity",
  constitution: "constitution",
  intelligence: "intelligence",
  wisdom: "wisdom",
  charisma: "charisma",
};

export function allocatePoints(player, statInput, count) {
  const stat = STAT_ALIASES[statInput.toLowerCase()];
  if (!stat) {
    return `Unknown stat "${statInput}". Use: str, dex, con, int, wis, cha.`;
  }

  if (player.statPoints <= 0) {
    return "You have no stat points to allocate.";
  }

  const amount = Math.min(count, player.statPoints);
  player.stats[stat] += amount;
  player.statPoints -= amount;

  const label = stat.charAt(0).toUpperCase() + stat.slice(1);
  return `Allocated ${amount} point${amount > 1 ? "s" : ""} to ${label}. (${player.stats[stat]} total, ${player.statPoints} points remaining)`;
}
