import { useMemo, useState } from 'react';
import type { Flashcard, SectionId } from '../types';
import { updateMastery } from '../lib/adaptiveEngine';
import type { Question, UserProgress } from '../types';

interface Props {
  flashcards: Flashcard[];
  questions: Question[];
  progress: UserProgress;
  onProgressUpdate: (p: UserProgress) => void;
}

export default function Flashcards({ flashcards, questions, progress, onProgressUpdate }: Props) {
  const [sectionFilter, setSectionFilter] = useState<SectionId | 'all'>('all');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filtered = useMemo(() => {
    if (sectionFilter === 'all') return flashcards;
    return flashcards.filter((f) => f.section_id === sectionFilter);
  }, [flashcards, sectionFilter]);

  const card = filtered[index];

  const rateCard = (knew: boolean) => {
    const relatedQ = questions.find((q) => q.topic === card.topic && q.section_id === card.section_id);
    if (relatedQ) {
      onProgressUpdate(updateMastery(progress, relatedQ, knew));
    }
    setFlipped(false);
    setIndex((i) => (i + 1) % filtered.length);
  };

  if (!card) {
    return <div className="page"><div className="card"><p>No flashcards available.</p></div></div>;
  }

  return (
    <div className="page">
      <h1>Flashcards</h1>
      <div className="filter-bar">
        <select value={sectionFilter} onChange={(e) => {
          setSectionFilter(e.target.value === 'all' ? 'all' : Number(e.target.value) as SectionId);
          setIndex(0);
          setFlipped(false);
        }}>
          <option value="all">All sections</option>
          <option value="1">Section 1</option>
          <option value="2">Section 2</option>
          <option value="3">Section 3</option>
          <option value="4">Section 4</option>
        </select>
        <span>{index + 1} / {filtered.length}</span>
      </div>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <p className="fc-label">Term / Concept</p>
            <p>{card.front}</p>
            <span className="tap-hint">Tap to flip</span>
          </div>
          <div className="flashcard-back">
            <p className="fc-label">Definition</p>
            <p>{card.back}</p>
            <p className="fc-meta">{card.topic} — Tags: {card.keyword_tags.join(', ')}</p>
          </div>
        </div>
      </div>
      {flipped && (
        <div className="nav-buttons">
          <button type="button" className="btn" onClick={() => rateCard(false)}>Need Review</button>
          <button type="button" className="btn btn-primary" onClick={() => rateCard(true)}>Got It</button>
        </div>
      )}
      <div className="nav-buttons">
        <button type="button" className="btn" onClick={() => { setIndex((i) => (i - 1 + filtered.length) % filtered.length); setFlipped(false); }}>Previous</button>
        <button type="button" className="btn" onClick={() => { setIndex((i) => (i + 1) % filtered.length); setFlipped(false); }}>Next</button>
      </div>
    </div>
  );
}