import React from "react";

export function ModeToggle() {
  return (
    <button
      onClick={() => document.documentElement.classList.toggle("dark")}
      className="border px-3 py-1 rounded"
    >
      Toggle Mode
    </button>
  );
}