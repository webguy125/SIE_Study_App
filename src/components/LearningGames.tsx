import { useMemo, useState, type ReactNode } from 'react';
import { studyGuides } from '../data/gameStudyGuides';
import type { GameStudyGuide } from '../data/gameStudyGuides';
import StudyGuidePanel from './StudyGuidePanel';
import type { Flashcard, Question } from '../types';

interface Props {
  questions: Question[];
  flashcards: Flashcard[];
}

type Game = 'match' | 'sort' | 'agency' | 'prohibited';

interface GameLayoutProps {
  title: string;
  guide: GameStudyGuide;
  studyGuideOpen: boolean;
  onToggleGuide: () => void;
  children: ReactNode;
}

function GameLayout({ title, guide, studyGuideOpen, onToggleGuide, children }: GameLayoutProps) {
  return (
    <div className={`game-layout ${studyGuideOpen ? 'guide-open' : ''}`}>
      <div className="game-quiz-col">
        <div className="quiz-header">
          <h4 className="quiz-heading">{title}</h4>
          <button type="button" className="btn btn-sm" onClick={onToggleGuide}>
            {studyGuideOpen ? 'Hide Study Guide' : 'Show Study Guide'}
          </button>
        </div>
        {children}
      </div>
      {studyGuideOpen && <StudyGuidePanel guide={guide} />}
    </div>
  );
}

export default function LearningGames({ flashcards }: Props) {
  const [game, setGame] = useState<Game>('match');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [studyGuideOpen, setStudyGuideOpen] = useState(false);
  const [quizShuffleKey, setQuizShuffleKey] = useState(0);

  const matchPairs = useMemo(() => {
    return flashcards.slice(0, 8).map((f) => ({
      id: f.id,
      term: f.keyword_tags[0] ?? f.front,
      def: f.back,
    }));
  }, [flashcards]);

  const sortItems = useMemo(() => [
    {
      name: 'Common Stock',
      category: 'Equity',
      why: 'Common stock represents ownership in a corporation. Stockholders are equity holders with voting rights and a residual claim on assets after debts are paid.',
    },
    {
      name: 'Corporate Bond',
      category: 'Debt',
      why: 'A corporate bond is a loan to the issuer. Bondholders are creditors who receive interest and principal — they do not own the company, so bonds are debt securities, not equity.',
    },
    {
      name: 'Municipal GO Bond',
      category: 'Municipal',
      why: 'General obligation bonds are issued by state or local governments and backed by taxing power. They are municipal securities, separate from corporate or U.S. Treasury debt.',
    },
    {
      name: 'S&P 500 ETF',
      category: 'Fund',
      why: 'An ETF is a pooled investment vehicle that holds a basket of securities and trades on an exchange. Investors buy fund shares, not direct ownership of every underlying company.',
    },
    {
      name: 'T-Bill',
      category: 'Government',
      why: 'Treasury bills are short-term obligations of the U.S. government, sold at a discount and redeemed at par. They are government securities, not corporate debt or equity.',
    },
    {
      name: 'Preferred Stock',
      category: 'Equity',
      why: 'Preferred stock is still an equity security — it represents ownership, just with priority over common stock for dividends and liquidation. It is not a loan like a bond.',
    },
    {
      name: 'Call Option',
      category: 'Derivative',
      why: 'Options derive their value from an underlying security and give the right, not obligation, to buy at a set price. Contracts based on another asset are derivatives.',
    },
    {
      name: 'REIT',
      category: 'Real Estate',
      why: 'A REIT owns or finances income-producing real estate and must distribute most of its taxable income. Although it trades like stock, its primary exposure is real estate.',
    },
  ], []);

  const agencies = useMemo(() => [
    {
      item: 'Broker-dealer oversight',
      agency: 'FINRA',
      why: 'FINRA is the primary self-regulatory organization (SRO) that regulates broker-dealers and registered representatives.',
    },
    {
      item: 'Securities law enforcement',
      agency: 'SEC',
      why: 'The SEC is the federal agency responsible for enforcing securities laws and regulating the securities industry.',
    },
    {
      item: 'Municipal market rules',
      agency: 'MSRB',
      why: 'The MSRB writes rules for the municipal securities market. It is a rulemaking board, not a broker-dealer regulator like FINRA.',
    },
    {
      item: 'Federal funds rate',
      agency: 'Federal Reserve',
      why: 'The Federal Reserve sets monetary policy, including the federal funds rate, to influence interest rates and economic activity.',
    },
    {
      item: 'SIE exam administration',
      agency: 'FINRA',
      why: 'FINRA develops and administers the Securities Industry Essentials (SIE) exam for industry candidates.',
    },
    {
      item: 'New issue registration',
      agency: 'SEC',
      why: 'Most new securities offerings must be registered with the SEC (or qualify for an exemption) before sale to the public.',
    },
  ], []);

  const prohibited = useMemo(() => [
    {
      scenario: 'Rep trades ahead of a large customer order for personal profit',
      answer: 'Front running',
      why: 'Front running is trading ahead of a known customer order to profit from the price move that order is expected to cause.',
    },
    {
      scenario: 'Excessive trading in an elderly client account for commissions',
      answer: 'Churning',
      why: 'Churning is excessive trading in a client account primarily to generate commissions, without regard to the client\'s investment objectives.',
    },
    {
      scenario: 'Trading on merger news before public announcement',
      answer: 'Insider trading',
      why: 'Trading on material nonpublic information (MNPI) — such as an undisclosed merger — is illegal insider trading.',
    },
    {
      scenario: 'Coordinated wash sales to inflate volume',
      answer: 'Painting the tape',
      why: 'Painting the tape involves coordinated trades designed to create a false appearance of market activity or price movement.',
    },
    {
      scenario: 'Recommending unsuitable high-risk options to conservative retiree',
      answer: 'Unsuitable recommendations',
      why: 'Recommendations must be suitable based on the customer\'s profile, objectives, and risk tolerance. High-risk options are typically unsuitable for conservative retirees.',
    },
    {
      scenario: 'Failing to file report on suspicious wire activity',
      answer: 'AML violation',
      why: 'Firms must have anti-money laundering (AML) procedures and file Suspicious Activity Reports (SARs) when activity appears suspicious.',
    },
  ], []);

  const shuffleList = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

  const shuffledSortItems = useMemo(() => shuffleList(sortItems), [sortItems, quizShuffleKey]);
  const shuffledAgencies = useMemo(() => shuffleList(agencies), [agencies, quizShuffleKey]);
  const shuffledProhibited = useMemo(() => shuffleList(prohibited), [prohibited, quizShuffleKey]);

  const [shuffledTerms, setShuffledTerms] = useState<string[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [roundFinished, setRoundFinished] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const startMatch = () => {
    setShuffledTerms([...matchPairs.map((p) => p.term)].sort(() => Math.random() - 0.5));
    setMatched(new Set());
    setSelectedTerm(null);
    setScore(0);
    setFeedback('');
    setRoundFinished(false);
    setWrongAttempts(0);
    setExpandedReview(new Set());
  };

  const finishMatchRound = (message?: string) => {
    setRoundFinished(true);
    setSelectedTerm(null);
    const missed = matchPairs.filter((p) => !matched.has(p.term));
    if (message) {
      setFeedback(message);
    } else if (missed.length === 0) {
      setFeedback(`Perfect score — ${matchPairs.length}/${matchPairs.length}!`);
    } else {
      setFeedback(`Round complete — ${score}/${matchPairs.length} correct. Review the missed matches below.`);
    }
  };

  const handleMatchDef = (pairId: string) => {
    if (!selectedTerm || roundFinished) return;
    const pair = matchPairs.find((p) => p.term === selectedTerm);
    if (pair && pair.id === pairId) {
      const nextMatched = new Set([...matched, selectedTerm]);
      setMatched(nextMatched);
      const nextScore = score + 1;
      setScore(nextScore);
      setFeedback(`Correct — "${selectedTerm}" matched!`);
      if (nextMatched.size === matchPairs.length) {
        finishMatchRound(`Perfect score — ${matchPairs.length}/${matchPairs.length}!`);
      }
    } else {
      const wrongPair = matchPairs.find((p) => p.id === pairId);
      setWrongAttempts((n) => n + 1);
      setFeedback(
        wrongPair
          ? `Incorrect — "${selectedTerm}" does not match that definition. Try again.`
          : 'Incorrect match. Try again.',
      );
    }
    setSelectedTerm(null);
  };

  const missedPairs = matchPairs.filter((p) => !matched.has(p.term));

  type ReviewResult = {
    key: string;
    label: string;
    yours: string;
    correct: string;
    why: string;
    isCorrect: boolean;
  };

  const [sortAnswers, setSortAnswers] = useState<Record<string, string>>({});
  const [sortResults, setSortResults] = useState<ReviewResult[]>([]);
  const [sortChecked, setSortChecked] = useState(false);

  const [agencyAnswers, setAgencyAnswers] = useState<Record<string, string>>({});
  const [agencyResults, setAgencyResults] = useState<ReviewResult[]>([]);
  const [agencyChecked, setAgencyChecked] = useState(false);

  const [expandedReview, setExpandedReview] = useState<Set<string>>(new Set());

  const toggleReview = (key: string) => {
    setExpandedReview((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const resetSortReview = () => {
    setSortChecked(false);
    setSortResults([]);
    setExpandedReview(new Set());
  };

  const resetAgencyReview = () => {
    setAgencyChecked(false);
    setAgencyResults([]);
    setExpandedReview(new Set());
  };

  const [prohibAnswers, setProhibAnswers] = useState<Record<string, string>>({});
  const [prohibResults, setProhibResults] = useState<ReviewResult[]>([]);
  const [prohibChecked, setProhibChecked] = useState(false);

  const resetProhibReview = () => {
    setProhibChecked(false);
    setProhibResults([]);
    setExpandedReview(new Set());
  };

  const normalizeAnswer = (answer: string) =>
    answer.trim().toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ');

  const isProhibAnswerCorrect = (yours: string, correct: string) => {
    const normalized = normalizeAnswer(yours);
    const expected = normalizeAnswer(correct);
    if (!normalized) return false;
    return normalized === expected;
  };

  const checkSort = () => {
    const results: ReviewResult[] = shuffledSortItems.map((item) => {
      const yours = sortAnswers[item.name] ?? '(none)';
      const isCorrect = sortAnswers[item.name] === item.category;
      return {
        key: item.name,
        label: item.name,
        yours,
        correct: item.category,
        why: item.why,
        isCorrect,
      };
    });
    const correct = results.filter((r) => r.isCorrect).length;
    setScore(correct);
    setSortResults(results);
    setSortChecked(true);
    setExpandedReview(new Set());
    setFeedback(
      correct === shuffledSortItems.length
        ? `Perfect — ${correct}/${shuffledSortItems.length} correct! Click any row to read why.`
        : `${correct}/${shuffledSortItems.length} correct. Green = correct, red = missed. Click any row for the explanation.`,
    );
  };

  const checkAgency = () => {
    const results: ReviewResult[] = shuffledAgencies.map((a) => {
      const yours = agencyAnswers[a.item] ?? '(none)';
      const isCorrect = agencyAnswers[a.item] === a.agency;
      return {
        key: a.item,
        label: a.item,
        yours,
        correct: a.agency,
        why: a.why,
        isCorrect,
      };
    });
    const correct = results.filter((r) => r.isCorrect).length;
    setScore(correct);
    setAgencyResults(results);
    setAgencyChecked(true);
    setExpandedReview(new Set());
    setFeedback(
      correct === shuffledAgencies.length
        ? `Perfect — ${correct}/${shuffledAgencies.length} correct! Click any row to read why.`
        : `${correct}/${shuffledAgencies.length} correct. Green = correct, red = missed. Click any row for the explanation.`,
    );
  };

  const renderReviewRow = (
    result: ReviewResult,
    prefix: string,
    checked: boolean,
    selectControl: JSX.Element,
  ) => {
    const rowKey = `${prefix}:${result.key}`;
    const expanded = expandedReview.has(rowKey);

    return (
      <div
        key={result.key}
        className={`sort-row ${checked ? 'sort-row-reviewable' : ''} ${
          checked ? (result.isCorrect ? 'sort-row-correct' : 'sort-row-incorrect') : ''
        }`}
        role={checked ? 'button' : undefined}
        tabIndex={checked ? 0 : undefined}
        aria-expanded={checked ? expanded : undefined}
        onClick={() => checked && toggleReview(rowKey)}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && checked) {
            e.preventDefault();
            toggleReview(rowKey);
          }
        }}
      >
        <div className="sort-row-main">
          <span>{result.label}</span>
          <div className="sort-row-result">
            {selectControl}
            {checked && !result.isCorrect && (
              <span className="sort-your-answer">You picked: {result.yours}</span>
            )}
          </div>
        </div>
        {checked && expanded && (
          <div className="sort-row-detail" onClick={(e) => e.stopPropagation()}>
            {!result.isCorrect && (
              <p className="review-answer">Your answer: {result.yours}</p>
            )}
            <p className="review-answer">
              {result.isCorrect ? `Correct: ${result.correct}` : `Correct answer: ${result.correct}`}
            </p>
            <p className="review-why"><strong>Why:</strong> {result.why}</p>
          </div>
        )}
        {checked && !expanded && (
          <p className="sort-row-hint">Click to read explanation</p>
        )}
      </div>
    );
  };

  const checkProhibited = () => {
    const results: ReviewResult[] = shuffledProhibited.map((q) => {
      const yours = prohibAnswers[q.scenario] ?? '';
      const isCorrect = isProhibAnswerCorrect(yours, q.answer);
      return {
        key: q.scenario,
        label: q.scenario,
        yours: yours.trim() || '(none)',
        correct: q.answer,
        why: q.why,
        isCorrect,
      };
    });
    const correct = results.filter((r) => r.isCorrect).length;
    setScore(correct);
    setProhibResults(results);
    setProhibChecked(true);
    setExpandedReview(new Set());
    setFeedback(
      correct === shuffledProhibited.length
        ? `Perfect — ${correct}/${shuffledProhibited.length} correct! Click any row to read why.`
        : `${correct}/${shuffledProhibited.length} correct. Green = correct, red = missed. Click any row for the explanation.`,
    );
  };

  const renderProhibRow = (
    result: ReviewResult,
    checked: boolean,
    index: number,
    input?: JSX.Element,
  ) => {
    const rowKey = `prohib:${result.key}`;
    const expanded = expandedReview.has(rowKey);

    return (
      <div
        key={result.key}
        className={`prohib-card ${checked ? 'sort-row-reviewable' : ''} ${
          checked ? (result.isCorrect ? 'sort-row-correct' : 'sort-row-incorrect') : ''
        }`}
        role={checked ? 'button' : undefined}
        tabIndex={checked ? 0 : undefined}
        aria-expanded={checked ? expanded : undefined}
        onClick={() => checked && toggleReview(rowKey)}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && checked) {
            e.preventDefault();
            toggleReview(rowKey);
          }
        }}
      >
        <div className="prohib-card-top">
          <span className="prohib-num" aria-hidden="true">{index + 1}</span>
          <p className="prohib-scenario">{result.label}</p>
        </div>
        {!checked && input && (
          <label className="prohib-field">
            <span className="prohib-field-label">Prohibited practice</span>
            {input}
          </label>
        )}
        {checked && (
          <div className="prohib-result-row">
            <span className={`prohib-answer-badge ${result.isCorrect ? 'correct' : 'incorrect'}`}>
              {result.isCorrect ? '✓' : '✗'} {result.correct}
            </span>
            {!result.isCorrect && (
              <span className="sort-your-answer">You answered: {result.yours}</span>
            )}
          </div>
        )}
        {checked && expanded && (
          <div className="prohib-detail" onClick={(e) => e.stopPropagation()}>
            {!result.isCorrect && (
              <p className="review-answer">Your answer: {result.yours}</p>
            )}
            <p className="review-answer">
              {result.isCorrect ? `Correct: ${result.correct}` : `Correct answer: ${result.correct}`}
            </p>
            <p className="review-why"><strong>Why:</strong> {result.why}</p>
          </div>
        )}
        {checked && !expanded && (
          <p className="sort-row-hint">Click to read explanation</p>
        )}
      </div>
    );
  };

  const categories = ['Equity', 'Debt', 'Municipal', 'Fund', 'Government', 'Derivative', 'Real Estate'];

  return (
    <div className="page">
      <h1>Learning Games</h1>
      <div className="game-tabs">
        {(['match', 'sort', 'agency', 'prohibited'] as Game[]).map((g) => (
          <button key={g} type="button" className={`btn btn-sm ${game === g ? 'active' : ''}`}
            onClick={() => {
              setGame(g);
              setFeedback('');
              setScore(0);
              setStudyGuideOpen(false);
              setQuizShuffleKey((k) => k + 1);
              setRoundFinished(false);
              resetSortReview();
              resetAgencyReview();
              resetProhibReview();
            }}>
            {g === 'match' ? 'Match the Term' : g === 'sort' ? 'Risk/Product Sort' :
              g === 'agency' ? 'Regulation Agency Match' : 'Prohibited Activity'}
          </button>
        ))}
      </div>

      {feedback && <p className="game-feedback">{feedback}</p>}

      {game === 'match' && (
        <div className="card game-card">
          <GameLayout
            title="Quiz — Match the Term"
            guide={studyGuides.match}
            studyGuideOpen={studyGuideOpen}
            onToggleGuide={() => setStudyGuideOpen((o) => !o)}
          >
          <div className="match-toolbar">
            <button type="button" className="btn" onClick={startMatch}>New Round</button>
            {!roundFinished && score < matchPairs.length && (
              <button type="button" className="btn btn-primary" onClick={() => finishMatchRound()}>
                Finish &amp; Review
              </button>
            )}
          </div>
          <p>Score: {score}/{matchPairs.length}</p>
          {!roundFinished && (
            <p className="match-hint">Select a term, then click its matching definition.</p>
          )}
          {!roundFinished && (
            <div className="match-grid">
              <div>
                <h3>Terms</h3>
                {(shuffledTerms.length ? shuffledTerms : matchPairs.map((p) => p.term)).map((term) => (
                  <div key={term} role="button" tabIndex={matched.has(term) ? -1 : 0}
                    aria-disabled={matched.has(term)}
                    className={`match-item ${selectedTerm === term ? 'selected' : ''} ${matched.has(term) ? 'done' : ''}`}
                    onClick={() => !matched.has(term) && setSelectedTerm(term)}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && !matched.has(term)) {
                        e.preventDefault();
                        setSelectedTerm(term);
                      }
                    }}>{term}</div>
                ))}
              </div>
              <div>
                <h3>Definitions</h3>
                {matchPairs.map((p) => (
                  <div key={p.id} role="button" tabIndex={matched.has(p.term) ? -1 : 0}
                    aria-disabled={matched.has(p.term)}
                    className={`match-item ${matched.has(p.term) ? 'done' : ''}`}
                    onClick={() => !matched.has(p.term) && handleMatchDef(p.id)}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && !matched.has(p.term)) {
                        e.preventDefault();
                        handleMatchDef(p.id);
                      }
                    }}>{p.def}</div>
                ))}
              </div>
            </div>
          )}
          {roundFinished && (
            <div className="game-review">
              <h3>Round Review</h3>
              <p className="review-summary">
                You matched {score} of {matchPairs.length}.
                {wrongAttempts > 0 && ` (${wrongAttempts} incorrect attempt${wrongAttempts === 1 ? '' : 's'})`}
              </p>
              {missedPairs.length > 0 ? (
                <>
                  <h4>Missed matches</h4>
                  <ul className="review-list">
                    {missedPairs.map((p) => {
                      const rowKey = `match-missed:${p.id}`;
                      const expanded = expandedReview.has(rowKey);
                      return (
                        <li
                          key={p.id}
                          role="button"
                          tabIndex={0}
                          aria-expanded={expanded}
                          className="review-item review-missed review-clickable"
                          onClick={() => toggleReview(rowKey)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleReview(rowKey);
                            }
                          }}
                        >
                          <p className="review-term"><strong>{p.term}</strong></p>
                          {expanded ? (
                            <p className="review-why"><strong>Why:</strong> {p.def}</p>
                          ) : (
                            <p className="sort-row-hint">Click to read explanation</p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <p className="review-perfect">You matched every term correctly.</p>
              )}
              <h4>Answer key</h4>
              <p className="match-hint">Click any row to read the explanation.</p>
              <ul className="review-list">
                {matchPairs.map((p) => {
                  const rowKey = `match:${p.id}`;
                  const expanded = expandedReview.has(rowKey);
                  return (
                    <li
                      key={p.id}
                      role="button"
                      tabIndex={0}
                      aria-expanded={expanded}
                      className={`review-item review-clickable ${matched.has(p.term) ? 'review-correct' : 'review-missed'}`}
                      onClick={() => toggleReview(rowKey)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleReview(rowKey);
                        }
                      }}
                    >
                      <p className="review-term">
                        <strong>{p.term}</strong>
                        <span className="review-badge">{matched.has(p.term) ? '✓ Matched' : '✗ Missed'}</span>
                      </p>
                      {expanded ? (
                        <p className="review-why"><strong>Why:</strong> {p.def}</p>
                      ) : (
                        <p className="sort-row-hint">Click to read explanation</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          </GameLayout>
        </div>
      )}

      {game === 'sort' && (
        <div className="card game-card">
          <GameLayout
            title="Quiz — Sort each product into its category"
            guide={studyGuides.sort}
            studyGuideOpen={studyGuideOpen}
            onToggleGuide={() => setStudyGuideOpen((o) => !o)}
          >
          {sortChecked
            ? sortResults.map((result) => renderReviewRow(
                result,
                'sort',
                sortChecked,
                <span className="sort-result-badge">{result.isCorrect ? '✓' : '✗'} {result.correct}</span>,
              ))
            : shuffledSortItems.map((item) => (
                <div key={item.name} className="sort-row">
                  <div className="sort-row-main">
                    <span>{item.name}</span>
                    <select
                      value={sortAnswers[item.name] ?? ''}
                      onChange={(e) => {
                        setSortAnswers({ ...sortAnswers, [item.name]: e.target.value });
                        resetSortReview();
                      }}
                    >
                      <option value="">Select...</option>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              ))}
          <div className="match-toolbar">
            <button type="button" className="btn btn-primary" onClick={checkSort}>
              {sortChecked ? 'Check Again' : 'Check Answers'}
            </button>
            {sortChecked && (
              <button type="button" className="btn" onClick={resetSortReview}>Edit Answers</button>
            )}
          </div>
          </GameLayout>
        </div>
      )}

      {game === 'agency' && (
        <div className="card game-card">
          <GameLayout
            title="Quiz — Match each function to the correct regulator"
            guide={studyGuides.agency}
            studyGuideOpen={studyGuideOpen}
            onToggleGuide={() => setStudyGuideOpen((o) => !o)}
          >
          {agencyChecked
            ? agencyResults.map((result) => renderReviewRow(
                result,
                'agency',
                agencyChecked,
                <span className="sort-result-badge">{result.isCorrect ? '✓' : '✗'} {result.correct}</span>,
              ))
            : shuffledAgencies.map((a) => (
                <div key={a.item} className="sort-row">
                  <div className="sort-row-main">
                    <span>{a.item}</span>
                    <select
                      value={agencyAnswers[a.item] ?? ''}
                      onChange={(e) => {
                        setAgencyAnswers({ ...agencyAnswers, [a.item]: e.target.value });
                        resetAgencyReview();
                      }}
                    >
                      <option value="">Select...</option>
                      {['FINRA', 'SEC', 'MSRB', 'Federal Reserve'].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
          <div className="match-toolbar">
            <button type="button" className="btn btn-primary" onClick={checkAgency}>
              {agencyChecked ? 'Check Again' : 'Check Answers'}
            </button>
            {agencyChecked && (
              <button type="button" className="btn" onClick={resetAgencyReview}>Edit Answers</button>
            )}
          </div>
          </GameLayout>
        </div>
      )}

      {game === 'prohibited' && (
        <div className="card game-card">
          <GameLayout
            title="Quiz — Prohibited Activity Challenge"
            guide={studyGuides.prohibited}
            studyGuideOpen={studyGuideOpen}
            onToggleGuide={() => setStudyGuideOpen((o) => !o)}
          >
          <p className="match-hint">
            {prohibChecked
              ? `Score: ${score}/${shuffledProhibited.length}`
              : 'Name the prohibited practice for each scenario, then check your answers.'}
          </p>
          <div className="prohib-quiz-list">
            {prohibChecked
              ? prohibResults.map((result, index) => renderProhibRow(result, prohibChecked, index))
              : shuffledProhibited.map((q, index) => renderProhibRow(
                  {
                    key: q.scenario,
                    label: q.scenario,
                    yours: '',
                    correct: q.answer,
                    why: q.why,
                    isCorrect: false,
                  },
                  false,
                  index,
                  <input
                    type="text"
                    className="prohib-input"
                    value={prohibAnswers[q.scenario] ?? ''}
                    placeholder="e.g. Front running"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      setProhibAnswers({ ...prohibAnswers, [q.scenario]: e.target.value });
                      resetProhibReview();
                    }}
                  />,
                ))}
          </div>
          <div className="match-toolbar prohib-toolbar">
            <button type="button" className="btn btn-primary" onClick={checkProhibited}>
              {prohibChecked ? 'Check Again' : 'Check Answers'}
            </button>
            {prohibChecked && (
              <button type="button" className="btn" onClick={resetProhibReview}>Edit Answers</button>
            )}
          </div>
          </GameLayout>
        </div>
      )}
    </div>
  );
}