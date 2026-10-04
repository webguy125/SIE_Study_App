import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AppView, UserProgress } from './types';
import { loadProgress, saveProgress } from './lib/storage';
import { getReadinessReport } from './lib/adaptiveEngine';
import questionsData from './data/questions.json';
import flashcardsData from './data/flashcards.json';
import sentenceData from './data/sentenceCompletions.json';
import type { Flashcard, Question, SentenceCompletion } from './types';
import Dashboard from './components/Dashboard';
import ExamSimulator from './components/ExamSimulator';
import QuizBuilder from './components/QuizBuilder';
import Flashcards from './components/Flashcards';
import SentenceCompletionComp from './components/SentenceCompletion';
import LearningGames from './components/LearningGames';
import VocabularyAsteroids from './components/VocabularyAsteroids';
import FinMan from './components/FinMan';
import SieDefender from './components/SieDefender';
import ReviewNotebook from './components/ReviewNotebook';
import ProgressReport from './components/ProgressReport';

const questions = questionsData as Question[];
const flashcards = flashcardsData as Flashcard[];
const sentenceCompletions = sentenceData as SentenceCompletion[];

const NAV_ITEMS: { view: AppView; label: string }[] = [
  { view: 'dashboard', label: 'Dashboard' },
  { view: 'exam', label: 'Full Exam' },
  { view: 'quiz', label: 'Custom Quiz' },
  { view: 'flashcards', label: 'Flashcards' },
  { view: 'games', label: 'Games' },
  { view: 'asteroids', label: 'Vocab Asteroids' },
  { view: 'finman', label: 'FIN-MAN' },
  { view: 'defender', label: 'Compliance Defender' },
  { view: 'sentence', label: 'Sentence Completion' },
  { view: 'notebook', label: 'Weak Areas' },
  { view: 'progress', label: 'Progress Report' },
];

export default function App() {
  const [view, setView] = useState<AppView>('dashboard');
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [menuOpen, setMenuOpen] = useState(false);

  const report = useMemo(() => getReadinessReport(progress, questions), [progress]);

  const handleProgressUpdate = useCallback((updated: UserProgress) => {
    setProgress(updated);
    saveProgress(updated);
  }, []);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard questions={questions} progress={progress} report={report} onNavigate={(v) => setView(v as AppView)} />;
      case 'exam':
        return <ExamSimulator allQuestions={questions} progress={progress} onProgressUpdate={handleProgressUpdate} />;
      case 'quiz':
        return <QuizBuilder allQuestions={questions} progress={progress} onProgressUpdate={handleProgressUpdate} />;
      case 'flashcards':
        return <Flashcards flashcards={flashcards} questions={questions} progress={progress} onProgressUpdate={handleProgressUpdate} />;
      case 'sentence':
        return <SentenceCompletionComp items={sentenceCompletions} />;
      case 'games':
        return <LearningGames questions={questions} flashcards={flashcards} />;
      case 'asteroids':
        return <VocabularyAsteroids flashcards={flashcards} questions={questions} />;
      case 'finman':
        return <FinMan />;
      case 'defender':
        return <SieDefender />;
      case 'notebook':
        return <ReviewNotebook questions={questions} progress={progress} onProgressUpdate={handleProgressUpdate} />;
      case 'progress':
        return <ProgressReport progress={progress} report={report} questions={questions} />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="brand">
          <h2>SIE 2026</h2>
          <span>Study Platform</span>
        </div>
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.view}>
              <button
                type="button"
                className={`nav-link ${view === item.view ? 'active' : ''}`}
                onClick={() => { setView(item.view); setMenuOpen(false); }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-footer">
          <p>{questions.length} practice questions</p>
          <p className="disclaimer">2026 prep — FINRA Oct 2025 outline. Practice only, not affiliated with FINRA.</p>
        </div>
      </nav>

      <button type="button" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        ☰
      </button>

      {menuOpen && (
        <div className="mobile-nav">
          {NAV_ITEMS.map((item) => (
            <button key={item.view} type="button" className={view === item.view ? 'active' : ''}
              onClick={() => { setView(item.view); setMenuOpen(false); }}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <main className="main-content">{renderView()}</main>
    </div>
  );
}