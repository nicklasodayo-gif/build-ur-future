import React from "react";
import { ArrowRight } from "lucide-react";
import { BUILDINGS } from "../config";
import { maxBuilds } from "../game";

export default function BuildScreen({ state, selectedPlot, setSelectedPlot, onBuild, onChallenge }: any) {
  const plots = Array.from({ length: 12 });
  const canBuild = state.buildings.length < maxBuilds(state.gameMode);
  return (
    <main className="game-page">
      <section className="city-panel">
        <div className="city-map">
          {plots.map((_, i) => {
            const placed = state.buildings.find((b:any) => b.plot === i);
            return (
              <button key={i} className={`plot ${placed ? "occupied" : "empty"} ${selectedPlot === i ? "active" : ""}`} onClick={() => !placed && canBuild && setSelectedPlot(i)}>
                {placed ? <div className="placed">{placed.icon}<small>{placed.name}</small></div> : <div className="empty-plot">+</div>}
              </button>
            );
          })}
        </div>
      </section>
      <aside className="build-panel">
        <div className="panel-head"><h3>{selectedPlot === null ? "Choose a plot" : "Choose a building"}</h3>{selectedPlot !== null && <button className="icon" onClick={() => setSelectedPlot(null)}>×</button>}</div>
        {selectedPlot === null ? (
          <div className="instruction"><h4>Tap an empty plot</h4><p>Choose what your city needs next. You can't build everything, so make choices that matter.</p><div className="build-progress"><div className="progress"><i style={{ width: `${state.progress}%` }} /></div><div className="meta">{state.buildings.length}/{maxBuilds(state.gameMode)} buildings</div></div>{state.gameMode !== "free" && state.challengesCompleted < maxBuilds(state.gameMode) && <button className="challenge-btn" onClick={onChallenge}>VIEW CITY CHALLENGE <ArrowRight /></button>}</div>
        ) : (
          <div className="building-list">{BUILDINGS.map(b => (
            <div key={b.id} className={`building-card ${state.futurePoints < b.cost ? "disabled" : ""}`}>
              <div className="info"><div className="icon">{b.icon}</div><div><b>{b.name}</b><small>{b.area}</small></div></div>
              <div className="meta"><div className="cost">{b.cost} ⚡</div><button className="primary" disabled={state.futurePoints < b.cost} onClick={() => onBuild(b.id, selectedPlot)}>BUILD</button></div>
            </div>
          ))}</div>
        )}
      </aside>
    </main>
  );
}
