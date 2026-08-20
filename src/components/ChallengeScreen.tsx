import React from "react";

import { CHALLENGES } from "../config";

export default function ChallengeScreen({ id, onAnswer }: any) {
  const challenge = CHALLENGES.find((c:any) => c.id === id) ?? CHALLENGES[0];
  return (
    <main className="page centered challenge-page">
      <div className="challenge-card">
        <div className="eyebrow">CITY CHALLENGE</div>
        <h2>{challenge.icon} {challenge.title}</h2>
        <p>{challenge.description}</p>
        <div className="options">{challenge.options.map((o:any, i:number) => (
          <button key={o.id} onClick={() => onAnswer(o.id)}><span className="letter">{String.fromCharCode(65 + i)}</span><div><b>{o.text}</b></div></button>
        ))}</div>
      </div>
    </main>
  );
}
