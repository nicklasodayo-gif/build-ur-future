import React from "react";
import { CircleHelp, RotateCcw, Volume2, VolumeX, Zap } from "lucide-react";

export default function TopBar({ state, onHelp, sound, soundOn, onRestart }: any) {
  return (
    <header className="topbar">
      <div className="brand-mini">✦ BUILD YOUR FUTURE</div>
      <div className="stat"><small>CITY LEVEL</small><b>{state.level}</b></div>
      <div className="stat future"><small>FUTURE</small><b><Zap size={15} /> {state.futurePoints}</b></div>
      <div className="stat"><small>POPULATION</small><b>👥 {state.population.toLocaleString()}</b></div>
      <div className="progress-wrap"><small>PROGRESS</small><div className="progress"><i style={{ width: `${state.progress}%` }} /></div></div>
      <div className="top-actions">
        <button className="icon" onClick={() => sound(!soundOn)} aria-label="Sound">{soundOn ? <Volume2 /> : <VolumeX />}</button>
        <button className="icon" onClick={onHelp} aria-label="Help"><CircleHelp /></button>
        <button className="icon" onClick={onRestart} aria-label="Restart"><RotateCcw /></button>
      </div>
    </header>
  );
}
