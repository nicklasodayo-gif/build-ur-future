import React from "react";
import { ArrowRight, Share2 } from "lucide-react";

export default function Results({ state, profile, rankings, onExploreCareer, onSave, onContinue }: any) {
  return (
    <main className="page results">
      <div className="results-head"><div className="eyebrow">🎉 YOUR FUTURE PROFILE</div><h1>YOU'RE A <em>{profile.archetype.replace("THE ", "")}</em></h1><p>{profile.description}</p></div>
      <section className="result-grid">
        <div className="score-card"><h3>Your strongest signals</h3>{(Object.entries(state.careerScores) as [string, number][]).sort(([,a],[,b])=>b-a).slice(0,4).map(([k,v]) => (<div key={k} className="score-row"><span>{k}</span><div className="bar"><i style={{ width: `${Math.min(99, 40 + (v as number) * 2)}%` }} /></div><b>{Math.min(99, 40 + (v as number) * 2)}%</b></div>))}</div>
        <div className="career-card"><h3>Careers to explore</h3>{rankings.slice(0,3).map((x:any,i:number) => (<button key={x.career.id} onClick={() => onExploreCareer(x.career.id)} className="career-row"><span className="rank">{["🥇","🥈","🥉"][i]}</span><div><b>{x.career.name}</b><small>{x.career.archetype}</small></div><strong>{x.score}%</strong></button>))}<button className="text-btn" onClick={onContinue}>EXPLORE ALL CAREERS →</button></div>
      </section>
      <div className="result-actions"><button className="primary" onClick={onContinue}>EXPLORE CAREERS <ArrowRight /></button><button className="secondary" onClick={onSave}><Share2 /> SAVE MY RESULTS</button></div>
    </main>
  );
}
