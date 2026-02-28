const output = document.getElementById("output");
const input = document.getElementById("input");

export function printLine(text) {
  const lines = text.split("\n");
  for (const line of lines) {
    const div = document.createElement("div");
    div.textContent = line || "\u00A0";
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

export function focusInput() {
  input.focus();
}
