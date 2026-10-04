import type { ChoiceKey, Question } from '../types';

interface Props {
  question: Question;
  selected: ChoiceKey | null;
  showResult: boolean;
  onSelect?: (choice: ChoiceKey) => void;
}

export default function QuestionReview({ question, selected, showResult, onSelect }: Props) {
  const choices: ChoiceKey[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="question-card">
      <div className="question-meta">
        <span className="badge">Section {question.section_id}</span>
        <span className="badge badge-topic">{question.topic}</span>
        <span className={`badge badge-${question.difficulty}`}>{question.difficulty}</span>
      </div>
      <h3 className="question-prompt">{question.prompt}</h3>
      <div className="choices">
        {choices.map((key) => {
          let className = 'choice';
          if (selected === key) className += ' selected';
          if (showResult) {
            if (key === question.correct_answer) className += ' correct';
            else if (selected === key) className += ' incorrect';
          }
          return (
            <button
              key={key}
              type="button"
              className={className}
              onClick={() => onSelect?.(key)}
              disabled={showResult || !onSelect}
            >
              <span className="choice-key">{key}</span>
              <span>{question.choices[key]}</span>
            </button>
          );
        })}
      </div>
      {showResult && (
        <div className="feedback">
          <p className={selected === question.correct_answer ? 'result-correct' : 'result-incorrect'}>
            {selected === question.correct_answer ? 'Correct!' : 'Incorrect'}
          </p>
          <p><strong>Correct answer:</strong> {question.correct_answer} — {question.choices[question.correct_answer]}</p>
          <p><strong>Explanation:</strong> {question.explanation}</p>
          <p><strong>Section:</strong> {question.section_name}</p>
          <p><strong>Topic:</strong> {question.topic}</p>
          <p><strong>Keywords:</strong> {question.keyword_tags.join(', ')}</p>
          <p><strong>Remediation tip:</strong> {question.remediation_tip}</p>
        </div>
      )}
    </div>
  );
}