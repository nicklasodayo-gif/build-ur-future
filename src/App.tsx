import React, { useMemo, useState } from "react";
import { useGameState, useSound } from "./hooks";
import { createInitialState, addScores, maxBuilds, nextChallenge, calculateCareerProfile, careerRankings, achievementsFor } from "./game";
import { BUILDINGS, CHALLENGES, CAREERS } from "./config";

import TopBar from "./components/TopBar";
import Landing from "./components/Landing";
import Setup from "./components/Setup";
import Briefing from "./components/Briefing";
import BuildScreen from "./components/BuildScreen";
import ChallengeScreen from "./components/ChallengeScreen";
import FinalCity from "./components/FinalCity";
import Results from "./components/Results";
import CareerExplorer from "./components/CareerExplorer";
import Help from "./components/Help";
import { trackEvent, initAnalytics } from "./analytics";
import { exportState } from "./utils/exportState";

export default function App(): React.ReactElement {
  const [state, setState] = useGameState();
  const { on: soundOn, setOn: setSoundOn, beep } = useSound();
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const update = (fn: (s: typeof state) => typeof state) => setState(fn);
  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 1700); };

  const go = (screen: string) => { beep(600); update(s => ({ ...s, screen: screen as any })); };

  const startGame = () => { beep(720); update(s => ({ ...s, screen: "setup" })); };

  const setMode = (m: any) => update(s => ({ ...s, gameMode: m }));
  const setCity = (id: any) => update(s => ({ ...s, cityStyle: id }));

  const beginBuilding = () => { beep(700); update(s => ({ ...s, screen: "build", progress: 0 })); };

  const build = (buildingId: string, plot: number) => {
    const b = BUILDINGS.find((x:any) => x.id === buildingId)!;
    if (state.futurePoints < b.cost) { notify("Not enough Future Points"); beep(180); return; }
    if (state.buildings.some((x:any) => x.plot === plot)) return;
    const scores = addScores(state.careerScores, b.scores);
    const placed = { ...b, plot } as any;
    const nextBuildings = [...state.buildings, placed];
    const progress = Math.min(100, Math.round(nextBuildings.length / maxBuilds(state.gameMode) * 100));
    const nextLevel = Math.min(5, 1 + Math.floor(nextBuildings.length / 2));
    update(s => ({ ...s, buildings: nextBuildings, futurePoints: s.futurePoints - b.cost, population: s.population + b.population, level: nextLevel, progress, careerScores: scores, achievements: achievementsFor({ ...s, buildings: nextBuildings, careerScores: scores }) }));
    setSelectedPlot(null); beep(880); notify(`+${b.area} · City Development +10`);
    const shouldChallenge = state.gameMode !== "free" && state.challengesCompleted < (state.gameMode === "quick" ? 3 : state.gameMode === "career" ? 6 : 0) && [2, 4, 6, 8, 10].includes(nextBuildings.length);
    if (shouldChallenge) setTimeout(() => openChallenge(), 600);
    else if (nextBuildings.length >= maxBuilds(state.gameMode)) setTimeout(() => go("finalCity"), 700);
    trackEvent("build", { buildingId, plot });
  };

  const openChallenge = () => {
    const c = nextChallenge(state);
    setActiveChallenge(c.id);
    update(s => ({ ...s, screen: "challenge", challengesSeen: [...s.challengesSeen, c.id] }));
    beep(420);
  };

  const answerChallenge = (optionId: string) => {
    const c = CHALLENGES.find((x:any) => x.id === activeChallenge)!;
    const opt = c.options.find((x:any) => x.id === optionId)!;
    const scores = addScores(state.careerScores, opt.scores);
    const completed = state.challengesCompleted + 1;
    update(s => ({ ...s, careerScores: scores, challengesCompleted: completed, achievements: achievementsFor({ ...s, careerScores: scores, challengesCompleted: completed }) }));
    setActiveChallenge(null); beep(980); notify("Decision logged — your city adapts.");
    setTimeout(() => {
      if (state.gameMode !== "free" && completed >= (state.gameMode === "quick" ? 3 : state.gameMode === "career" ? 6 : 0) && state.buildings.length >= maxBuilds(state.gameMode)) go("finalCity");
      else go("build");
    }, 600);
    trackEvent("challenge_answer", { challengeId: activeChallenge, optionId });
  };

  const restart = () => {
    localStorage.removeItem("build-your-future-state-v1");
    setState(createInitialState());
    setSelectedPlot(null); setActiveChallenge(null); beep(260);
  };

  const finishCity = () => { update(s => ({ ...s, screen: "results", achievements: achievementsFor({ ...s, screen: "results" }) })); beep(1100); };

  // initialize analytics once
  initAnalytics();

  const profile = useMemo(() => calculateCareerProfile(state.careerScores), [state.careerScores]);
  const rankings = useMemo(() => careerRankings(state.careerScores), [state.careerScores]);

  return (
    <div className={`app ${state.cityStyle ? `city-${state.cityStyle}` : "city-default"}`}>
      <TopBar state={state} onHelp={() => setHelpOpen(true)} sound={setSoundOn} soundOn={soundOn} onRestart={restart} />
      {state.screen === "landing" && <Landing onStart={startGame} onHelp={() => setHelpOpen(true)} />}
      {state.screen === "setup" && <Setup state={state} setMode={setMode} setCity={setCity} setPlayer={(name:string)=>update((s:any)=>({...s,player:{nickname:name}}))} onContinue={() => go("briefing")} />}
      {state.screen === "briefing" && <Briefing state={state} onStart={beginBuilding} />}
      {state.screen === "build" && <BuildScreen state={state} selectedPlot={selectedPlot} setSelectedPlot={setSelectedPlot} onBuild={build} onChallenge={openChallenge} />}
      {state.screen === "challenge" && <ChallengeScreen id={activeChallenge} onAnswer={answerChallenge} />}
      {state.screen === "finalCity" && <FinalCity state={state} onContinue={finishCity} />}
      {state.screen === "results" && <Results state={state} profile={profile} rankings={rankings} onExploreCareer={(id: string) => update(s => ({ ...s, screen: "careers", selectedCareerId: id }))} onSave={() => notify("Results ready to save (QR placeholder).")} onContinue={() => update(s => ({ ...s, screen: "careers" }))} />}
      {state.screen === "results" && <Results state={state} profile={profile} rankings={rankings} onExploreCareer={(id: string) => update(s => ({ ...s, screen: "careers", selectedCareerId: id }))} onSave={async ()=>{ const url = await exportState(state); notify("JSON downloaded; share link copied (QR placeholder)"); trackEvent("export", { url }); }} onContinue={() => update(s => ({ ...s, screen: "careers" }))} />}
      {state.screen === "careers" && <CareerExplorer career={CAREERS.find((c:any) => c.id === state.selectedCareerId) ?? profile} rankings={rankings} onBack={() => update(s => ({ ...s, screen: "results" }))} onRestart={restart} />}
      {toast && <div className="toast">{toast}</div>}
      {helpOpen && <Help onClose={() => setHelpOpen(false)} />}
    </div>
  );
}
