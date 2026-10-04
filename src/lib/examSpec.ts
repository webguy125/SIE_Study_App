/**
 * 2026-aligned FINRA SIE exam specifications.
 * Content basis: FINRA SIE Content Outline (October 2025) — the current published outline as of 2026.
 * Structural update: 5 unscored pretest items (effective October 27, 2025).
 * @see https://www.finra.org/sites/default/files/2025-10/SIE_Content_Outline.pdf
 */

export const EXAM_YEAR = 2026;

export const CONTENT_OUTLINE_LABEL = 'FINRA SIE Content Outline (October 2025)';
export const CONTENT_OUTLINE_URL =
  'https://www.finra.org/sites/default/files/2025-10/SIE_Content_Outline.pdf';

export const EXAM_SCORED_QUESTIONS = 75;
export const EXAM_PRETEST_QUESTIONS = 5;
export const EXAM_TOTAL_SCREEN_ITEMS = 80;
export const EXAM_TIME_MINUTES = 105;
export const PASSING_SCORE = 70;

/** Industry standard equity/ETF settlement cycle (2026). */
export const EQUITY_SETTLEMENT_CYCLE = 'T+1';

export const EXAM_SECTION_COUNTS = {
  1: 12,
  2: 33,
  3: 23,
  4: 7,
} as const;

export const SECTION_WEIGHTS_PCT = {
  1: 16,
  2: 44,
  3: 31,
  4: 9,
} as const;

export const EXAM_FORMAT_SUMMARY = [
  `${EXAM_SCORED_QUESTIONS} scored multiple-choice questions (4 choices each)`,
  `${EXAM_PRETEST_QUESTIONS} unscored pretest items on the live exam (${EXAM_TOTAL_SCREEN_ITEMS} total on screen)`,
  `${EXAM_TIME_MINUTES}-minute time limit (~${Math.floor((EXAM_TIME_MINUTES * 60) / EXAM_SCORED_QUESTIONS)} seconds per scored question)`,
  `Passing score: ${PASSING_SCORE}% (equated scale)`,
  `Section 1: ${EXAM_SECTION_COUNTS[1]} questions (${SECTION_WEIGHTS_PCT[1]}%)`,
  `Section 2: ${EXAM_SECTION_COUNTS[2]} questions (${SECTION_WEIGHTS_PCT[2]}%)`,
  `Section 3: ${EXAM_SECTION_COUNTS[3]} questions (${SECTION_WEIGHTS_PCT[3]}%)`,
  `Section 4: ${EXAM_SECTION_COUNTS[4]} questions (${SECTION_WEIGHTS_PCT[4]}%)`,
  `Equity/ETF settlement: ${EQUITY_SETTLEMENT_CYCLE}`,
] as const;