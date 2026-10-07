export type Difficulty = 'easy' | 'medium' | 'hard';
export type SectionId = 1 | 2 | 3 | 4;
export type ChoiceKey = 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: string;
  section_id: SectionId;
  section_name: string;
  topic: string;
  difficulty: Difficulty;
  prompt: string;
  choices: Record<ChoiceKey, string>;
  correct_answer: ChoiceKey;
  explanation: string;
  keyword_tags: string[];
  learning_objective: string;
  remediation_tip: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  section_id: SectionId;
  topic: string;
  keyword_tags: string[];
}

export interface SentenceCompletion {
  id: string;
  sentence: string;
  answer: string;
  hint: string;
  section_id: SectionId;
  topic: string;
  keyword_tags: string[];
}

export interface QuestionAttempt {
  questionId: string;
  correct: boolean;
  timestamp: number;
  selectedAnswer: ChoiceKey;
}

export interface LeitnerBox {
  questionId: string;
  box: 1 | 2 | 3 | 4 | 5;
  nextReview: number;
  lastReviewed: number;
}

export interface UserProgress {
  attempts: QuestionAttempt[];
  leitnerBoxes: Record<string, LeitnerBox>;
  questionMastery: Record<string, number>;
  topicMastery: Record<string, number>;
  tagMastery: Record<string, number>;
  sectionMastery: Record<string, number>;
  missedQuestionIds: string[];
  tagMissCounts: Record<string, number>;
  streak: number;
  lastStudyDate: string | null;
  totalAnswered: number;
  examHistory: ExamResult[];
  dailyPlanDate: string | null;
  dailyPlan: DailyPlanItem[];
}

export interface ExamResult {
  id: string;
  date: string;
  score: number;
  passed: boolean;
  sectionScores: Record<SectionId, { correct: number; total: number; percent: number }>;
  timeUsedSeconds: number;
  questionIds: string[];
  answers: Record<string, ChoiceKey>;
}

export interface DailyPlanItem {
  mode: string;
  label: string;
  reason: string;
}

export interface ReadinessReport {
  overallReadiness: number;
  sectionScores: Record<SectionId, number>;
  weakSections: SectionId[];
  weakTopics: string[];
  priorityTags: string[];
  recommendedMode: string;
  streak: number;
  totalAnswered: number;
}

export interface QuizConfig {
  count: number;
  sectionId?: SectionId;
  topic?: string;
  difficulty?: Difficulty;
  missedOnly?: boolean;
  weakSectionOnly?: boolean;
  keyword?: string;
  adaptive?: boolean;
}

export type AppView =
  | 'dashboard'
  | 'exam'
  | 'quiz'
  | 'flashcards'
  | 'games'
  | 'asteroids'
  | 'finman'
  | 'summit'
  | 'defender'
  | 'sentence'
  | 'notebook'
  | 'progress';

/** User-created vocabulary for Vocab Asteroids */
export interface CustomVocabEntry {
  id: string;
  /** FINRA SIE exam section 1–4 */
  section: SectionId;
  /** Full term or phrase, e.g. "MSRB" or "cumulative preferred" */
  term: string;
  /** Word displayed on the asteroid (the answer to shoot) */
  answer: string;
  /** Definition hints — one per game round */
  clues: string[];
  /** When true, HUD treats this as an acronym round */
  isAcronym: boolean;
  createdAt: number;
}

export interface CustomVocabSettings {
  includeBuiltIn: boolean;
  includeCustom: boolean;
  /** Which sections to include when custom cards are enabled */
  customSections: SectionId[];
  entries: CustomVocabEntry[];
}

export const SECTION_NAMES: Record<SectionId, string> = {
  1: 'Knowledge of Capital Markets',
  2: 'Understanding Products and Their Risks',
  3: 'Understanding Trading, Customer Accounts and Prohibited Activities',
  4: 'Overview of Regulatory Framework',
};

export const SECTION_WEIGHTS: Record<SectionId, number> = {
  1: 0.16,
  2: 0.44,
  3: 0.31,
  4: 0.09,
};

export const EXAM_SECTION_COUNTS: Record<SectionId, number> = {
  1: 12,
  2: 33,
  3: 23,
  4: 7,
};

export {
  PASSING_SCORE,
  EXAM_SCORED_QUESTIONS as EXAM_QUESTION_COUNT,
  EXAM_TIME_MINUTES,
  EXAM_PRETEST_QUESTIONS,
  EXAM_TOTAL_SCREEN_ITEMS,
  EQUITY_SETTLEMENT_CYCLE,
  EXAM_YEAR,
  CONTENT_OUTLINE_LABEL,
} from './lib/examSpec';