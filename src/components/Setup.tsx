import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { GameMode } from "../types";
import { MODES, CITY_STYLES } from "../config";

export default function Setup({ state, setMode, setCity, setPlayer, onContinue }: any) {
  const [nickname, setNickname] = useState(state.player.nickname || "");
  const valid = nickname.trim().length > 0 && state.cityStyle;
  return (
    <main className="page setup">
      <div className="setup-card">
        <div className="eyebrow">01 / PLAYER SETUP</div>
        <h2>What should we call you?</h2>
        <input autoFocus value={nickname} maxLength={18} onChange={e => setNickname(e.target.value)} placeholder="Your nickname" />
        <div className="modes">
          {MODES.map((m) => (
            <button key={m.id} className={`mode ${state.gameMode === m.id ? "selected" : ""}`} onClick={() => setMode(m.id as GameMode)}>{m.name}</button>
          ))}
        </div>
        <div className="city-choices">
          {CITY_STYLES.map(c => (
            <button key={c.id} className={`city ${state.cityStyle === c.id ? "selected" : ""}`} onClick={() => setCity(c.id)}>
              <div className="emoji">{c.icon}</div>
              <div><b>{c.name}</b><small>{c.tagline}</small></div>
            </button>
          ))}
        </div>
        <div className="setup-actions">
          <button className="primary" disabled={!valid} onClick={() => { setPlayer(nickname); onContinue(); }}>CONTINUE <ArrowRight /></button>
          <button className="secondary" onClick={() => { setNickname("Guest"); setPlayer("Guest"); onContinue(); }}>PLAY AS GUEST</button>
        </div>
      </div>
    </main>
  );
}
