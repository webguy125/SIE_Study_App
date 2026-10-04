import { SIE_ACRONYMS } from '../data/sieAcronyms';
import { SIE_VOCABULARY } from '../data/sieVocabulary';
import type { CustomVocabEntry, Flashcard, Question, SectionId } from '../types';
import { SECTION_NAMES } from '../types';
import type { SieVocabTerm } from '../data/sieVocabulary';

export interface VocabPair {
  id: string;
  /** Full vocabulary phrase used internally */
  phrase: string;
  /** Single word displayed on the asteroid */
  word: string;
  /**
   * Context label shown at top — answer word replaced with ___.
   * e.g. "cumulative preferred" → "___ preferred"
   */
  termLabel: string;
  /** Exam-focused definition hint matched to this term */
  term: string;
  hint: string;
  /** When true, HUD uses the acronym round layout */
  isAcronymRound?: boolean;
}

const GENERIC_WORDS = new Set([
  'stock', 'stocks', 'bond', 'bonds', 'fund', 'funds', 'rate', 'rates', 'market', 'markets',
  'order', 'orders', 'account', 'accounts', 'rights', 'income', 'price', 'prices', 'yield',
  'yields', 'risk', 'risks', 'trading', 'security', 'securities', 'share', 'shares',
  'offering', 'offerings', 'common', 'preferred', 'corporate', 'customer', 'general',
]);

const BASE_ACRONYMS = new Set([
  ...SIE_ACRONYMS.map((e) => e.term.toUpperCase()),
  'ETF', 'ADR', 'GO', 'SEC', 'FINRA', 'MSRB', 'SAR', 'AML', 'IPO', 'NAV', 'REIT', 'UIT',
  'CTR', 'SIPC', 'FDIC', 'DTCC', 'NSCC', 'OCC', 'CBOE', 'PDT', 'REG', 'T+1', 'SIE',
  'GTC', 'TIPS', 'MBS', 'CMO', 'IRA', 'UTMA', 'UGMA', 'MNPI', 'OFAC', 'ROA', 'LOI', 'YTM',
  'YTC', 'U4', 'U5', 'EMMA', 'ODD', 'LGIP', 'DPP', 'ETN', 'ETP', 'GNMA', 'FNMA', 'FHLMC',
  'KYC', 'BCP', 'SDN', 'OTC', 'NASAA', 'STRIPS', 'CPI', 'GDP', 'CDSC', 'FINCEN',
]);

let activeAcronyms = new Set(BASE_ACRONYMS);

export interface VocabBuildOptions {
  includeBuiltIn?: boolean;
  includeCustom?: boolean;
  customSections?: SectionId[];
  customEntries?: CustomVocabEntry[];
}

export function isAcronymPair(pair: VocabPair): boolean {
  return pair.isAcronymRound === true || isAcronymTerm(pair.phrase);
}

function normalizeAcronymToken(token: string): string {
  return token.toUpperCase().replace(/[^A-Z0-9+]/g, '');
}

/** True when the vocabulary entry is a standalone acronym (answer = the acronym) */
export function isAcronymTerm(term: string): boolean {
  const parts = term.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    const upper = normalizeAcronymToken(parts[0]);
    return activeAcronyms.has(upper) || /^[A-Z0-9+]{2,8}$/.test(parts[0]);
  }
  return parts.some((p) => activeAcronyms.has(normalizeAcronymToken(p)));
}

/** Extract a single asteroid label from a vocabulary phrase */
export function extractAsteroidWord(phrase: string): string | null {
  const parts = phrase.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;

  if (parts.length === 1) {
    const upper = normalizeAcronymToken(parts[0]);
    if (activeAcronyms.has(upper)) return upper;
    const single = parts[0].replace(/[^a-zA-Z0-9+]/g, '');
    return single.length >= 2 ? single : null;
  }

  for (const part of parts) {
    const upper = part.toUpperCase().replace(/[^A-Z0-9+]/g, '');
    if (activeAcronyms.has(upper) || (upper.length >= 2 && upper.length <= 5 && part === upper)) {
      return upper;
    }
  }

  for (let i = 0; i < parts.length - 1; i++) {
    const mod = parts[i].replace(/[^a-zA-Z]/g, '');
    const next = parts[i + 1].replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (mod.length >= 2 && GENERIC_WORDS.has(next) && !GENERIC_WORDS.has(mod.toLowerCase())) {
      return mod;
    }
  }

  const distinctive = parts
    .map((p) => p.replace(/[^a-zA-Z]/g, ''))
    .filter((p) => p.length > 2 && !GENERIC_WORDS.has(p.toLowerCase()))
    .sort((a, b) => b.length - a.length);

  if (distinctive[0]) return distinctive[0];

  const fallback = parts[0].replace(/[^a-zA-Z]/g, '');
  return fallback.length >= 2 ? fallback : null;
}

function normalizeToken(token: string): string {
  return token.replace(/[^a-zA-Z0-9+]/g, '').toLowerCase();
}

function tokenMatchesAnswer(part: string, asteroidWord: string): boolean {
  const core = normalizeToken(part);
  const answer = asteroidWord.toLowerCase();
  if (!core || !answer) return false;
  return (
    core === answer
    || (core.length >= 3 && answer.startsWith(core))
    || (answer.length >= 3 && core.startsWith(answer))
  );
}

/** Build top label: keep context words, blank out only the asteroid answer */
export function buildTermLabel(phrase: string, asteroidWord: string): string {
  const parts = phrase.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return phrase;

  let replaced = false;
  const labelParts = parts.map((part) => {
    if (!replaced && tokenMatchesAnswer(part, asteroidWord)) {
      replaced = true;
      return '___';
    }
    return part;
  });

  if (!replaced) {
    const context = parts.filter((p) => !tokenMatchesAnswer(p, asteroidWord));
    if (context.length > 0) return `___ ${context.join(' ')}`;
  }

  return labelParts.join(' ');
}

function clueDedupKey(word: string, clue: string): string {
  return `${word.toLowerCase()}::${clue.toLowerCase().replace(/\s+/g, ' ').trim()}`;
}

/** Reject clues that contain the answer as a whole word (not inside longer words) */
function clueLeaksAnswer(answer: string, clue: string): boolean {
  const upper = answer.toUpperCase().replace(/[^A-Z0-9+]/g, '');
  if (!upper) return false;

  const escaped = upper.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}s?\\b`, 'i').test(clue);
}

function addVocabEntry(
  entry: SieVocabTerm,
  pool: VocabPair[],
  seenClues: Set<string>,
  asteroidWordOverride?: string,
  hintOverride?: string,
  isAcronymRound?: boolean,
) {
  const pureAcronym = !asteroidWordOverride
    && entry.term.split(/\s+/).length === 1
    && activeAcronyms.has(normalizeAcronymToken(entry.term));
  const acronymRound = isAcronymRound ?? pureAcronym;
  const asteroidWord = asteroidWordOverride
    ?? (pureAcronym ? normalizeAcronymToken(entry.term) : extractAsteroidWord(entry.term));
  if (!asteroidWord) return;

  const termLabel = pureAcronym || (acronymRound && entry.term.split(/\s+/).length === 1)
    ? (asteroidWordOverride ?? entry.term).toUpperCase()
    : buildTermLabel(entry.term, asteroidWord);

  entry.clues.forEach((term, index) => {
    if (clueLeaksAnswer(asteroidWord, term)) return;

    const key = clueDedupKey(asteroidWord, term);
    if (seenClues.has(key)) return;
    seenClues.add(key);

    pool.push({
      id: `${entry.id}-c${index}`,
      phrase: entry.term,
      word: asteroidWord,
      termLabel,
      term,
      hint: hintOverride ?? entry.category,
      isAcronymRound: acronymRound,
    });
  });
}

/**
 * Build the vocab pool: built-in SIE content plus optional user-defined terms.
 */
export function buildVocabPool(
  _flashcards?: Flashcard[],
  _questions?: Question[],
  options: VocabBuildOptions = {},
): VocabPair[] {
  activeAcronyms = new Set(BASE_ACRONYMS);
  for (const custom of options.customEntries ?? []) {
    if (custom.isAcronym) {
      activeAcronyms.add(normalizeAcronymToken(custom.answer));
    }
  }

  const seenClues = new Set<string>();
  const pool: VocabPair[] = [];
  const includeBuiltIn = options.includeBuiltIn !== false;
  const includeCustom = options.includeCustom !== false;

  if (includeBuiltIn) {
    for (const entry of SIE_ACRONYMS) addVocabEntry(entry, pool, seenClues);
    for (const entry of SIE_VOCABULARY) addVocabEntry(entry, pool, seenClues);
  }

  if (includeCustom) {
    const allowedSections = new Set(options.customSections ?? [1, 2, 3, 4]);
    for (const custom of options.customEntries ?? []) {
      if (!custom.term.trim() || !custom.answer.trim() || custom.clues.length === 0) continue;
      if (!allowedSections.has(custom.section)) continue;

      addVocabEntry(
        {
          id: custom.id,
          term: custom.term.trim(),
          section: custom.section,
          category: `Section ${custom.section}`,
          clues: custom.clues,
        },
        pool,
        seenClues,
        custom.answer.trim(),
        SECTION_NAMES[custom.section],
        custom.isAcronym,
      );
    }
  }

  return pool;
}

export function shufflePool<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function isMultiWordPhrase(pair: VocabPair): boolean {
  return pair.termLabel.includes('___') || pair.phrase.trim().split(/\s+/).length > 1;
}

/** Split a term label into renderable segments (blank vs visible context words) */
export function parseTermLabel(termLabel: string): Array<{ type: 'blank' | 'text'; value: string }> {
  if (!termLabel.includes('___')) {
    return [{ type: 'text', value: termLabel }];
  }

  return termLabel.split(/(___)/).filter(Boolean).map((segment) =>
    segment === '___' ? { type: 'blank' as const, value: segment } : { type: 'text' as const, value: segment },
  );
}