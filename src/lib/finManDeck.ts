import questionsData from '../data/questions.json';
import type { FinManQuestion, FinManSectionId } from '../data/finManData';
import type { ChoiceKey, Question, SectionId } from '../types';

const BANK = questionsData as Question[];
const LETTERS: ChoiceKey[] = ['A', 'B', 'C', 'D'];
const STORAGE_KEY = 'finman-question-deck-v1';

interface DeckState {
  order: string[];
  cursor: number;
}

type SavedDecks = Partial<Record<FinManSectionId, DeckState>>;

const memory: SavedDecks = {};
const usedThisMaze = new Set<string>();

function sectionId(section: FinManSectionId): SectionId {
  return Number(section) as SectionId;
}

function poolFor(section: FinManSectionId): Question[] {
  const id = sectionId(section);
  return BANK.filter((question) => question.section_id === id);
}

export function sectionPoolSize(section: FinManSectionId): number {
  return poolFor(section).length;
}

function shuffle(ids: string[]): string[] {
  const copy = [...ids];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = copy[i];
    copy[i] = copy[j];
    copy[j] = swap;
  }
  return copy;
}

function loadDecks(): SavedDecks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...memory };
    const parsed = JSON.parse(raw) as SavedDecks;
    return parsed && typeof parsed === 'object' ? parsed : { ...memory };
  } catch {
    return { ...memory };
  }
}

function saveDecks(decks: SavedDecks): void {
  Object.assign(memory, decks);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  } catch {
    /* Private browsing can block storage. The in-memory deck still advances. */
  }
}

function freshDeck(section: FinManSectionId): DeckState {
  return { order: shuffle(poolFor(section).map((question) => question.id)), cursor: 0 };
}

function deckIsCurrent(section: FinManSectionId, deck: DeckState | undefined): deck is DeckState {
  if (!deck || !Array.isArray(deck.order)) return false;
  const ids = new Set(poolFor(section).map((question) => question.id));
  return deck.order.length === ids.size && deck.order.every((id) => ids.has(id));
}

function toFinManQuestion(question: Question): FinManQuestion {
  return {
    id: question.id,
    topicId: '',
    topicTitle: question.topic,
    studyNote: question.learning_objective,
    text: question.prompt,
    opts: LETTERS.map((letter) => question.choices[letter]),
    correct: LETTERS.indexOf(question.correct_answer),
    rationale: [question.explanation, question.remediation_tip].filter(Boolean).join(' '),
  };
}

/** Start a maze without repeating a question that already appeared in it. */
export function resetMazeQuestions(): void {
  usedThisMaze.clear();
}

export interface DrawnQuestion {
  question: FinManQuestion;
  /** 1-based spot in the current pass through this section. */
  position: number;
  total: number;
}

/**
 * Next unseen practice question for this section.
 * The deck is remembered across games, so a section is not stuck on the same nine items.
 * A question can return only after the rest of that section has been dealt.
 */
export function drawFinManQuestion(section: FinManSectionId): DrawnQuestion {
  const pool = poolFor(section);
  const byId = new Map(pool.map((question) => [question.id, question]));
  const decks = loadDecks();
  let deck = deckIsCurrent(section, decks[section]) ? decks[section] : freshDeck(section);
  const total = deck.order.length;

  let picked: Question | undefined;
  for (let step = 0; step < total && !picked; step++) {
    if (deck.cursor >= total) {
      deck = { order: shuffle(deck.order), cursor: 0 };
    }
    const id = deck.order[deck.cursor];
    deck.cursor += 1;
    if (!usedThisMaze.has(id)) picked = byId.get(id);
  }

  if (!picked) {
    const fallback = pool[Math.floor(Math.random() * pool.length)];
    picked = fallback;
    deck.cursor = Math.min(deck.cursor, total);
  }

  usedThisMaze.add(picked.id);
  decks[section] = deck;
  saveDecks(decks);

  return {
    question: toFinManQuestion(picked),
    position: deck.cursor,
    total,
  };
}
