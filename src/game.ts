import { Achievement, Attribute, Career, GameState } from "./types";
import { ATTRIBUTES, BUILDINGS, CAREERS, CHALLENGES, CITY_MULTIPLIERS } from "./config";

export const emptyScores = (): Record<string,number> =>
  Object.fromEntries(ATTRIBUTES.map(a => [a, 0]));

export const addScores = (scores:Record<string,number>, delta:Partial<Record<Attribute,number>>) => {
  const next = {...scores};
  Object.entries(delta).forEach(([k,v]) => next[k] = (next[k] ?? 0) + (v ?? 0));
  return next;
};

export function initialAchievements(): Achievement[] {
  return [
    ["builder","🏗️","MASTER BUILDER","Build 5 structures."],
    ["green","🌱","GREEN THINKER","Build 3 environmental structures."],
    ["innovator","💡","INNOVATOR","Choose 5 technology/science options."],
    ["business","💼","BUSINESS MIND","Make 5 business-related decisions."],
    ["community","❤️","COMMUNITY BUILDER","Prioritize community-focused solutions."],
    ["visionary","🏆","CITY VISIONARY","Complete the game."]
  ].map(([id,icon,name,description]) => ({id,icon,name,description,unlocked:false}));
}

export function createInitialState(): GameState {
  return {
    player:{nickname:""},
    cityStyle:null,
    futurePoints:100,
    population:0,
    level:1,
    progress:0,
    buildings:[],
    challengesCompleted:0,
    challengesSeen:[],
    careerScores:emptyScores(),
    achievements:initialAchievements(),
    gameMode:"career",
    screen:"landing",
    selectedCareerId:null,
    resultReadyId:null
  };
}

export function scoreBuilding(state:GameState, buildingId:string) {
  const building = BUILDINGS.find(b => b.id === buildingId)!;
  let scores = addScores(state.careerScores, building.scores);
  const mult = state.cityStyle ? CITY_MULTIPLIERS[state.cityStyle] : {};
  Object.entries(mult).forEach(([k,m]) => { scores[k] = Math.round((scores[k] ?? 0) * (m ?? 1)); });
  return scores;
}

export function calculateCareerProfile(scores:Record<string,number>): Career {
  return CAREERS.map(c => ({career:c,score:careerMatch(c,scores)}))
    .sort((a,b)=>b.score-a.score)[0].career;
}

export function careerMatch(career:Career,scores:Record<string,number>) {
  const weighted = Object.entries(career.weights);
  const max = weighted.reduce((sum,[,w]) => sum + (w ?? 0) * 10,0) || 1;
  const raw = weighted.reduce((sum,[a,w]) => sum + (scores[a] ?? 0) * (w ?? 0),0);
  return Math.min(99, Math.max(45, Math.round(45 + (raw/max)*55)));
}

export function careerRankings(scores:Record<string,number>) {
  return CAREERS.map(c => ({career:c,score:careerMatch(c,scores)})).sort((a,b)=>b.score-a.score);
}

export function achievementsFor(state:GameState): Achievement[] {
  const tech = state.careerScores.Technology + state.careerScores.Science;
  const business = state.careerScores.Business + state.careerScores.Entrepreneurship;
  const community = state.careerScores.Collaboration + state.careerScores.Communication;
  const counts = {
    builder: state.buildings.length >= 5,
    green: state.buildings.filter(b => ["green","residential"].includes(b.id)).length >= 3,
    innovator: tech >= 15,
    business: business >= 12,
    community: community >= 14,
    visionary: state.screen === "results" || state.screen === "careers"
  };
  return state.achievements.map(a => ({...a, unlocked: a.unlocked || !!counts[a.id as keyof typeof counts]}));
}

export function maxBuilds(mode:GameState["gameMode"]) {
  return mode === "quick" ? 5 : mode === "career" ? 10 : 99;
}

export function maxChallenges(mode:GameState["gameMode"]) {
  return mode === "quick" ? 3 : mode === "career" ? 6 : 0;
}

export function nextChallenge(state:GameState) {
  const available = CHALLENGES.filter(c => !state.challengesSeen.includes(c.id));
  return available[Math.floor(Math.random()*available.length)] ?? CHALLENGES[0];
}
