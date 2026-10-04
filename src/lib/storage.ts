import type { UserProgress } from '../types';

const STORAGE_KEY = 'sie_study_progress_v1';

export const defaultProgress = (): UserProgress => ({
  attempts: [],
  leitnerBoxes: {},
  questionMastery: {},
  topicMastery: {},
  tagMastery: {},
  sectionMastery: {},
  missedQuestionIds: [],
  tagMissCounts: {},
  streak: 0,
  lastStudyDate: null,
  totalAnswered: 0,
  examHistory: [],
  dailyPlanDate: null,
  dailyPlan: [],
});

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as UserProgress;
    return { ...defaultProgress(), ...parsed };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportProgressJson(progress: UserProgress): string {
  return JSON.stringify(progress, null, 2);
}