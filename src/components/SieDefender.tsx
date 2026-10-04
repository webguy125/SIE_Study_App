import { useRef } from 'react';

/**
 * Launcher shell — embeds the standalone Compliance Defender game
 * (pure TypeScript + Canvas, no React in the game runtime).
 */
const defenderUrl = './compliance-defender/index.html';

export default function SieDefender() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="page defender-page">
      <h1>Compliance Defender</h1>
      <p className="subtitle">
        Williams Defender (1981) — arrow keys thrust your ship, Space fires, B smart-bombs the screen, H hyperspace warps you
        (risky). Save pink humans from green landers before they become red mutants. Radar strip on top, world wraps left/right.
      </p>

      <div className="defender-embed card">
        <iframe
          ref={iframeRef}
          title="Compliance Defender"
          src={defenderUrl}
          className="defender-iframe"
          allow="fullscreen"
          tabIndex={0}
          onLoad={() => iframeRef.current?.focus()}
        />
      </div>

      <p className="match-hint">
        Prefer a separate window?{' '}
        <a href={defenderUrl} target="_blank" rel="noopener noreferrer">
          Open Compliance Defender fullscreen
        </a>
      </p>
    </div>
  );
}