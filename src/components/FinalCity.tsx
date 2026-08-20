import React from "react";
import { ArrowRight } from "lucide-react";

export default function FinalCity({ state, onContinue }: any) {
  return (
    <main className="final-city">
      <div className="final-content">
        <div className="eyebrow">CITY COMPLETE</div>
        <h1>WELCOME TO<br /><em>YOUR FUTURE CITY</em></h1>
        <div className="final-stats"><div><b>{state.population.toLocaleString()}</b><span>POPULATION</span></div><div><b>{state.buildings.length}</b><span>BUILDINGS</span></div><div><b>{state.futurePoints}</b><span>FUTURE LEFT</span></div></div>
        <button className="primary huge" onClick={onContinue}>CONTINUE TO MY FUTURE <ArrowRight /></button>
      </div>
    </main>
  );
}
