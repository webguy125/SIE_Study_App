import type {
  DailyPlanItem,
  Question,
  ReadinessReport,
  SectionId,
  UserProgress,
} from '../types';
import { SECTION_NAMES, SECTION_WEIGHTS } from '../types';
import { calculateExamReadiness } from './scoring';

const WEAK_SECTION_THRESHOLD = 70;
const WEAK_TOPIC_THRESHOLD = 75;
const TAG_PRIORITY_THRESHOLD = 2;

export function updateMastery(
  progress: UserProgress,
  question: Question,
  correct: boolean,
  selectedAnswer?: Question['correct_answer']
): UserProgress {
  const updated = { ...progress };
  const delta = correct ? 8 : -12;
  const current = updated.questionMastery[question.id] ?? 50;
  updated.questionMastery[question.id] = Math.max(0, Math.min(100, current + delta));

  const topicKey = question.topic;
  const topicCurrent = updated.topicMastery[topicKey] ?? 50;
  updated.topicMastery[topicKey] = Math.max(0, Math.min(100, topicCurrent + delta));

  for (const tag of question.keyword_tags) {
    const tagCurrent = updated.tagMastery[tag] ?? 50;
    updated.tagMastery[tag] = Math.max(0, Math.min(100, tagCurrent + delta));
    if (!correct) {
      updated.tagMissCounts[tag] = (updated.tagMissCounts[tag] ?? 0) + 1;
    }
  }

  const sectionKey = String(question.section_id);
  const sectionCurrent = updated.sectionMastery[sectionKey] ?? 50;
  updated.sectionMastery[sectionKey] = Math.max(0, Math.min(100, sectionCurrent + delta));

  if (!correct && !updated.missedQuestionIds.includes(question.id)) {
    updated.missedQuestionIds = [...updated.missedQuestionIds, question.id];
  }

  updated.totalAnswered += 1;
  updated.attempts = [
    ...updated.attempts,
    {
      questionId: question.id,
      correct,
      timestamp: Date.now(),
      selectedAnswer: selectedAnswer ?? question.correct_answer,
    },
  ];

  updated.leitnerBoxes = updateLeitnerBox(updated, question.id, correct);
  updated.streak = updateStreak(updated);
  updated.lastStudyDate = new Date().toISOString().split('T')[0];

  return updated;
}

function updateLeitnerBox(
  progress: UserProgress,
  questionId: string,
  correct: boolean
): UserProgress['leitnerBoxes'] {
  const boxes = { ...progress.leitnerBoxes };
  const existing = boxes[questionId];
  const now = Date.now();
  const intervals = [1, 2, 4, 7, 14];

  if (!existing) {
    boxes[questionId] = {
      questionId,
      box: correct ? 2 : 1,
      nextReview: now + (correct ? intervals[1] : intervals[0]) * 86400000,
      lastReviewed: now,
    };
    return boxes;
  }

  let newBox = existing.box;
  if (correct) {
    newBox = Math.min(5, existing.box + 1) as 1 | 2 | 3 | 4 | 5;
  } else {
    newBox = 1;
  }

  boxes[questionId] = {
    questionId,
    box: newBox,
    nextReview: now + intervals[newBox - 1] * 86400000,
    lastReviewed: now,
  };
  return boxes;
}

function updateStreak(progress: UserProgress): number {
  const today = new Date().toISOString().split('T')[0];
  const last = progress.lastStudyDate;
  if (!last) return 1;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  if (last === today) return progress.streak;
  if (last === yesterdayStr) return progress.streak + 1;
  return 1;
}

export function getDueReviewQuestionIds(progress: UserProgress): string[] {
  const now = Date.now();
  return Object.values(progress.leitnerBoxes)
    .filter((box) => box.nextReview <= now)
    .sort((a, b) => a.nextReview - b.nextReview)
    .map((box) => box.questionId);
}

export function getWeakSections(progress: UserProgress): SectionId[] {
  const weak: SectionId[] = [];
  const sections: SectionId[] = [1, 2, 3, 4];
  for (const id of sections) {
    const mastery = progress.sectionMastery[String(id)] ?? 0;
    if (mastery > 0 && mastery < WEAK_SECTION_THRESHOLD) weak.push(id);
  }
  if (weak.length === 0) {
    let lowest = 1 as SectionId;
    let lowestScore = 100;
    for (const id of sections) {
      const score = progress.sectionMastery[String(id)] ?? 0;
      if (score < lowestScore) {
        lowestScore = score;
        lowest = id;
      }
    }
    if (lowestScore < 100) weak.push(lowest);
  }
  return weak;
}

export function getWeakTopics(progress: UserProgress): string[] {
  return Object.entries(progress.topicMastery)
    .filter(([, score]) => score < WEAK_TOPIC_THRESHOLD)
    .sort((a, b) => a[1] - b[1])
    .map(([topic]) => topic);
}

export function getPriorityTags(progress: UserProgress): string[] {
  return Object.entries(progress.tagMissCounts)
    .filter(([, count]) => count >= TAG_PRIORITY_THRESHOLD)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
}

export function getReadinessReport(
  progress: UserProgress,
  questions: Question[]
): ReadinessReport {
  const sectionScores = { 1: 0, 2: 0, 3: 0, 4: 0 } as Record<SectionId, number>;
  const sections: SectionId[] = [1, 2, 3, 4];

  for (const id of sections) {
    sectionScores[id] = progress.sectionMastery[String(id)] ?? 0;
    if (sectionScores[id] === 0) {
      const sectionQs = questions.filter((q) => q.section_id === id);
      if (sectionQs.length > 0) {
        const unseen = sectionQs.every((q) => progress.questionMastery[q.id] === undefined);
        if (unseen) sectionScores[id] = 50;
      }
    }
  }

  const weakSections = getWeakSections(progress);
  const weakTopics = getWeakTopics(progress);
  const priorityTags = getPriorityTags(progress);

  let recommendedMode = 'Custom Quiz';
  if (progress.missedQuestionIds.length >= 5) {
    recommendedMode = 'Weak Areas Review';
  } else if (getDueReviewQuestionIds(progress).length >= 10) {
    recommendedMode = 'Adaptive Quiz';
  } else if (progress.totalAnswered >= 200) {
    recommendedMode = 'Full Exam Simulator';
  } else if (progress.totalAnswered < 50) {
    recommendedMode = 'Flashcards';
  }

  return {
    overallReadiness: calculateExamReadiness(progress),
    sectionScores,
    weakSections,
    weakTopics,
    priorityTags,
    recommendedMode,
    streak: progress.streak,
    totalAnswered: progress.totalAnswered,
  };
}

export function generateDailyPlan(
  progress: UserProgress,
  questions: Question[]
): DailyPlanItem[] {
  const today = new Date().toISOString().split('T')[0];
  if (progress.dailyPlanDate === today && progress.dailyPlan.length > 0) {
    return progress.dailyPlan;
  }

  const report = getReadinessReport(progress, questions);
  const plan: DailyPlanItem[] = [];

  if (report.weakSections.length > 0) {
    const section = report.weakSections[0];
    plan.push({
      mode: 'quiz',
      label: `Section ${section} Focus Quiz`,
      reason: `${SECTION_NAMES[section]} is below 70% mastery.`,
    });
  }

  if (report.priorityTags.length > 0) {
    plan.push({
      mode: 'flashcards',
      label: `Review: ${report.priorityTags[0]}`,
      reason: 'This keyword was missed multiple times recently.',
    });
  }

  if (progress.missedQuestionIds.length > 0) {
    plan.push({
      mode: 'notebook',
      label: 'Wrong Answer Notebook',
      reason: `Retest ${Math.min(10, progress.missedQuestionIds.length)} missed questions.`,
    });
  }

  plan.push({
    mode: 'exam',
    label: 'Full Practice Exam',
    reason: progress.totalAnswered >= 100
      ? 'You are ready for a timed 75-question simulation.'
      : 'Build foundational knowledge first, then attempt a full exam.',
  });

  if (plan.length < 3) {
    plan.push({
      mode: 'games',
      label: 'Learning Games',
      reason: 'Reinforce terms and concepts through interactive practice.',
    });
  }

  return plan.slice(0, 4);
}

export function getSectionTracker(progress: UserProgress): {
  sectionId: SectionId;
  name: string;
  mastery: number;
  weight: number;
  status: 'strong' | 'developing' | 'weak' | 'unstarted';
}[] {
  const sections: SectionId[] = [1, 2, 3, 4];
  return sections.map((id) => {
    const mastery = progress.sectionMastery[String(id)] ?? 0;
    let status: 'strong' | 'developing' | 'weak' | 'unstarted' = 'unstarted';
    if (mastery >= 80) status = 'strong';
    else if (mastery >= 70) status = 'developing';
    else if (mastery > 0) status = 'weak';

    return {
      sectionId: id,
      name: SECTION_NAMES[id],
      mastery,
      weight: SECTION_WEIGHTS[id] * 100,
      status,
    };
  });
}