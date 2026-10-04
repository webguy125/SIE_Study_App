import type { ExamResult, Question, SectionId, UserProgress } from '../types';
import { EXAM_SECTION_COUNTS, PASSING_SCORE, SECTION_WEIGHTS } from '../types';

export function calculateSectionScore(
  questions: Question[],
  answers: Record<string, string>
): Record<SectionId, { correct: number; total: number; percent: number }> {
  const sections: SectionId[] = [1, 2, 3, 4];
  const result = {} as Record<SectionId, { correct: number; total: number; percent: number }>;

  for (const sectionId of sections) {
    const sectionQuestions = questions.filter((q) => q.section_id === sectionId);
    let correct = 0;
    for (const q of sectionQuestions) {
      if (answers[q.id] === q.correct_answer) correct++;
    }
    const total = sectionQuestions.length;
    result[sectionId] = {
      correct,
      total,
      percent: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  }
  return result;
}

export function calculateOverallScore(
  questions: Question[],
  answers: Record<string, string>
): number {
  if (questions.length === 0) return 0;
  let correct = 0;
  for (const q of questions) {
    if (answers[q.id] === q.correct_answer) correct++;
  }
  return Math.round((correct / questions.length) * 100);
}

export function didPassExam(score: number): boolean {
  return score >= PASSING_SCORE;
}

export function calculateExamReadiness(progress: UserProgress): number {
  const sections: SectionId[] = [1, 2, 3, 4];
  let weighted = 0;

  for (const sectionId of sections) {
    const mastery = progress.sectionMastery[String(sectionId)] ?? 0;
    weighted += mastery * SECTION_WEIGHTS[sectionId];
  }

  let penalty = 0;
  for (const sectionId of sections) {
    const mastery = progress.sectionMastery[String(sectionId)] ?? 0;
    if (mastery > 0 && mastery < 70) {
      penalty += (70 - mastery) * SECTION_WEIGHTS[sectionId] * 0.5;
    }
  }

  return Math.max(0, Math.min(100, Math.round(weighted - penalty)));
}

export function getSectionMasteryFromAttempts(
  questions: Question[],
  progress: UserProgress
): Record<SectionId, number> {
  const sections: SectionId[] = [1, 2, 3, 4];
  const result = {} as Record<SectionId, number>;

  for (const sectionId of sections) {
    const sectionQuestions = questions.filter((q) => q.section_id === sectionId);
    if (sectionQuestions.length === 0) {
      result[sectionId] = 0;
      continue;
    }
    const totalMastery = sectionQuestions.reduce(
      (sum, q) => sum + (progress.questionMastery[q.id] ?? 0),
      0
    );
    result[sectionId] = Math.round(totalMastery / sectionQuestions.length);
  }
  return result;
}

export function buildExamResult(
  questions: Question[],
  answers: Record<string, string>,
  timeUsedSeconds: number
): ExamResult {
  const score = calculateOverallScore(questions, answers);
  return {
    id: `exam-${Date.now()}`,
    date: new Date().toISOString(),
    score,
    passed: didPassExam(score),
    sectionScores: calculateSectionScore(questions, answers),
    timeUsedSeconds,
    questionIds: questions.map((q) => q.id),
    answers: answers as ExamResult['answers'],
  };
}

export function validateExamComposition(questions: Question[]): boolean {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0 } as Record<SectionId, number>;
  for (const q of questions) counts[q.section_id]++;
  return (
    questions.length === 75 &&
    counts[1] === EXAM_SECTION_COUNTS[1] &&
    counts[2] === EXAM_SECTION_COUNTS[2] &&
    counts[3] === EXAM_SECTION_COUNTS[3] &&
    counts[4] === EXAM_SECTION_COUNTS[4]
  );
}