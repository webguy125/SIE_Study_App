import { useCallback, useEffect, useState } from 'react';
import type { ChoiceKey, ExamResult, Question, UserProgress } from '../types';
import { EXAM_TIME_MINUTES } from '../types';
import { EXAM_FORMAT_SUMMARY, CONTENT_OUTLINE_LABEL } from '../lib/examSpec';
import { buildExamResult } from '../lib/scoring';
import { selectExamQuestions } from '../lib/questionSelector';
import { updateMastery } from '../lib/adaptiveEngine';
import QuestionReview from './QuestionReview';

interface Props {
  allQuestions: Question[];
  progress: UserProgress;
  onProgressUpdate: (p: UserProgress) => void;
}

type Phase = 'intro' | 'exam' | 'results' | 'review';

export default function ExamSimulator({ allQuestions, progress, onProgressUpdate }: Props) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ChoiceKey>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME_MINUTES * 60);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);

  const finishExam = useCallback(() => {
    const timeUsed = EXAM_TIME_MINUTES * 60 - timeLeft;
    const examResult = buildExamResult(questions, answers, timeUsed);
    setResult(examResult);
    let updated = { ...progress, examHistory: [...progress.examHistory, examResult] };
    for (const q of questions) {
      const ans = answers[q.id];
      if (ans) {
        updated = updateMastery(updated, q, ans === q.correct_answer, ans);
      }
    }
    onProgressUpdate(updated);
    setPhase('results');
  }, [answers, questions, progress, timeLeft, onProgressUpdate]);

  useEffect(() => {
    if (phase !== 'exam') return;
    if (timeLeft <= 0) {
      finishExam();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft, finishExam]);

  const startExam = () => {
    const selected = selectExamQuestions(allQuestions);
    setQuestions(selected);
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(EXAM_TIME_MINUTES * 60);
    setPhase('exam');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  if (phase === 'intro') {
    return (
      <div className="page">
        <h1>Full Exam Simulator</h1>
        <div className="card">
          <p>2026-aligned SIE format (based on {CONTENT_OUTLINE_LABEL}):</p>
          <ul>
            {EXAM_FORMAT_SUMMARY.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="exam-note">This simulator uses 75 scored questions only (pretest items are not included).</p>
          <button type="button" className="btn btn-primary" onClick={startExam}>Begin Exam</button>
        </div>
      </div>
    );
  }

  if (phase === 'exam') {
    const q = questions[currentIndex];
    return (
      <div className="page">
        <div className="exam-bar">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span className="timer">{formatTime(timeLeft)}</span>
        </div>
        <QuestionReview
          question={q}
          selected={answers[q.id] ?? null}
          showResult={false}
          onSelect={(choice) => setAnswers({ ...answers, [q.id]: choice })}
        />
        <div className="nav-buttons">
          <button type="button" className="btn" disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => i - 1)}>Previous</button>
          {currentIndex < questions.length - 1 ? (
            <button type="button" className="btn btn-primary"
              onClick={() => setCurrentIndex((i) => i + 1)}>Next</button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={finishExam}>Submit Exam</button>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'results' && result) {
    return (
      <div className="page">
        <h1>Exam Results</h1>
        <div className={`card result-banner ${result.passed ? 'passed' : 'failed'}`}>
          <h2>{result.passed ? 'PASS' : 'FAIL'}</h2>
          <p className="score-big">{result.score}%</p>
          <p>Time used: {formatTime(result.timeUsedSeconds)}</p>
        </div>
        <div className="card">
          <h3>Section Breakdown</h3>
          {([1, 2, 3, 4] as const).map((id) => (
            <p key={id}>Section {id}: {result.sectionScores[id].correct}/{result.sectionScores[id].total} ({result.sectionScores[id].percent}%)</p>
          ))}
        </div>
        <button type="button" className="btn btn-primary" onClick={() => { setReviewIndex(0); setPhase('review'); }}>Review Answers</button>
        <button type="button" className="btn" onClick={() => setPhase('intro')}>New Exam</button>
      </div>
    );
  }

  if (phase === 'review' && result) {
    const q = questions[reviewIndex];
    return (
      <div className="page">
        <h1>Review Mode — Question {reviewIndex + 1} of {questions.length}</h1>
        <QuestionReview
          question={q}
          selected={answers[q.id] ?? null}
          showResult={true}
        />
        <div className="nav-buttons">
          <button type="button" className="btn" disabled={reviewIndex === 0}
            onClick={() => setReviewIndex((i) => i - 1)}>Previous</button>
          {reviewIndex < questions.length - 1 ? (
            <button type="button" className="btn btn-primary"
              onClick={() => setReviewIndex((i) => i + 1)}>Next</button>
          ) : (
            <button type="button" className="btn" onClick={() => setPhase('intro')}>Done</button>
          )}
        </div>
      </div>
    );
  }

  return null;
}