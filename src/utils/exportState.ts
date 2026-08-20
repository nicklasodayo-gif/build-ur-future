import type { GameState } from "../types";

export async function exportState(state: GameState) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const filename = `build-your-future-state-${Date.now()}.json`;
  // trigger download
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  // attempt copy of shareable data URL (short-lived blob URL)
  try { await navigator.clipboard.writeText(url); } catch {}
  // return blob url so caller can generate QR or show link
  return url;
}
