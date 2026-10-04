import type { Question, QuizConfig, SectionId, UserProgress } from '../types';
import { EXAM_SECTION_COUNTS } from '../types';
import {
  getDueReviewQuestionIds,
  getPriorityTags,
  getWeakSections,
  getWeakTopics,
} from './adaptiveEngine';

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandom<T>(items: T[], count: number): T[] {
  return shuffle(items).slice(0, Math.min(count, items.length));
}

export function selectExamQuestions(allQuestions: Question[]): Question[] {
  const sections: SectionId[] = [1, 2, 3, 4];
  const selected: Question[] = [];

  for (const sectionId of sections) {
    const pool = allQuestions.filter((q) => q.section_id === sectionId);
    const needed = EXAM_SECTION_COUNTS[sectionId];
    selected.push(...pickRandom(pool, needed));
  }

  return shuffle(selected);
}

export function selectAdaptiveQuiz(
  allQuestions: Question[],
  progress: UserProgress,
  count: number
): Question[] {
  const weakCount = Math.round(count * 0.6);
  const reviewCount = Math.round(count * 0.25);
  const freshCount = count - weakCount - reviewCount;

  const weakSections = getWeakSections(progress);
  const weakTopics = getWeakTopics(progress);
  const priorityTags = getPriorityTags(progress);
  const dueIds = new Set(getDueReviewQuestionIds(progress));
  const answeredIds = new Set(Object.keys(progress.questionMastery));

  const weakPool = allQuestions.filter((q) => {
    if (weakSections.includes(q.section_id)) return true;
    if (weakTopics.includes(q.topic)) return true;
    if (q.keyword_tags.some((t) => priorityTags.includes(t))) return true;
    if (progress.missedQuestionIds.includes(q.id)) return true;
    return false;
  });

  const reviewPool = allQuestions.filter((q) => dueIds.has(q.id));
  const freshPool = allQuestions.filter((q) => !answeredIds.has(q.id));

  const selected: Question[] = [];
  const usedIds = new Set<string>();

  const addFrom = (pool: Question[], n: number) => {
    for (const q of pickRandom(pool, n)) {
      if (!usedIds.has(q.id)) {
        selected.push(q);
        usedIds.add(q.id);
      }
    }
  };

  addFrom(weakPool, weakCount);
  addFrom(reviewPool, reviewCount);
  addFrom(freshPool, freshCount);

  if (selected.length < count) {
    const remaining = allQuestions.filter((q) => !usedIds.has(q.id));
    addFrom(remaining, count - selected.length);
  }

  return shuffle(selected);
}

export function selectCustomQuiz(
  allQuestions: Question[],
  progress: UserProgress,
  config: QuizConfig
): Question[] {
  let pool = [...allQuestions];

  if (config.sectionId) {
    pool = pool.filter((q) => q.section_id === config.sectionId);
  }
  if (config.topic) {
    pool = pool.filter((q) => q.topic === config.topic);
  }
  if (config.difficulty) {
    pool = pool.filter((q) => q.difficulty === config.difficulty);
  }
  if (config.missedOnly) {
    pool = pool.filter((q) => progress.missedQuestionIds.includes(q.id));
  }
  if (config.weakSectionOnly) {
    const weak = getWeakSections(progress);
    pool = pool.filter((q) => weak.includes(q.section_id));
  }
  if (config.keyword) {
    const kw = config.keyword.toLowerCase();
    pool = pool.filter(
      (q) =>
        q.keyword_tags.some((t) => t.toLowerCase().includes(kw)) ||
        q.topic.toLowerCase().includes(kw) ||
        q.prompt.toLowerCase().includes(kw)
    );
  }

  if (config.adaptive) {
    return selectAdaptiveQuiz(pool.length > 0 ? pool : allQuestions, progress, config.count);
  }

  return pickRandom(pool, config.count);
}

export function getUniqueTopics(questions: Question[]): string[] {
  return [...new Set(questions.map((q) => q.topic))].sort();
}

export function getUniqueKeywords(questions: Question[]): string[] {
  const tags = new Set<string>();
  for (const q of questions) {
    for (const t of q.keyword_tags) tags.add(t);
  }
  return [...tags].sort();
}