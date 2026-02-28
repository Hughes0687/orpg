import { items } from "../game/items.js";

const output = document.getElementById("output");
const input = document.getElementById("input");

const itemPatterns = Object.entries(items)
  .sort((a, b) => b[0].length - a[0].length)
  .map(([key, item]) => ({
    regex: new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
    color: item.color,
    name: item.name,
  }));

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function colorizeItems(line) {
  let html = escapeHtml(line);
  for (const { regex, color } of itemPatterns) {
    html = html.replace(regex, (match) =>
      `<span class="item-link" style="color:${color}" data-item-action="take ${match}">${match}</span>`
    );
  }
  return html;
}

export function printLine(text) {
  const lines = text.split("\n");
  for (const line of lines) {
    const div = document.createElement("div");
    if (line) {
      div.innerHTML = colorizeItems(line);
    } else {
      div.textContent = "\u00A0";
    }
    output.appendChild(div);
  }
  output.scrollTop = output.scrollHeight;
}

export function printCommand(text) {
  const div = document.createElement("div");
  div.className = "text-emerald-400";
  div.textContent = `> ${text}`;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

export function onSubmit(callback) {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value;
      input.value = "";
      if (value.trim()) {
        callback(value);
      }
    }
  });

  input.focus();
}

let itemClickCallback = null;

export function onItemClick(callback) {
  itemClickCallback = callback;
}

output.addEventListener("click", (e) => {
  const target = e.target.closest("[data-item-action]");
  if (target && itemClickCallback) {
    e.stopPropagation();
    itemClickCallback(target.dataset.itemAction);
  }
});

export function clearOutput() {
  output.innerHTML = "";
}

export function focusInput() {
  input.focus();
}
