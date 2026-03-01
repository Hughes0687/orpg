import { getItem } from "./items.js";
import { getRandomMob } from "./mobs.js";
import { checkLevelUp } from "./leveling.js";
import { world } from "./world.js";

let mob = null;
let playerTimer = null;
let mobTimer = null;
let callbacks = null;
let combatState = null;

export function getEffectiveStats(player) {
  const base = { ...player.stats };
  for (const itemName of Object.values(player.equipment)) {
    if (!itemName) continue;
    const item = getItem(itemName);
    if (!item?.stats) continue;
    for (const [stat, val] of Object.entries(item.stats)) {
      base[stat] = (base[stat] || 0) + val;
    }
  }
  return base;
}

function playerAttackSpeed(stats) {
  return Math.max(800, Math.min(3000, 3000 - stats.dexterity * 80));
}

function calcDamage(attackStat, defenseStat) {
  const maxHit = Math.floor(attackStat * 1.5);
  const raw = Math.floor(Math.random() * maxHit) + 1 - defenseStat;
  return Math.max(1, raw);
}

function playerAttack(state) {
  if (!mob || !combatState) return;

  const stats = getEffectiveStats(state.player);
  const damage = calcDamage(stats.strength, mob.defense);
  mob.currentHp = Math.max(0, mob.currentHp - damage);

  callbacks.onLog(`  You strike the ${mob.name} for ${damage} damage!`);
  callbacks.onStateChange();

  if (mob.currentHp <= 0) {
    endCombatVictory(state);
  }
}

function mobAttack(state) {
  if (!mob || !combatState) return;

  const stats = getEffectiveStats(state.player);
  const damage = calcDamage(mob.attack, stats.constitution);
  state.player.hp = Math.max(0, state.player.hp - damage);

  callbacks.onLog(`  The ${mob.name} hits you for ${damage} damage!`);
  callbacks.onStateChange();

  if (state.player.hp <= 0) {
    endCombatDeath(state);
  }
}

function endCombatVictory(state) {
  clearTimers();
  callbacks.onLog(`\n  ** ${mob.name} defeated! **`);
  callbacks.onLog(`  You gain ${mob.xp} experience.`);

  state.player.xp += mob.xp;
  const levelMessages = checkLevelUp(state.player);
  for (const msg of levelMessages) {
    callbacks.onLog(msg);
  }

  const fallen = mob;
  mob = null;
  combatState = null;

  setTimeout(() => {
    const room = world[state.currentRoom];
    if (room?.type === "combat") {
      callbacks.onLog("\n  Another creature emerges from the darkness...\n");
      startCombat(state, callbacks);
    }
  }, 2000);

  callbacks.onCombatEnd("victory", fallen);
}

function endCombatDeath(state) {
  clearTimers();
  callbacks.onLog("\n  You have been slain...");
  callbacks.onLog("  You awaken back at the tavern, battered but alive.\n");
  mob = null;
  combatState = null;

  state.player.hp = state.player.maxHp;
  state.currentRoom = "tavern";

  callbacks.onCombatEnd("death", null);
}

function clearTimers() {
  if (playerTimer) { clearInterval(playerTimer); playerTimer = null; }
  if (mobTimer) { clearInterval(mobTimer); mobTimer = null; }
}

export function startCombat(state, cbs) {
  callbacks = cbs;
  mob = getRandomMob();
  combatState = { active: true };

  callbacks.onLog(`\n  A ${mob.name} appears!`);
  callbacks.onLog(`  "${mob.description}"\n`);
  callbacks.onStateChange();

  const stats = getEffectiveStats(state.player);
  const speed = playerAttackSpeed(stats);

  playerTimer = setInterval(() => playerAttack(state), speed);
  mobTimer = setInterval(() => mobAttack(state), mob.attackSpeed);
}

export function stopCombat() {
  clearTimers();
  mob = null;
  combatState = null;
}

export function fleeCombat(state) {
  if (!isInCombat()) return "You aren't in combat.";
  const name = mob.name;
  stopCombat();
  state.currentRoom = "town_square";
  return `You flee from the ${name} back to the safety of town!\n` + "\n** Town Square **\n";
}

export function getCombatMob() {
  return mob;
}

export function isInCombat() {
  return mob !== null && combatState !== null;
}
