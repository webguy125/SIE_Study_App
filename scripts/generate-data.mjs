import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { questions as s1 } from './banks/section1.mjs';
import { questions as s2 } from './banks/section2.mjs';
import { questions as s3 } from './banks/section3.mjs';
import { questions as s4 } from './banks/section4.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');

const SECTION_NAMES = {
  1: 'Knowledge of Capital Markets',
  2: 'Understanding Products and Their Risks',
  3: 'Understanding Trading, Customer Accounts and Prohibited Activities',
  4: 'Overview of Regulatory Framework',
};

const FILLER_PATTERNS = [
  /\(Question \d+\)/i,
  /\(Set \d+\)/i,
  /which statement is MOST accurate for SIE candidates/i,
  /which statement is most accurate about/i,
  /is a core SIE topic requiring understanding of definitions/i,
];

function assignIds(bank, sectionId) {
  return bank.map((q, i) => ({
    ...q,
    id: `S${sectionId}-${String(i + 1).padStart(3, '0')}`,
    section_id: sectionId,
    section_name: SECTION_NAMES[sectionId],
  }));
}

const questions = [
  ...assignIds(s1, 1),
  ...assignIds(s2, 2),
  ...assignIds(s3, 3),
  ...assignIds(s4, 4),
];

mkdirSync(DATA_DIR, { recursive: true });

// Validate
const expected = { 1: 68, 2: 187, 3: 132, 4: 38 };
const secCount = { 1: 0, 2: 0, 3: 0, 4: 0 };
const diffCount = { easy: 0, medium: 0, hard: 0 };

for (const q of questions) {
  secCount[q.section_id]++;
  diffCount[q.difficulty]++;
  const choiceKeys = Object.keys(q.choices);
  if (choiceKeys.length !== 4) {
    console.error(`ERROR: ${q.id} does not have 4 choices`);
    process.exit(1);
  }
  if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
    console.error(`ERROR: ${q.id} invalid correct_answer`);
    process.exit(1);
  }
  for (const pat of FILLER_PATTERNS) {
    if (pat.test(q.prompt)) {
      console.error(`ERROR: Filler pattern in ${q.id}: ${q.prompt.slice(0, 80)}`);
      process.exit(1);
    }
  }
}

if (questions.length !== 425) {
  console.error(`ERROR: Expected 425 questions, got ${questions.length}`);
  process.exit(1);
}

for (const [sid, count] of Object.entries(expected)) {
  if (secCount[sid] !== count) {
    console.error(`ERROR: Section ${sid} has ${secCount[sid]}, expected ${count}`);
    process.exit(1);
  }
}


function protectAbbreviations(text) {
  const abbrevs = [
    'U.S.', 'e.g.', 'i.e.', 'Inc.', 'Ltd.', 'Act.', 'vs.', 'etc.',
    'Dr.', 'Mr.', 'Mrs.', 'Ms.', 'St.', 'Corp.', 'Co.', 'No.', 'approx.',
    'a.m.', 'p.m.', 'Jr.', 'Sr.', 'Ph.D.', 'B.A.', 'M.B.A.',
  ];
  const tokens = [];
  let result = text;
  for (const abbr of abbrevs) {
    const escaped = abbr.replace(/\./g, '\\.');
    const regex = new RegExp(escaped, 'gi');
    result = result.replace(regex, (match) => {
      const token = `__ABBR${tokens.length}__`;
      tokens.push(match);
      return token;
    });
  }
  return { result, tokens };
}

function restoreAbbreviations(text, tokens) {
  let restored = text;
  tokens.forEach((abbr, idx) => {
    restored = restored.replace(`__ABBR${idx}__`, abbr);
  });
  return restored;
}

function firstSentence(text) {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;

  const { result, tokens } = protectAbbreviations(trimmed);

  for (let i = 0; i < result.length; i++) {
    if (result[i] !== '.') continue;

    const prev = result[i - 1];
    const next = result[i + 1];

    if (/\d/.test(prev) && /\d/.test(next)) continue;

    if (next === undefined) {
      return restoreAbbreviations(result.slice(0, i + 1), tokens);
    }

    if (next === ' ' || next === '\n' || next === '\r') {
      const after = result.slice(i + 1).trimStart();
      if (!after) {
        return restoreAbbreviations(result.slice(0, i + 1), tokens);
      }
      if (/^[A-Z"'(\[]/.test(after)) {
        return restoreAbbreviations(result.slice(0, i + 1), tokens);
      }
    }
  }

  return restoreAbbreviations(result, tokens);
}

const TRUNCATION_PATTERNS = [
  /\$0\.$/,
  /trade in U\.$/,
  /≈ \d\.$/,
  /\/ 0\.$/,
  /explicit U\.$/,
  /\(e\.$/,
];

function validateFlashcardBack(back, id) {
  if (!back || back.length < 10) {
    console.error(`ERROR: ${id} back too short: ${back}`);
    process.exit(1);
  }
  for (const pat of TRUNCATION_PATTERNS) {
    if (pat.test(back)) {
      console.error(`ERROR: ${id} truncated back: ${back}`);
      process.exit(1);
    }
  }
}

// Flashcards from unique concepts
const flashcards = [];
const seenTags = new Set();
for (const q of questions) {
  if (flashcards.length >= 120) break;
  for (const tag of q.keyword_tags) {
    if (seenTags.has(tag)) continue;
    seenTags.add(tag);
    flashcards.push({
      id: `FC-${String(flashcards.length + 1).padStart(3, '0')}`,
      front: `SIE Exam: ${tag.replace(/-/g, ' ')}`,
      back: firstSentence(q.explanation),
      section_id: q.section_id,
      topic: q.topic,
      keyword_tags: q.keyword_tags.slice(0, 3),
    });
    break;
  }
}

for (const q of questions) {
  if (flashcards.length >= 120) break;
  const key = `obj-${q.id}`;
  if (seenTags.has(key)) continue;
  seenTags.add(key);
  flashcards.push({
    id: `FC-${String(flashcards.length + 1).padStart(3, '0')}`,
    front: q.learning_objective,
    back: q.remediation_tip,
    section_id: q.section_id,
    topic: q.topic,
    keyword_tags: q.keyword_tags.slice(0, 2),
  });
}


// Validate flashcard backs
for (const fc of flashcards) {
  validateFlashcardBack(fc.back, fc.id);
  if (!fc.front || !fc.back) {
    console.error(`ERROR: ${fc.id} missing front or back`);
    process.exit(1);
  }
}

// Sentence completions from exam-critical facts
const sentenceTemplates = [
  { sentence: 'The ___ is calculated at the end of each business day by dividing total fund assets minus liabilities by shares outstanding.', answer: 'NAV', hint: 'Net Asset Value — mutual fund pricing', match: /mutual fund|NAV/i },
  { sentence: '___ bonds are backed by the full faith and credit and taxing power of the issuing municipality.', answer: 'General obligation', hint: 'GO bonds vs revenue bonds', match: /GO|general obligation/i },
  { sentence: 'A ___ order specifies the maximum price a buyer will pay or minimum price a seller will accept.', answer: 'limit', hint: 'Price control, not guaranteed execution', match: /limit order/i },
  { sentence: 'Regulation T requires a minimum of ___ percent initial margin when purchasing securities on margin.', answer: '50', hint: 'Half the purchase price', match: /Regulation T|initial margin/i },
  { sentence: '___ is the self-regulatory organization responsible for regulating broker-dealers and registered representatives.', answer: 'FINRA', hint: 'Largest securities SRO', match: /FINRA/i },
  { sentence: 'The ___ was created to protect investors and maintain fair, orderly, and efficient markets.', answer: 'SEC', hint: 'Federal securities regulator', match: /SEC/i },
  { sentence: 'A ___ must be filed when a firm knows or suspects a transaction involves funds from illegal activity.', answer: 'SAR', hint: 'Suspicious Activity Report', match: /SAR|suspicious/i },
  { sentence: '___ trading is the illegal practice of buying or selling securities based on material nonpublic information.', answer: 'Insider', hint: 'MNPI violation', match: /insider trading/i },
  { sentence: 'The ___ market is where newly issued securities are sold by issuers to investors for the first time.', answer: 'primary', hint: 'Opposite of secondary market', match: /primary market/i },
  { sentence: 'A pattern day trader must maintain minimum equity of $___ in a margin account.', answer: '25000', hint: 'PDT rule threshold', match: /pattern day trader|25000|25,000/i },
  { sentence: '___ bills are U.S. government securities sold at a discount with maturities of one year or less.', answer: 'Treasury', hint: 'Short-term government paper', match: /T-bill|Treasury bill/i },
  { sentence: 'When market interest rates rise, existing bond prices generally ___.', answer: 'fall', hint: 'Inverse price-yield relationship', match: /interest rate|bond price/i },
  { sentence: 'Form ___ is the uniform application used to register securities industry professionals with FINRA.', answer: 'U4', hint: 'Registration and disclosure form', match: /Form U4/i },
  { sentence: 'The ___ sets rules for the municipal securities market but does not directly enforce them.', answer: 'MSRB', hint: 'Municipal Securities Rulemaking Board', match: /MSRB/i },
  { sentence: 'A Currency Transaction Report (CTR) is required for cash transactions exceeding $___ in one business day.', answer: '10000', hint: 'BSA reporting threshold', match: /CTR|10000|10,000/i },
];

const sentenceCompletions = [];
const usedTemplates = new Set();

for (const q of questions) {
  if (sentenceCompletions.length >= 60) break;
  for (let i = 0; i < sentenceTemplates.length; i++) {
    if (usedTemplates.has(i)) continue;
    const tmpl = sentenceTemplates[i];
    const text = `${q.prompt} ${q.explanation} ${q.keyword_tags.join(' ')}`;
    if (tmpl.match.test(text)) {
      usedTemplates.add(i);
      sentenceCompletions.push({
        id: `SC-${String(sentenceCompletions.length + 1).padStart(3, '0')}`,
        sentence: tmpl.sentence,
        answer: tmpl.answer,
        hint: tmpl.hint,
        section_id: q.section_id,
        topic: q.topic,
        keyword_tags: q.keyword_tags.slice(0, 2),
      });
      break;
    }
  }
}

// Fill remaining sentence completions from top questions
for (const q of questions) {
  if (sentenceCompletions.length >= 60) break;
  if (sentenceCompletions.some((s) => s.topic === q.topic && s.answer === q.correct_answer)) continue;
  const answer = q.choices[q.correct_answer];
  if (answer.length > 40) continue;
  sentenceCompletions.push({
    id: `SC-${String(sentenceCompletions.length + 1).padStart(3, '0')}`,
    sentence: `${q.prompt.split('?')[0]} is: ___.`,
    answer: answer.length < 30 ? answer : q.correct_answer,
    hint: q.remediation_tip.slice(0, 80),
    section_id: q.section_id,
    topic: q.topic,
    keyword_tags: q.keyword_tags.slice(0, 2),
  });
}

writeFileSync(join(DATA_DIR, 'questions.json'), JSON.stringify(questions, null, 2));
writeFileSync(join(DATA_DIR, 'flashcards.json'), JSON.stringify(flashcards, null, 2));
writeFileSync(join(DATA_DIR, 'sentenceCompletions.json'), JSON.stringify(sentenceCompletions, null, 2));

console.log('Generated questions:', questions.length);
console.log('Section counts:', secCount);
console.log('Difficulty counts:', diffCount);
console.log('Flashcards:', flashcards.length);
console.log('Sentence completions:', sentenceCompletions.length);
console.log('All questions are exam-focused SIE prep content. Validation passed!');