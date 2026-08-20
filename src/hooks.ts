import { useEffect, useState } from "react";
import { GameState } from "./types";
import { createInitialState } from "./game";

const KEY = "build-your-future-state-v1";

export function useGameState() {
  const [state,setState] = useState<GameState>(() => {
    try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : createInitialState(); }
    catch { return createInitialState(); }
  });
  useEffect(()=>localStorage.setItem(KEY,JSON.stringify(state)),[state]);
  return [state,setState] as const;
}

export function useSound() {
  const SOUND_KEY = "byf-sound-on-v1";
  const [on,setOn] = useState<boolean>(() => {
    try { const raw = localStorage.getItem(SOUND_KEY); return raw ? JSON.parse(raw) : true; } catch { return true; }
  });
  useEffect(() => { try { localStorage.setItem(SOUND_KEY, JSON.stringify(on)); } catch {} }, [on]);

  const play = (freq = 520, duration = 0.06, volume = 0.035) => {
    if (!on) return;
    try {
      const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = volume;
      osc.connect(gain); gain.connect(ctx.destination); osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.stop(ctx.currentTime + duration);
    } catch (e) { /* ignore */ }
  };

  const beep = (freq=520, duration=0.06) => play(freq, duration, 0.035);
  const click = () => play(880, 0.04, 0.02);

  return { on, setOn, beep, click };
}
