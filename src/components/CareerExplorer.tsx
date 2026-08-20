import React from "react";

export default function CareerExplorer({ career, rankings, onBack, onRestart }: any) {
  return (
    <main className="page careers-page">
      <div className="careers-sidebar"><button className="back" onClick={onBack}>← Back</button><h2>Careers to explore</h2><div className="career-list">{rankings.slice(0, 10).map((x:any) => <button key={x.career.id} onClick={() => {}} className="career-item"><b>{x.career.name}</b><small>{x.career.archetype}</small></button>)}</div><button className="secondary" onClick={onRestart}>START NEW GAME</button></div>
      <section className="career-detail"><div className="career-hero"><h1>{career.name}</h1><p>{career.description}</p></div><div className="career-info"><h3>Skills used</h3><div className="pill-list">{career.skills.map((s:any)=> <span key={s}>{s}</span>)}</div><h3>Subjects</h3><div className="pill-list">{career.subjects.map((s:any)=> <span key={s}>{s}</span>)}</div></div></section>
    </main>
  );
}
