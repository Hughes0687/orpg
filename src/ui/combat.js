let panel = null;
let mobNameEl = null;
let mobHpFill = null;
let mobHpText = null;

export function initCombatUI() {
  panel = document.getElementById("mob-panel");
  mobNameEl = document.getElementById("mob-name");
  mobHpFill = document.getElementById("mob-hp-fill");
  mobHpText = document.getElementById("mob-hp-text");
}

export function renderCombatUI(mob) {
  if (!panel) return;

  if (!mob) {
    panel.classList.add("hidden");
    return;
  }

  panel.classList.remove("hidden");
  mobNameEl.textContent = `Lv.${mob.level} ${mob.name}`;

  const pct = Math.max(0, Math.min(100, (mob.currentHp / mob.hp) * 100));
  mobHpFill.style.width = `${pct}%`;
  mobHpText.textContent = `${mob.currentHp} / ${mob.hp}`;
}

export function hideMobPanel() {
  if (panel) panel.classList.add("hidden");
}
