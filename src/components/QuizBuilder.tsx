import { useMemo, useState } from 'react';
import type { ChoiceKey, Difficulty, Question, QuizConfig, SectionId, UserProgress } from '../types';
import { selectCustomQuiz } from '../lib/questionSelector';
import { getUniqueKeywords, getUniqueTopics } from '../lib/questionSelector';
import { updateMastery } from '../lib/adaptiveEngine';
import QuestionReview from './QuestionReview';

interface Props {
  allQuestions: Question[];
  progress: UserProgress;
  onProgressUpdate: (p: UserProgress) => void;
  defaultAdaptive?: boolean;
}

export default function QuizBuilder({ allQuestions, progress, onProgressUpdate, defaultAdaptive }: Props) {
  const topics = useMemo(() => getUniqueTopics(allQuestions), [allQuestions]);
  const keywords = useMemo(() => getUniqueKeywords(allQuestions), [allQuestions]);

  const [config, setConfig] = useState<QuizConfig>({
    count: 20,
    adaptive: defaultAdaptive ?? false,
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<ChoiceKey | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const startQuiz = () => {
    const selectedQs = selectCustomQuiz(allQuestions, progress, config);
    setQuestions(selectedQs);
    setIndex(0);
    setSelected(null);
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
    setFinished(false);
    setStarted(true);
  };

  const handleAnswer = (choice: ChoiceKey) => {
    if (showResult) return;
    setSelected(choice);
    setShowResult(true);
    const q = questions[index];
    const correct = choice === q.correct_answer;
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    onProgressUpdate(updateMastery(progress, q, correct, choice));
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setStarted(false);
      setFinished(true);
    }
  };

  if (!started) {
    return (
      <div className="page">
        <h1>Custom Quiz Builder</h1>
        <div className="card form-card">
          <label>Number of questions
            <input type="number" min={5} max={75} value={config.count}
              onChange={(e) => setConfig({ ...config, count: Number(e.target.value) })} />
          </label>
          <label>Section
            <select value={config.sectionId ?? ''} onChange={(e) => setConfig({
              ...config, sectionId: e.target.value ? Number(e.target.value) as SectionId : undefined
            })}>
              <option value="">All sections</option>
              <option value="1">Section 1 — Capital Markets</option>
              <option value="2">Section 2 — Products & Risks</option>
              <option value="3">Section 3 — Trading & Accounts</option>
              <option value="4">Section 4 — Regulatory Framework</option>
            </select>
          </label>
          <label>Topic
            <select value={config.topic ?? ''} onChange={(e) => setConfig({ ...config, topic: e.target.value || undefined })}>
              <option value="">All topics</option>
              {topics.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label>Difficulty
            <select value={config.difficulty ?? ''} onChange={(e) => setConfig({
              ...config, difficulty: (e.target.value || undefined) as Difficulty | undefined
            })}>
              <option value="">All difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label>Keyword
            <select value={config.keyword ?? ''} onChange={(e) => setConfig({ ...config, keyword: e.target.value || undefined })}>
              <option value="">All keywords</option>
              {keywords.slice(0, 50).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={config.missedOnly ?? false}
              onChange={(e) => setConfig({ ...config, missedOnly: e.target.checked })} />
            Missed questions only
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={config.weakSectionOnly ?? false}
              onChange={(e) => setConfig({ ...config, weakSectionOnly: e.target.checked })} />
            Weak section mode
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={config.adaptive ?? false}
              onChange={(e) => setConfig({ ...config, adaptive: e.target.checked })} />
            Adaptive mode (60% weak / 25% review / 15% fresh)
          </label>
          <button type="button" className="btn btn-primary" onClick={startQuiz}>Start Quiz</button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="page">
        <h1>Custom Quiz</h1>
        <div className="card"><p>No questions match your filters. Adjust settings and try again.</p>
          <button type="button" className="btn" onClick={() => setStarted(false)}>Back</button>
        </div>
      </div>
    );
  }

  if (finished && score.total > 0) {
    return (
      <div className="page">
        <h1>Quiz Complete</h1>
        <div className="card">
          <p>Score: {score.correct}/{score.total} ({Math.round((score.correct / score.total) * 100)}%)</p>
          <button type="button" className="btn btn-primary" onClick={() => { setFinished(false); setStarted(false); }}>New Quiz</button>
        </div>
      </div>
    );
  }

  const q = questions[index];
  return (
    <div className="page">
      <div className="exam-bar">
        <span>Question {index + 1} of {questions.length}</span>
        <span>Score: {score.correct}/{score.total}</span>
      </div>
      <QuestionReview question={q} selected={selected} showResult={showResult} onSelect={handleAnswer} />
      {showResult && (
        <button type="button" className="btn btn-primary" onClick={nextQuestion}>
          {index < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      )}
    </div>
  );
}