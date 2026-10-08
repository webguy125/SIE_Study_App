import raw from '../../Acronymes/Acronymes.txt?raw';

export interface AcronymCard {
  id: string;
  section: string;
  acronym: string;
  meaning: string;
}

export interface DrawnAcronym {
  card: AcronymCard;
  position: number;
  total: number;
}

const SKIP = /already listed|already covered/i;
const STORAGE_KEY = 'gorilla-summit-deck-v1';

function parseAcronymFile(text: string): AcronymCard[] {
  const cards: AcronymCard[] = [];
  let section = 'Acronyms';
  let n = 0;
  for (const line of text.replace(/^\uFEFF/, '').split(/\r?\n/)) {
    const trimmed = line.trim().replace(/^•\s*/, '');
    if (!trimmed) continue;
    const match = trimmed.match(/^(.*?)\s*[—–]\s*(.+)$/);
    if (!match) {
      section = trimmed;
      continue;
    }
    const acronym = match[1].trim();
    const meaning = match[2].trim();
    if (!acronym || !meaning || SKIP.test(meaning)) continue;
    n += 1;
    cards.push({ id: `A${n}`, section, acronym, meaning });
  }
  return cards;
}

export const ACRONYMS = parseAcronymFile(raw);
export const ACRONYM_SECTIONS = [...new Set(ACRONYMS.map((card) => card.section))];

const BY_ID = new Map(ACRONYMS.map((card) => [card.id, card]));
const usedThisRace = new Set<string>();

interface DeckState {
  order: string[];
  cursor: number;
}

type SavedDecks = Record<string, DeckState>;

const memory: SavedDecks = {};

function poolFor(section: string): AcronymCard[] {
  if (section === 'All') return ACRONYMS;
  return ACRONYMS.filter((card) => card.section === section);
}

export function sectionSize(section: string): number {
  return poolFor(section).length;
}

/** All acronyms is a 30-correct race. One group is every acronym in that group. */
export const ALL_RACE_STEPS = 30;

export function raceSteps(section: string): number {
  const size = poolFor(section).length;
  if (section === 'All') return Math.min(ALL_RACE_STEPS, size);
  return size;
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
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { ...memory };
    const parsed = JSON.parse(saved) as SavedDecks;
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
    /* The in-memory deck still advances when storage is blocked. */
  }
}

function freshDeck(section: string): DeckState {
  return { order: shuffle(poolFor(section).map((card) => card.id)), cursor: 0 };
}

function deckIsCurrent(section: string, deck: DeckState | undefined): deck is DeckState {
  if (!deck || !Array.isArray(deck.order)) return false;
  const ids = new Set(poolFor(section).map((card) => card.id));
  return deck.order.length === ids.size && deck.order.every((id) => ids.has(id));
}

export function resetRaceDeck(): void {
  usedThisRace.clear();
}

export function drawAcronym(section: string): DrawnAcronym | null {
  const pool = poolFor(section);
  if (pool.length === 0) return null;
  const decks = loadDecks();
  let deck = deckIsCurrent(section, decks[section]) ? decks[section] : freshDeck(section);
  const total = deck.order.length;

  let picked: AcronymCard | undefined;
  for (let step = 0; step < total && !picked; step++) {
    if (deck.cursor >= total) deck = { order: shuffle(deck.order), cursor: 0 };
    const id = deck.order[deck.cursor];
    deck.cursor += 1;
    if (!usedThisRace.has(id)) picked = BY_ID.get(id);
  }

  if (!picked) {
    usedThisRace.clear();
    picked = pool[Math.floor(Math.random() * pool.length)];
  }

  usedThisRace.add(picked.id);
  decks[section] = deck;
  saveDecks(decks);
  return { card: picked, position: deck.cursor, total };
}

/** Four acronym buttons. Same-group items are preferred as the wrong answers. */
export function acronymChoices(card: AcronymCard): string[] {
  const used = new Set<string>([card.acronym]);
  const sameGroup = ACRONYMS.filter((item) => item.section === card.section && !used.has(item.acronym));
  const anyone = ACRONYMS.filter((item) => !used.has(item.acronym));
  const bucket = sameGroup.length >= 3 ? sameGroup : anyone;
  const options = [card.acronym];
  for (const item of shuffle(bucket.map((entry) => entry.id)).map((id) => BY_ID.get(id))) {
    if (!item || used.has(item.acronym)) continue;
    used.add(item.acronym);
    options.push(item.acronym);
    if (options.length === 4) break;
  }
  return shuffle(options);
}
