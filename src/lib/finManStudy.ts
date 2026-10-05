import questionsData from '../data/questions.json';
import type { FinManQuestion, FinManSectionId } from '../data/finManData';
import type { ChoiceKey, Question, SectionId } from '../types';

const BANK = questionsData as Question[];
const BY_ID = new Map(BANK.map((question) => [question.id, question]));
const LETTERS: ChoiceKey[] = ['A', 'B', 'C', 'D'];

export interface StudyLesson {
  key: string;
  heading: string;
  kicker: string;
  paragraphs: string[];
}

function asSentence(text: string): string {
  const trimmed = text.replace(/\s+/g, ' ').trim();
  if (!trimmed) return '';
  const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

function examPoint(objective: string): string {
  const trimmed = objective.replace(/\s+/g, ' ').trim().replace(/[.]+$/, '');
  if (!trimmed) return '';
  const lower = `${trimmed.charAt(0).toLowerCase()}${trimmed.slice(1)}`;
  if (/^(know|calculate|understand|distinguish|identify|explain|compare|recognize|apply|determine|describe|define|list|recall)\b/i.test(trimmed)) {
    return `On the exam, be ready to ${lower}.`;
  }
  return asSentence(trimmed);
}

function bookHeading(topic: string): string {
  const small = new Set(['a', 'an', 'and', 'of', 'the', 'to', 'for', 'in', 'on', 'or', 'vs', 'per']);
  return topic.split(/\s+/).map((word, index) => {
    const bare = word.replace(/[^a-z0-9+]/gi, '');
    if (/^(sec|finra|sipc|fdic|msrb|etf|etfs|ira|nyse|nasdaq|ipo)$/i.test(bare) || /^t\+\d/i.test(bare)) {
      return word.replace(bare, bare.toUpperCase());
    }
    const lower = word.toLowerCase();
    if (index > 0 && small.has(lower)) return lower;
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join(' ');
}

function studyHabit(tip: string): string {
  const trimmed = tip.replace(/\s+/g, ' ').trim().replace(/[.]+$/, '');
  if (!trimmed) return '';
  return asSentence(trimmed);
}

export function lessonForQuestion(
  id: string,
  correct: boolean,
  source: 'maze' | 'retention',
): StudyLesson | null {
  const question = BY_ID.get(id);
  if (!question) return null;
  const correctText = question.choices[question.correct_answer];
  const where = source === 'retention' ? 'retention check' : 'maze';
  const study = [examPoint(question.learning_objective), studyHabit(question.remediation_tip)]
    .filter(Boolean)
    .join(' ');
  const paragraphs = [
    asSentence(question.explanation),
    study,
    `The choice that matches this rule is “${correctText}.”`,
  ].filter((paragraph) => paragraph.length > 0);

  return {
    key: `${source}:${question.id}`,
    heading: bookHeading(question.topic),
    kicker: correct ? `Answered correctly on the ${where}` : `Missed on the ${where}`,
    paragraphs,
  };
}

function poolFor(section: FinManSectionId): Question[] {
  const sectionNumber = Number(section) as SectionId;
  return BANK.filter((question) => question.section_id === sectionNumber);
}

function spread<T>(items: T[], count: number): T[] {
  if (items.length <= count) return [...items];
  const picked: T[] = [];
  for (let i = 0; i < count; i++) {
    picked.push(items[Math.floor((i * items.length) / count)]);
  }
  return picked;
}

function siblingFor(source: Question, pool: Question[], blocked: Set<string>): Question | undefined {
  const fresh = pool.filter((question) => (
    !blocked.has(question.id)
    && question.prompt.trim() !== source.prompt.trim()
  ));
  const sameTopic = fresh.filter((question) => question.topic === source.topic);
  const sharedTag = fresh.filter((question) => (
    question.keyword_tags.some((tag) => source.keyword_tags.includes(tag))
  ));
  const bucket = sameTopic.length > 0 ? sameTopic : sharedTag;
  if (bucket.length === 0) return undefined;
  return bucket[Math.floor(Math.random() * bucket.length)];
}

function toQuizQuestion(question: Question): FinManQuestion {
  return {
    id: question.id,
    topicId: '',
    topicTitle: question.topic,
    studyNote: '',
    text: question.prompt,
    opts: LETTERS.map((letter) => question.choices[letter]),
    correct: LETTERS.indexOf(question.correct_answer),
    rationale: question.explanation,
  };
}

/** Different items on the same topics, so the check is about the idea and not the wording. */
export function retentionQuiz(
  section: FinManSectionId,
  answeredIds: string[],
  limit = 5,
): FinManQuestion[] {
  const pool = poolFor(section);
  const answered = answeredIds
    .map((id) => BY_ID.get(id))
    .filter((question): question is Question => !!question && question.section_id === Number(section));
  const sources = spread(answered, Math.min(limit, answered.length));
  const blocked = new Set(answeredIds);
  const picked: Question[] = [];
  for (const source of sources) {
    const sibling = siblingFor(source, pool, blocked);
    if (!sibling) continue;
    blocked.add(sibling.id);
    picked.push(sibling);
  }
  for (let i = picked.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = picked[i];
    picked[i] = picked[j];
    picked[j] = swap;
  }
  return picked.map(toQuizQuestion);
}

export function notesDocument(lessons: StudyLesson[]): string {
  const escape = (value: string) => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  const articles = lessons.map((lesson) => `
    <article>
      <p class="kicker">${escape(lesson.kicker)}</p>
      <h2>${escape(lesson.heading)}</h2>
      ${lesson.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}
    </article>
  `).join('');
  const body = articles || '<p>Answer a checkpoint or an SEC audit. Each explanation will be written up here.</p>';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>What you learned</title>
  <style>
    body { margin: 0; background: #fffef8; color: #1c1917; font-family: Georgia, "Iowan Old Style", Palatino, serif; line-height: 1.65; }
    main { max-width: 40rem; margin: 0 auto; padding: 2rem 1.4rem 3rem; }
    h1 { font-size: 1.8rem; font-weight: 600; margin: 0 0 0.4rem; }
    .intro { color: #57534e; margin-top: 0; }
    h2 { font-size: 1.28rem; margin: 2rem 0 0.4rem; }
    .kicker { margin: 0; font-family: "Segoe UI", system-ui, sans-serif; font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; color: #78716c; }
    p { margin: 0.7rem 0; }
  </style>
</head>
<body>
  <main>
    <h1>What you learned</h1>
    <p class="intro">Study notes from this FIN-MAN session. Resize this window however you like. It updates when you answer another question.</p>
    ${body}
  </main>
</body>
</html>`;
}
