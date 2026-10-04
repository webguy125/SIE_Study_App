import type { CustomVocabEntry, CustomVocabSettings, SectionId } from '../types';

const STORAGE_KEY = 'sie_custom_vocab_v1';
const ALL_SECTIONS: SectionId[] = [1, 2, 3, 4];

function isSectionId(value: unknown): value is SectionId {
  return value === 1 || value === 2 || value === 3 || value === 4;
}

function normalizeEntry(entry: CustomVocabEntry): CustomVocabEntry {
  return {
    ...entry,
    section: isSectionId(entry.section) ? entry.section : 4,
  };
}

export const defaultCustomVocabSettings = (): CustomVocabSettings => ({
  includeBuiltIn: true,
  includeCustom: true,
  customSections: [...ALL_SECTIONS],
  entries: [],
});

export function loadCustomVocabSettings(): CustomVocabSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCustomVocabSettings();
    const parsed = JSON.parse(raw) as CustomVocabSettings;
    const customSections = Array.isArray(parsed.customSections)
      ? parsed.customSections.filter(isSectionId)
      : ALL_SECTIONS;

    return {
      ...defaultCustomVocabSettings(),
      ...parsed,
      customSections: customSections.length > 0 ? customSections : [...ALL_SECTIONS],
      entries: Array.isArray(parsed.entries) ? parsed.entries.map(normalizeEntry) : [],
    };
  } catch {
    return defaultCustomVocabSettings();
  }
}

export function saveCustomVocabSettings(settings: CustomVocabSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function createCustomVocabId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}