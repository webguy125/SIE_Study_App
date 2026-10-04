import { useMemo, useState } from 'react';
import type { ChoiceKey, Question, UserProgress } from '../types';
import { updateMastery } from '../lib/adaptiveEngine';
import QuestionReview from './QuestionReview';

interface Props {
  questions: Question[];
  progress: UserProgress;
  onProgressUpdate: (p: UserProgress) => void;
}

export default function ReviewNotebook({ questions, progress, onProgressUpdate }: Props) {
  const missedQuestions = useMemo(() => {
    const map = new Map(questions.map((q) => [q.id, q]));
    return progress.missedQuestionIds
      .map((id) => map.get(id))
      .filter((q): q is Question => q !== undefined);
  }, [questions, progress.missedQuestionIds]);

  const [retestMode, setRetestMode] = useState(false);
  const [retestIndex, setRetestIndex] = useState(0);
  const [selected, setSelected] = useState<ChoiceKey | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const startRetest = () => {
    setRetestMode(true);
    setRetestIndex(0);
    setSelected(null);
    setShowResult(false);
  };

  const handleRetestAnswer = (choice: ChoiceKey) => {
    if (showResult) return;
    const q = missedQuestions[retestIndex];
    setSelected(choice);
    setShowResult(true);
    onProgressUpdate(updateMastery(progress, q, choice === q.correct_answer, choice));
  };

  if (retestMode && missedQuestions.length > 0) {
    const q = missedQuestions[retestIndex];
    return (
      <div className="page">
        <h1>Retest — Question {retestIndex + 1} of {missedQuestions.length}</h1>
        <QuestionReview question={q} selected={selected} showResult={showResult} onSelect={handleRetestAnswer} />
        {showResult && (
          <div className="nav-buttons">
            {retestIndex < missedQuestions.length - 1 ? (
              <button type="button" className="btn btn-primary" onClick={() => {
                setRetestIndex((i) => i + 1);
                setSelected(null);
                setShowResult(false);
              }}>Next</button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => setRetestMode(false)}>Done</button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Wrong Answer Notebook</h1>
        <p className="subtitle">{missedQuestions.length} missed questions saved</p>
      </header>

      {missedQuestions.length > 0 && (
        <button type="button" className="btn btn-primary" onClick={startRetest}>Retest All Missed</button>
      )}

      {missedQuestions.length === 0 ? (
        <div className="card"><p>No missed questions yet. Great work!</p></div>
      ) : (
        <div className="notebook-list">
          {missedQuestions.map((q) => (
            <div key={q.id} className="notebook-item card">
              <div className="notebook-header" onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}>
                <span className="badge">Section {q.section_id}</span>
                <span className="badge badge-topic">{q.topic}</span>
                <p>{q.prompt.slice(0, 120)}{q.prompt.length > 120 ? '...' : ''}</p>
              </div>
              {expandedId === q.id && (
                <div className="notebook-detail">
                  <p><strong>Correct:</strong> {q.correct_answer} — {q.choices[q.correct_answer]}</p>
                  <p><strong>Explanation:</strong> {q.explanation}</p>
                  <p><strong>Remediation:</strong> {q.remediation_tip}</p>
                  <p><strong>Keywords:</strong> {q.keyword_tags.join(', ')}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}