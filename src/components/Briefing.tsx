import React from "react";
import { ArrowRight } from "lucide-react";

export default function Briefing({ state, onStart }: any) {
  return (
    <main className="page centered briefing">
      <div className="brief-card">
        <div className="eyebrow">CITY BRIEFING</div>
        <h2>Welcome, Mayor {state.player.nickname || "Builder"}.</h2>
        <p>You have 100 Future Points. Every decision will shape your city.</p>
        <div className="brief-stats"><div><b>{state.futurePoints}</b><span>FUTURE POINTS</span></div><div><b>{state.population}</b><span>CITY POPULATION</span></div><div><b>{state.level}</b><span>CITY LEVEL</span></div></div>
        <button className="primary huge" onClick={onStart}>START BUILDING <ArrowRight /></button>
      </div>
    </main>
  );
}
