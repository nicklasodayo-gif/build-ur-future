export type Screen =
  | "landing" | "setup" | "city" | "briefing" | "build"
  | "challenge" | "finalCity" | "results" | "careers";

export type GameMode = "quick" | "career" | "free";

export type Attribute =
  | "Technology" | "Engineering" | "Creativity" | "Science"
  | "Healthcare" | "Business" | "Leadership" | "Communication"
  | "Environment" | "Problem Solving" | "Collaboration" | "Entrepreneurship";

export type CityStyle = "metropolis" | "green" | "creative" | "industrial";

export interface Scores { [key: string]: number; }

export interface Building {
  id: string;
  name: string;
  icon: string;
  area: string;
  cost: number;
  population: number;
  scores: Partial<Scores>;
}

export interface PlacedBuilding extends Building {
  plot: number;
}

export interface ChallengeOption {
  id: string;
  text: string;
  scores: Partial<Scores>;
}

export interface Challenge {
  id: string;
  icon: string;
  title: string;
  description: string;
  options: ChallengeOption[];
}

export interface Career {
  id: string;
  name: string;
  archetype: string;
  description: string;
  skills: string[];
  subjects: string[];
  environments: string[];
  related: string[];
  weights: Partial<Scores>;
}

export interface Achievement {
  id: string;
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
}

export interface GameState {
  player: { nickname: string };
  cityStyle: CityStyle | null;
  futurePoints: number;
  population: number;
  level: number;
  progress: number;
  buildings: PlacedBuilding[];
  challengesCompleted: number;
  challengesSeen: string[];
  careerScores: Scores;
  achievements: Achievement[];
  gameMode: GameMode;
  screen: Screen;
  selectedCareerId: string | null;
  resultReadyId: string | null;
}