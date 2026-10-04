import type { Question, ReadinessReport, UserProgress } from '../types';
import { SECTION_NAMES } from '../types';
import { exportProgressJson } from '../lib/storage';
import { getSectionTracker } from '../lib/adaptiveEngine';
import { CONTENT_OUTLINE_LABEL, EXAM_YEAR } from '../lib/examSpec';

interface Props {
  progress: UserProgress;
  report: ReadinessReport;
  questions: Question[];
}

export default function ProgressReport({ progress, report, questions }: Props) {
  const sections = getSectionTracker(progress);

  const exportJson = () => {
    const blob = new Blob([exportProgressJson(progress)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sie-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportHtml = () => {
    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>SIE Study Progress Report</title>
<style>body{font-family:system-ui,sans-serif;max-width:800px;margin:2rem auto;padding:1rem}
h1{color:#1e3a5f}table{width:100%;border-collapse:collapse;margin:1rem 0}
th,td{border:1px solid #ccc;padding:8px;text-align:left}th{background:#f0f4f8}
.pass{color:green}.fail{color:red}</style></head><body>
<h1>SIE ${EXAM_YEAR} Study Progress Report</h1>
<p>Generated: ${new Date().toLocaleString()}</p>
<h2>Overall Readiness: ${report.overallReadiness}%</h2>
<p>Questions Answered: ${report.totalAnswered} | Streak: ${report.streak} days</p>
<h2>Section Mastery</h2>
<table><tr><th>Section</th><th>Name</th><th>Mastery</th><th>Exam Weight</th></tr>
${sections.map((s) => `<tr><td>${s.sectionId}</td><td>${s.name}</td><td>${s.mastery}%</td><td>${s.weight}%</td></tr>`).join('')}
</table>
<h2>Exam History</h2>
${progress.examHistory.length === 0 ? '<p>No exams taken yet.</p>' : `<table>
<tr><th>Date</th><th>Score</th><th>Result</th><th>Time</th></tr>
${progress.examHistory.map((e) => `<tr><td>${new Date(e.date).toLocaleDateString()}</td>
<td>${e.score}%</td><td class="${e.passed ? 'pass' : 'fail'}">${e.passed ? 'PASS' : 'FAIL'}</td>
<td>${Math.floor(e.timeUsedSeconds / 60)} min</td></tr>`).join('')}
</table>`}
<h2>Weak Areas</h2>
<ul>${report.weakSections.map((id) => `<li>Section ${id}: ${SECTION_NAMES[id]} (${report.sectionScores[id]}%)</li>`).join('')}
${report.weakTopics.map((t) => `<li>Topic: ${t}</li>`).join('')}
${report.priorityTags.map((t) => `<li>Priority tag: ${t}</li>`).join('')}</ul>
<p><em>${EXAM_YEAR} prep aligned with ${CONTENT_OUTLINE_LABEL}. Practice only — not an official FINRA product. Question pool: ${questions.length} questions.</em></p>
</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sie-progress-${new Date().toISOString().split('T')[0]}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">
      <h1>SIE {EXAM_YEAR} Progress Report</h1>
      <p className="subtitle">Aligned with {CONTENT_OUTLINE_LABEL}</p>
      <div className="stats-grid">
        <div className="stat-card highlight">
          <span className="stat-label">Readiness</span>
          <span className="stat-value">{report.overallReadiness}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Answered</span>
          <span className="stat-value">{report.totalAnswered}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Exams Taken</span>
          <span className="stat-value">{progress.examHistory.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Missed</span>
          <span className="stat-value">{progress.missedQuestionIds.length}</span>
        </div>
      </div>

      <div className="card">
        <h2>Section Breakdown</h2>
        <table className="data-table">
          <thead>
            <tr><th>Section</th><th>Name</th><th>Mastery</th><th>Weight</th><th>Status</th></tr>
          </thead>
          <tbody>
            {sections.map((s) => (
              <tr key={s.sectionId}>
                <td>{s.sectionId}</td>
                <td>{s.name}</td>
                <td>{s.mastery}%</td>
                <td>{s.weight}%</td>
                <td><span className={`status-badge status-${s.status}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {progress.examHistory.length > 0 && (
        <div className="card">
          <h2>Exam History</h2>
          <table className="data-table">
            <thead>
              <tr><th>Date</th><th>Score</th><th>Result</th><th>Time</th></tr>
            </thead>
            <tbody>
              {progress.examHistory.map((e) => (
                <tr key={e.id}>
                  <td>{new Date(e.date).toLocaleDateString()}</td>
                  <td>{e.score}%</td>
                  <td className={e.passed ? 'result-correct' : 'result-incorrect'}>{e.passed ? 'PASS' : 'FAIL'}</td>
                  <td>{Math.floor(e.timeUsedSeconds / 60)}m {e.timeUsedSeconds % 60}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="card">
        <h2>Export</h2>
        <div className="nav-buttons">
          <button type="button" className="btn btn-primary" onClick={exportJson}>Export JSON</button>
          <button type="button" className="btn btn-primary" onClick={exportHtml}>Export Printable HTML</button>
        </div>
      </div>
    </div>
  );
}