import React from "react";
import { ArrowRight } from "lucide-react";

export default function Landing({ onStart, onHelp }: any) {
  return (
    <main className="landing">
      <div className="landing-sky" />
      <div className="landing-content">
        <div className="eyebrow">✦ Your city. Your choices. Your future.</div>
        <h1>BUILD<br /><em>YOUR FUTURE</em></h1>
        <p className="muted">An interactive career discovery game — playful, fast and exploratory.</p>
        <div className="cta-row">
          <button className="primary huge" onClick={onStart}>START BUILDING <ArrowRight /></button>
          <button className="ghost" onClick={onHelp}>HOW IT WORKS</button>
        </div>
      </div>
    </main>
  );
}
