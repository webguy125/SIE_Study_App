import type { Question, ReadinessReport, UserProgress } from '../types';
import { SECTION_NAMES } from '../types';
import { generateDailyPlan, getSectionTracker } from '../lib/adaptiveEngine';

interface Props {
  questions: Question[];
  progress: UserProgress;
  report: ReadinessReport;
  onNavigate: (view: string) => void;
}

export default function Dashboard({ questions, progress, report, onNavigate }: Props) {
  const sections = getSectionTracker(progress);
  const dailyPlan = generateDailyPlan(progress, questions);

  return (
    <div className="dashboard">
      <header className="page-header">
        <h1>Study Dashboard</h1>
        <p className="subtitle">2026 FINRA SIE Exam Readiness — aligned with October 2025 content outline</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card highlight">
          <span className="stat-label">Exam Readiness</span>
          <span className="stat-value">{report.overallReadiness}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Questions Answered</span>
          <span className="stat-value">{report.totalAnswered}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Study Streak</span>
          <span className="stat-value">{report.streak} days</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Missed Questions</span>
          <span className="stat-value">{progress.missedQuestionIds.length}</span>
        </div>
      </div>

      <div className="card">
        <h2>Recommended Next Step</h2>
        <p className="recommendation">{report.recommendedMode}</p>
        <button type="button" className="btn btn-primary" onClick={() => onNavigate(
          report.recommendedMode.includes('Exam') ? 'exam' :
          report.recommendedMode.includes('Flash') ? 'flashcards' :
          report.recommendedMode.includes('Weak') ? 'notebook' : 'quiz'
        )}>
          Start Now
        </button>
      </div>

      <div className="card">
        <h2>Section Mastery Tracker</h2>
        <div className="section-tracker">
          {sections.map((s) => (
            <div key={s.sectionId} className="section-row">
              <div className="section-info">
                <strong>Section {s.sectionId}</strong>
                <span>{SECTION_NAMES[s.sectionId as 1|2|3|4]}</span>
                <span className="weight">Exam weight: {s.weight}%</span>
              </div>
              <div className="progress-bar">
                <div className={`progress-fill status-${s.status}`} style={{ width: `${Math.max(s.mastery, 5)}%` }} />
              </div>
              <span className="mastery-pct">{s.mastery}%</span>
            </div>
          ))}
        </div>
      </div>

      {report.weakSections.length > 0 && (
        <div className="card alert-card">
          <h2>Weak Areas</h2>
          <ul>
            {report.weakSections.map((id) => (
              <li key={id}>Section {id}: {SECTION_NAMES[id]} ({report.sectionScores[id]}%)</li>
            ))}
            {report.weakTopics.slice(0, 5).map((t) => (
              <li key={t}>Topic: {t}</li>
            ))}
            {report.priorityTags.slice(0, 5).map((t) => (
              <li key={t}>Priority tag: {t}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card">
        <h2>Daily Study Plan</h2>
        <ul className="plan-list">
          {dailyPlan.map((item, i) => (
            <li key={i}>
              <strong>{item.label}</strong>
              <span>{item.reason}</span>
              <button type="button" className="btn btn-sm" onClick={() => onNavigate(item.mode)}>Go</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}