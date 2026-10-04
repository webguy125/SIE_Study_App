import { useMemo, useState } from 'react';
import type { SentenceCompletion as SC, SectionId } from '../types';

interface Props {
  items: SC[];
}

function filledSentence(sentence: string, answer: string) {
  return sentence.replace('___', answer);
}

export default function SentenceCompletion({ items }: Props) {
  const [sectionFilter, setSectionFilter] = useState<SectionId | 'all'>('all');
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [revealCurrent, setRevealCurrent] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const filtered = useMemo(() => {
    if (sectionFilter === 'all') return items;
    return items.filter((i) => i.section_id === sectionFilter);
  }, [items, sectionFilter]);

  const item = filtered[index];

  const resetQuestion = () => {
    setAnswer('');
    setShowResult(false);
    setRevealCurrent(false);
  };

  const checkAnswer = () => {
    if (!item || showResult) return;
    const normalized = (s: string) => s.trim().toLowerCase();
    const correct = normalized(answer) === normalized(item.answer);
    setShowResult(true);
    setRevealCurrent(true);
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
  };

  const next = () => {
    resetQuestion();
    setIndex((i) => (i + 1) % filtered.length);
  };

  if (!item) {
    return <div className="page"><div className="card"><p>No sentence completions available.</p></div></div>;
  }

  const isCorrect = answer.trim().toLowerCase() === item.answer.trim().toLowerCase();

  return (
    <div className="page">
      <h1>Sentence Completion</h1>
      <div className="filter-bar">
        <select value={sectionFilter} onChange={(e) => {
          setSectionFilter(e.target.value === 'all' ? 'all' : Number(e.target.value) as SectionId);
          setIndex(0);
          resetQuestion();
        }}>
          <option value="all">All sections</option>
          <option value="1">Section 1</option>
          <option value="2">Section 2</option>
          <option value="3">Section 3</option>
          <option value="4">Section 4</option>
        </select>
        <span>Score: {score.correct}/{score.total}</span>
        <span>Card {index + 1} of {filtered.length}</span>
      </div>

      <div className={`game-layout ${showAnswerKey ? 'guide-open' : ''}`}>
        <div className="game-quiz-col">
          <div className="card">
            <div className="quiz-header">
              <h4 className="quiz-heading">Practice</h4>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setShowAnswerKey((o) => !o)}
              >
                {showAnswerKey ? 'Hide Answer Key' : 'Show Answer Key'}
              </button>
            </div>
            <p className="sentence-prompt">{item.sentence}</p>
            <input
              type="text"
              className="sentence-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="Type the missing term..."
              disabled={showResult}
            />
            <div className="sentence-actions">
              {!showResult && (
                <>
                  <button type="button" className="btn btn-primary" onClick={checkAnswer}>Check</button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setRevealCurrent((r) => !r)}
                  >
                    {revealCurrent ? 'Hide Answer' : 'Reveal Answer'}
                  </button>
                </>
              )}
            </div>
            {revealCurrent && !showResult && (
              <div className="sentence-reveal">
                <p><strong>Answer:</strong> {item.answer}</p>
                <p className="sentence-complete">{filledSentence(item.sentence, item.answer)}</p>
                <p><strong>Hint:</strong> {item.hint}</p>
              </div>
            )}
            {showResult && (
              <div className="feedback">
                <p className={isCorrect ? 'result-correct' : 'result-incorrect'}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="sentence-complete">
                  <strong>Complete sentence:</strong> {filledSentence(item.sentence, item.answer)}
                </p>
                <p><strong>Answer:</strong> {item.answer}</p>
                <p><strong>Hint:</strong> {item.hint}</p>
                <p><strong>Topic:</strong> {item.topic}</p>
                <p><strong>Keywords:</strong> {item.keyword_tags.join(', ')}</p>
                <button type="button" className="btn btn-primary" onClick={next}>Next</button>
              </div>
            )}
          </div>
        </div>

        {showAnswerKey && (
          <aside className="study-guide game-guide-col sc-answer-key" aria-label="Sentence completion answer key">
            <h4>Answer Key</h4>
            <p className="study-guide-intro">
              Study the completed sentences below, then hide this panel and test yourself.
            </p>
            <div className="sc-answer-list">
              {filtered.map((sc, i) => (
                <button
                  key={sc.id}
                  type="button"
                  className={`sc-answer-item ${i === index ? 'active' : ''}`}
                  onClick={() => {
                    setIndex(i);
                    resetQuestion();
                  }}
                >
                  <span className="sc-answer-num">{i + 1}</span>
                  <div className="sc-answer-body">
                    <p className="sc-answer-sentence">{filledSentence(sc.sentence, sc.answer)}</p>
                    <p className="sc-answer-term"><strong>Answer:</strong> {sc.answer}</p>
                    <p className="sc-answer-hint">{sc.hint}</p>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}