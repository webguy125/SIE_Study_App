import { useMemo, useState } from 'react';
import type { CustomVocabEntry, CustomVocabSettings, SectionId } from '../types';
import { SECTION_NAMES } from '../types';
import { createCustomVocabId } from '../lib/customVocabStorage';

interface Props {
  settings: CustomVocabSettings;
  onChange: (settings: CustomVocabSettings) => void;
}

const SECTION_ORDER: SectionId[] = [1, 2, 3, 4];

const SECTION_OPTIONS: Array<{ id: SectionId; label: string }> = [
  { id: 1, label: 'Section 1 — Capital Markets' },
  { id: 2, label: 'Section 2 — Products & Risks' },
  { id: 3, label: 'Section 3 — Trading & Accounts' },
  { id: 4, label: 'Section 4 — Regulatory Framework' },
];

function parseClues(raw: string): string[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function clueLeaksAnswer(answer: string, clue: string): boolean {
  const upper = answer.toUpperCase().replace(/[^A-Z0-9+]/g, '');
  if (!upper) return false;
  const escaped = upper.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}s?\\b`, 'i').test(clue);
}

function toggleSection(sections: SectionId[], sectionId: SectionId): SectionId[] {
  return sections.includes(sectionId)
    ? sections.filter((id) => id !== sectionId)
    : [...sections, sectionId].sort((a, b) => a - b);
}

export default function CustomVocabPanel({ settings, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<SectionId>(4);
  const [term, setTerm] = useState('');
  const [answer, setAnswer] = useState('');
  const [cluesText, setCluesText] = useState('');
  const [isAcronym, setIsAcronym] = useState(false);
  const [error, setError] = useState('');

  const entriesBySection = useMemo(() => {
    const grouped = new Map<SectionId, CustomVocabEntry[]>();
    for (const sectionId of SECTION_ORDER) grouped.set(sectionId, []);
    for (const entry of settings.entries) {
      grouped.get(entry.section)?.push(entry);
    }
    return grouped;
  }, [settings.entries]);

  const update = (patch: Partial<CustomVocabSettings>) => {
    onChange({ ...settings, ...patch });
  };

  const handleAdd = () => {
    const trimmedTerm = term.trim();
    const trimmedAnswer = answer.trim();
    const clues = parseClues(cluesText);

    if (!trimmedTerm || !trimmedAnswer) {
      setError('Term and answer are required.');
      return;
    }
    if (clues.length === 0) {
      setError('Add at least one definition (one per line).');
      return;
    }
    if (clues.some((c) => c.length < 8)) {
      setError('Each definition should be at least 8 characters.');
      return;
    }
    if (clues.some((c) => clueLeaksAnswer(trimmedAnswer, c))) {
      setError('Definitions cannot contain the answer word.');
      return;
    }

    const entry: CustomVocabEntry = {
      id: createCustomVocabId(),
      section,
      term: trimmedTerm,
      answer: trimmedAnswer,
      clues,
      isAcronym,
      createdAt: Date.now(),
    };

    update({
      entries: [...settings.entries, entry],
      includeCustom: true,
      customSections: settings.customSections.includes(section)
        ? settings.customSections
        : [...settings.customSections, section].sort((a, b) => a - b),
    });

    setTerm('');
    setAnswer('');
    setCluesText('');
    setIsAcronym(false);
    setError('');
  };

  const handleDelete = (id: string) => {
    update({ entries: settings.entries.filter((e) => e.id !== id) });
  };

  const handleSectionChange = (id: string, nextSection: SectionId) => {
    update({
      entries: settings.entries.map((entry) =>
        entry.id === id ? { ...entry, section: nextSection } : entry,
      ),
    });
  };

  return (
    <div className="card custom-vocab-panel">
      <button
        type="button"
        className="custom-vocab-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>My vocabulary</span>
        <span className="custom-vocab-toggle-meta">
          {settings.entries.length} custom • {open ? 'Hide' : 'Show'}
        </span>
      </button>

      {open && (
        <div className="custom-vocab-body">
          <p className="match-hint">
            Add your own acronyms and terms by SIE exam section. Each definition line becomes a separate round in the game.
          </p>

          <div className="custom-vocab-toggles">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.includeBuiltIn}
                onChange={(e) => update({ includeBuiltIn: e.target.checked })}
              />
              Include built-in SIE deck
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.includeCustom}
                onChange={(e) => update({ includeCustom: e.target.checked })}
              />
              Include my custom cards
            </label>
          </div>

          <fieldset className="custom-vocab-section-filters">
            <legend>Custom sections in game</legend>
            <div className="custom-vocab-section-filter-grid">
              {SECTION_OPTIONS.map((option) => (
                <label key={option.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={settings.customSections.includes(option.id)}
                    disabled={!settings.includeCustom}
                    onChange={() => update({
                      customSections: toggleSection(settings.customSections, option.id),
                    })}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="form-card custom-vocab-form">
            <label>
              SIE exam section
              <select value={section} onChange={(e) => setSection(Number(e.target.value) as SectionId)}>
                {SECTION_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </label>
            <label>
              Term / phrase
              <input
                type="text"
                value={term}
                placeholder='e.g. MSRB or cumulative preferred'
                onChange={(e) => setTerm(e.target.value)}
              />
            </label>
            <label>
              Answer (word on asteroid)
              <input
                type="text"
                value={answer}
                placeholder="e.g. MSRB or cumulative"
                onChange={(e) => setAnswer(e.target.value)}
              />
            </label>
            <label>
              Definitions (one per line)
              <textarea
                className="custom-vocab-clues"
                rows={4}
                value={cluesText}
                placeholder={'Creates rules for the municipal securities market\nSelf-regulatory organization for municipal bonds'}
                onChange={(e) => setCluesText(e.target.value)}
              />
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isAcronym}
                onChange={(e) => setIsAcronym(e.target.checked)}
              />
              This answer is an acronym
            </label>
            {error && <p className="custom-vocab-error">{error}</p>}
            <button type="button" className="btn btn-primary" onClick={handleAdd}>
              Add to my deck
            </button>
          </div>

          {settings.entries.length > 0 && (
            <div className="custom-vocab-sections">
              {SECTION_ORDER.map((sectionId) => {
                const sectionEntries = entriesBySection.get(sectionId) ?? [];
                if (sectionEntries.length === 0) return null;

                return (
                  <section key={sectionId} className="custom-vocab-section-group">
                    <div className="custom-vocab-section-head">
                      <h3>Section {sectionId}</h3>
                      <p>{SECTION_NAMES[sectionId]}</p>
                      <span className="custom-vocab-section-count">
                        {sectionEntries.length} {sectionEntries.length === 1 ? 'term' : 'terms'}
                      </span>
                    </div>
                    <ul className="custom-vocab-list">
                      {sectionEntries.map((entry) => (
                        <li key={entry.id} className="custom-vocab-item">
                          <div className="custom-vocab-item-head">
                            <strong>{entry.term}</strong>
                            <span className="custom-vocab-answer">→ {entry.answer}</span>
                            {entry.isAcronym && <span className="custom-vocab-tag">acronym</span>}
                          </div>
                          <label className="custom-vocab-move">
                            Move to section
                            <select
                              value={entry.section}
                              onChange={(e) => handleSectionChange(entry.id, Number(e.target.value) as SectionId)}
                            >
                              {SECTION_OPTIONS.map((option) => (
                                <option key={option.id} value={option.id}>{option.label}</option>
                              ))}
                            </select>
                          </label>
                          <ul className="custom-vocab-clue-list">
                            {entry.clues.map((clue, i) => (
                              <li key={i}>{clue}</li>
                            ))}
                          </ul>
                          <button type="button" className="btn btn-sm" onClick={() => handleDelete(entry.id)}>
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}