import type { GameStudyGuide } from '../data/gameStudyGuides';

interface Props {
  guide: GameStudyGuide;
}

export default function StudyGuidePanel({ guide }: Props) {
  return (
    <aside className="study-guide game-guide-col" aria-label={guide.title}>
      <h4>{guide.title}</h4>
      <p className="study-guide-intro">{guide.intro}</p>
      <div className="study-guide-sections">
        {guide.sections.map((section) => (
          <section key={section.title} className="study-guide-entry">
            <h5>{section.title}</h5>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </aside>
  );
}