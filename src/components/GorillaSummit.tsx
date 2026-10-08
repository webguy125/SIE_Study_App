import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ACRONYM_SECTIONS,
  ACRONYMS,
  acronymChoices,
  drawAcronym,
  raceSteps,
  resetRaceDeck,
  sectionSize,
  type AcronymCard,
} from '../lib/acronyms';
import { loadSummitArt, type CutSprite, type SummitArt } from '../lib/summitArt';

const WORLD_W = 768;
const WORLD_H = 1152;
const START_BIRDS = 5;
const STUN_SECONDS = 2.6;
const KNOCKBACK = 0.045;
const SECONDS_PER_STEP = 7.5;
const Y_START = 0.86;
const Y_CLIMB = 0.68;

const BABIES = [
  { name: 'Pip', color: '#e11d48' },
  { name: 'Nim', color: '#d97706' },
  { name: 'Bo', color: '#0284c7' },
  { name: 'Zed', color: '#059669' },
] as const;

const LANES = [
  { x0: 0.17, x1: 0.42 },
  { x0: 0.33, x1: 0.47 },
  { x0: 0.67, x1: 0.53 },
  { x0: 0.84, x1: 0.58 },
];

interface BabyState {
  progress: number;
  speed: number;
  stunnedUntil: number;
}

interface BirdShot {
  x: number;
  y: number;
  tx: number;
  ty: number;
  age: number;
  babyIndex: number;
}

interface HitBox {
  index: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Runner {
  phase: 'ready' | 'play' | 'won' | 'lost';
  outcome: 'won' | 'lost' | null;
  dad: number;
  dadTarget: number;
  babies: BabyState[];
  birds: BirdShot[];
  birdCount: number;
  steps: number;
  hits: HitBox[];
  time: number;
  throwPoseUntil: number;
}

function babySpeeds(steps: number): number[] {
  // Stretch the climb with the race. The fastest baby still needs about 7 seconds per correct answer.
  const raceSeconds = Math.max(4, steps) * SECONDS_PER_STEP;
  return [0.76, 0.86, 0.96, 1.05].map((factor) => factor / raceSeconds);
}

function makeRunner(): Runner {
  return {
    phase: 'ready',
    outcome: null,
    dad: 0,
    dadTarget: 0,
    babies: babySpeeds(raceSteps('All')).map((speed) => ({ progress: 0, speed, stunnedUntil: 0 })),
    birds: [],
    birdCount: START_BIRDS,
    steps: raceSteps('All'),
    hits: [],
    time: 0,
    throwPoseUntil: 0,
  };
}

function climbY(progress: number): number {
  return Y_START - progress * Y_CLIMB;
}

function dadPoint(progress: number): { x: number; y: number } {
  return { x: 0.5 + Math.sin(progress * Math.PI) * 0.02, y: climbY(progress) };
}

function babyPoint(index: number, progress: number): { x: number; y: number } {
  const lane = LANES[index];
  return {
    x: lane.x0 + (lane.x1 - lane.x0) * progress,
    y: climbY(progress),
  };
}

function sentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: CutSprite,
  footX: number,
  footY: number,
  destH: number,
) {
  const destW = destH * (sprite.width / sprite.height);
  ctx.drawImage(sprite.canvas, footX - destW / 2, footY - destH, destW, destH);
  return { x: footX - destW / 2, y: footY - destH, w: destW, h: destH };
}

function drawBucket(ctx: CanvasRenderingContext2D, art: SummitArt, count: number) {
  const x = 28;
  const y = WORLD_H - 168;
  ctx.save();
  ctx.fillStyle = '#9a3412';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 118, y);
  ctx.lineTo(x + 100, y + 92);
  ctx.lineTo(x + 18, y + 92);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#7c2d12';
  ctx.fillRect(x + 6, y - 12, 106, 16);
  ctx.fillStyle = '#fdba74';
  ctx.fillRect(x + 46, y - 28, 26, 18);
  const peek = Math.min(3, count);
  for (let i = 0; i < peek; i++) {
    const birdH = 46;
    const birdW = birdH * (art.bird.width / art.bird.height);
    ctx.drawImage(art.bird.canvas, x + 18 + i * 28, y - 18, birdW, birdH);
  }
  ctx.fillStyle = '#fff7ed';
  ctx.font = '700 28px Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(String(count), x + 59, y + 62);
  ctx.restore();
}

export default function GorillaSummit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const artRef = useRef<SummitArt | null>(null);
  const runnerRef = useRef<Runner>(makeRunner());
  const sectionRef = useRef('All');
  const cardRef = useRef<AcronymCard | null>(null);
  const optionsRef = useRef<string[]>([]);
  const correctRef = useRef(0);
  const stepsRef = useRef(raceSteps('All'));
  const lockRef = useRef(false);
  const dealTimer = useRef(0);
  const [artState, setArtState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [section, setSection] = useState('All');
  const [phase, setPhase] = useState<Runner['phase']>('ready');
  const [card, setCard] = useState<AcronymCard | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [spot, setSpot] = useState({ position: 0, total: ACRONYMS.length });
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed] = useState(0);
  const [steps, setSteps] = useState(() => raceSteps('All'));
  const [birds, setBirds] = useState(START_BIRDS);
  const [leader, setLeader] = useState<{ name: string; pct: number }>({ name: BABIES[0].name, pct: 0 });
  const [winner, setWinner] = useState('');

  const deal = useCallback(() => {
    const drawn = drawAcronym(sectionRef.current);
    if (!drawn) return;
    cardRef.current = drawn.card;
    optionsRef.current = acronymChoices(drawn.card);
    lockRef.current = false;
    setCard(drawn.card);
    setOptions(optionsRef.current);
    setSpot({ position: drawn.position, total: drawn.total });
    setPicked(null);
    setLocked(false);
    setFeedback('');
  }, []);

  const resetPose = useCallback(() => {
    window.clearTimeout(dealTimer.current);
    const runner = runnerRef.current;
    runner.phase = 'ready';
    runner.outcome = null;
    runner.dad = 0;
    runner.dadTarget = 0;
    runner.birds = [];
    runner.birdCount = START_BIRDS;
    runner.throwPoseUntil = 0;
    runner.babies.forEach((baby) => {
      baby.progress = 0;
      baby.stunnedUntil = 0;
    });
    correctRef.current = 0;
    lockRef.current = false;
    cardRef.current = null;
    setPhase('ready');
    setCard(null);
    setPicked(null);
    setLocked(false);
    setFeedback('');
    setCorrect(0);
    setMissed(0);
    setBirds(START_BIRDS);
    setLeader({ name: BABIES[0].name, pct: 0 });
    setWinner('');
  }, []);

  const startRace = useCallback(() => {
    const count = raceSteps(sectionRef.current);
    if (count < 1) return;
    window.clearTimeout(dealTimer.current);
    resetRaceDeck();
    const runner = runnerRef.current;
    const speeds = babySpeeds(count);
    runner.phase = 'play';
    runner.outcome = null;
    runner.dad = 0;
    runner.dadTarget = 0;
    runner.birds = [];
    runner.birdCount = START_BIRDS;
    runner.steps = count;
    runner.throwPoseUntil = 0;
    runner.babies = speeds.map((speed) => ({ progress: 0, speed, stunnedUntil: 0 }));
    stepsRef.current = count;
    correctRef.current = 0;
    setSteps(count);
    setCorrect(0);
    setMissed(0);
    setBirds(START_BIRDS);
    setWinner('');
    setLeader({ name: BABIES[0].name, pct: 0 });
    setPhase('play');
    deal();
  }, [deal]);

  const answer = useCallback((index: number) => {
    const current = cardRef.current;
    const opts = optionsRef.current;
    const runner = runnerRef.current;
    if (!current || runner.phase !== 'play' || lockRef.current) return;
    if (index < 0 || index >= opts.length) return;
    lockRef.current = true;
    setLocked(true);
    setPicked(index);
    setFeedback(`${current.acronym} — ${sentence(current.meaning)}`);
    if (opts[index] !== current.acronym) {
      setMissed((count) => count + 1);
      return;
    }
    const next = correctRef.current + 1;
    correctRef.current = next;
    setCorrect(next);
    runner.birdCount += 1;
    setBirds(runner.birdCount);
    if (next >= stepsRef.current) {
      runner.dadTarget = 1;
      runner.outcome = 'won';
      runner.phase = 'won';
      setPhase('won');
      return;
    }
    runner.dadTarget = next / stepsRef.current;
    dealTimer.current = window.setTimeout(() => {
      if (runnerRef.current.phase !== 'play') return;
      deal();
    }, 700);
  }, [deal]);

  const throwAt = useCallback((index: number) => {
    const runner = runnerRef.current;
    if (runner.phase !== 'play' || runner.outcome || runner.birdCount <= 0) return;
    const baby = runner.babies[index];
    if (!baby || baby.progress >= 1) return;
    runner.birdCount -= 1;
    runner.throwPoseUntil = runner.time + 0.35;
    setBirds(runner.birdCount);
    const from = dadPoint(runner.dad);
    const to = babyPoint(index, baby.progress);
    runner.birds.push({
      x: from.x,
      y: from.y - 0.08,
      tx: to.x,
      ty: to.y - 0.05,
      age: 0,
      babyIndex: index,
    });
  }, []);

  useEffect(() => {
    let cancel = false;
    loadSummitArt()
      .then((art) => {
        if (cancel) return;
        artRef.current = art;
        setArtState('ready');
      })
      .catch(() => {
        if (!cancel) setArtState('error');
      });
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLSelectElement || event.target instanceof HTMLInputElement) return;
      const digit = /^Digit([1-4])$/.exec(event.code) || /^Numpad([1-4])$/.exec(event.code);
      if (!digit) return;
      event.preventDefault();
      answer(Number(digit[1]) - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answer]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const art = artRef.current;
    if (!canvas || !art || artState !== 'ready') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let raf = 0;
    let last = performance.now();
    let hudAt = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const runner = runnerRef.current;
      runner.time += dt;
      const racing = runner.phase === 'play' && !runner.outcome;

      if (runner.dad < runner.dadTarget) {
        runner.dad = Math.min(runner.dadTarget, runner.dad + dt * 0.42);
      }

      if (racing) {
        runner.babies.forEach((baby, index) => {
          if (runner.time < baby.stunnedUntil) return;
          const wave = 0.72 + 0.28 * Math.sin(runner.time * 1.3 + index * 1.7);
          baby.progress = Math.min(1, baby.progress + baby.speed * wave * dt);
        });
        const finisher = runner.babies.findIndex((baby) => baby.progress >= 1);
        if (finisher >= 0) {
          runner.outcome = 'lost';
          runner.phase = 'lost';
          setWinner(BABIES[finisher].name);
          setPhase('lost');
        }
      }

      for (let i = runner.birds.length - 1; i >= 0; i--) {
        const shot = runner.birds[i];
        shot.age += dt;
        if (shot.age < 0.5) continue;
        const baby = runner.babies[shot.babyIndex];
        if (baby && runner.outcome !== 'won') {
          baby.progress = Math.max(0, baby.progress - KNOCKBACK);
          baby.stunnedUntil = runner.time + STUN_SECONDS;
        }
        runner.birds.splice(i, 1);
      }

      if (now - hudAt > 200) {
        hudAt = now;
        let lead = 0;
        runner.babies.forEach((baby, index) => {
          if (baby.progress > runner.babies[lead].progress) lead = index;
        });
        const pct = Math.round(runner.babies[lead].progress * 100);
        setLeader((prev) => (
          prev.name === BABIES[lead].name && prev.pct === pct ? prev : { name: BABIES[lead].name, pct }
        ));
      }

      if (canvas.width !== WORLD_W * dpr || canvas.height !== WORLD_H * dpr) {
        canvas.width = WORLD_W * dpr;
        canvas.height = WORLD_H * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, WORLD_W, WORLD_H);
      ctx.drawImage(art.mountain, 0, 0, WORLD_W, WORLD_H);
      drawBucket(ctx, art, runner.birdCount);

      const dadH = WORLD_H * 0.2;
      const babyH = WORLD_H * 0.135;
      const dadRunning = runner.dadTarget - runner.dad > 0.004;
      const dadFrame = dadRunning || runner.time < runner.throwPoseUntil
        ? (Math.floor(runner.time * 8) % 2 === 0 ? art.dad[3] : art.dad[1])
        : art.dad[0];
      const dadAt = dadPoint(runner.dad);

      type Actor = { y: number; draw: () => void };
      const actors: Actor[] = [];
      const hits: HitBox[] = [];

      runner.babies.forEach((baby, index) => {
        const at = babyPoint(index, baby.progress);
        const stunned = runner.time < baby.stunnedUntil;
        const frame = stunned ? art.baby[0] : (index < 2 ? art.baby[3] : art.baby[1]);
        actors.push({
          y: at.y,
          draw: () => {
            const footX = at.x * WORLD_W;
            const footY = at.y * WORLD_H + (stunned ? 0 : Math.sin(runner.time * 8 + index) * 5);
            ctx.save();
            ctx.fillStyle = 'rgba(15, 23, 42, 0.28)';
            ctx.beginPath();
            ctx.ellipse(footX, footY, babyH * 0.28, babyH * 0.06, 0, 0, Math.PI * 2);
            ctx.fill();
            const rect = drawSprite(ctx, frame, footX, footY, babyH);
            hits.push({ index, x: rect.x - 16, y: rect.y - 16, w: rect.w + 32, h: rect.h + 32 });
            ctx.beginPath();
            ctx.fillStyle = BABIES[index].color;
            ctx.arc(footX, rect.y - 8, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = '700 16px Segoe UI, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(BABIES[index].name[0], footX, rect.y - 8);
            if (stunned) {
              const perch = babyH * 0.28;
              ctx.drawImage(
                art.bird.canvas,
                footX - perch * 0.2,
                rect.y - perch * 0.2,
                perch * (art.bird.width / art.bird.height),
                perch,
              );
            }
            ctx.restore();
          },
        });
      });

      actors.push({
        y: dadAt.y + 0.02,
        draw: () => {
          const footX = dadAt.x * WORLD_W;
          const footY = dadAt.y * WORLD_H + (dadRunning ? Math.sin(runner.time * 14) * 7 : 0);
          ctx.save();
          ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
          ctx.beginPath();
          ctx.ellipse(footX, footY, dadH * 0.26, dadH * 0.055, 0, 0, Math.PI * 2);
          ctx.fill();
          const rect = drawSprite(ctx, dadFrame, footX, footY, dadH);
          ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
          const labelW = 62;
          const labelY = rect.y - 14;
          ctx.fillRect(footX - labelW / 2, labelY - 16, labelW, 24);
          ctx.fillStyle = '#ffffff';
          ctx.font = '700 16px Segoe UI, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('Dad', footX, labelY - 4);
          ctx.restore();
        },
      });

      actors.sort((a, b) => a.y - b.y);
      for (const actor of actors) actor.draw();
      runner.hits = hits;

      for (const shot of runner.birds) {
        const t = Math.min(1, shot.age / 0.5);
        const x = (shot.x + (shot.tx - shot.x) * t) * WORLD_W;
        const y = (shot.y + (shot.ty - shot.y) * t) * WORLD_H - Math.sin(t * Math.PI) * 70;
        const birdH = WORLD_H * 0.055;
        const birdW = birdH * (art.bird.width / art.bird.height);
        ctx.save();
        ctx.translate(x, y);
        if (shot.tx > shot.x) ctx.scale(-1, 1);
        ctx.drawImage(art.bird.canvas, -birdW / 2, -birdH / 2, birdW, birdH);
        ctx.restore();
      }
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(dealTimer.current);
    };
  }, [artState]);

  const onCanvasPointer = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * WORLD_W;
    const y = ((event.clientY - rect.top) / rect.height) * WORLD_H;
    const hit = [...runnerRef.current.hits].reverse().find((box) => (
      x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h
    ));
    if (hit) throwAt(hit.index);
  };

  const changeSection = (value: string) => {
    sectionRef.current = value;
    setSection(value);
    if (runnerRef.current.phase === 'ready') setSteps(raceSteps(value));
  };

  const showMarks = locked && card;

  return (
    <div className="page summit-page">
      <h1>Gorilla Summit</h1>
      <p className="subtitle">
        Dad runs up when you know the acronym. The babies climb on their own. Throw a bird to slow one down.
      </p>

      <div className="summit-hud">
        <span>Dad {correct}/{steps}</span>
        <span>Birds {birds}</span>
        <span>{leader.pct > 0 ? `Lead ${leader.name} ${leader.pct}%` : 'Babies at the start'}</span>
        <button type="button" className="btn btn-sm" onClick={resetPose}>New Race</button>
      </div>

      <div className="summit-layout">
        <div className="summit-stage">
          <canvas
            ref={canvasRef}
            className="summit-canvas"
            aria-label="Dad and four baby gorillas on the mountain. Tap a baby to throw a bird from the bucket."
            onPointerDown={onCanvasPointer}
          />
        </div>

        <div className="card summit-quiz">
          <div className="summit-quiz-body">
            {artState === 'loading' && <p>Bringing the family to the mountain.</p>}
            {artState === 'error' && <p>The gorilla pictures did not load.</p>}
            {artState === 'ready' && phase === 'ready' && (
              <p>
                Dad starts with a bucket of {START_BIRDS} birds. Each acronym you know sends him higher and adds one bird.
                All acronyms is {raceSteps('All')} to the top. One group is every acronym in that group, and the babies climb slower on a longer race.
                Tap a baby, or use a bird button, to knock that baby down and hold them for a moment.
              </p>
            )}

            {artState === 'ready' && phase === 'play' && card && (
              <>
                <p className="summit-kicker">{card.section} · {spot.position} of {spot.total}</p>
                <p className="summit-meaning">{sentence(card.meaning)}</p>
                <p className="summit-ask">Which acronym is this?</p>
              </>
            )}

            {artState === 'ready' && phase === 'won' && (
              <>
                <h2>Dad reached the top.</h2>
                <p>You knew {correct} and missed {missed}. Birds left in the bucket: {birds}.</p>
              </>
            )}

            {artState === 'ready' && phase === 'lost' && (
              <>
                <h2>{winner} reached the top first.</h2>
                <p>Dad knew {correct} of {steps} and missed {missed}. Race again and use the birds on whoever is leading.</p>
              </>
            )}
          </div>

          {artState === 'ready' && phase === 'ready' && (
            <div className="summit-dock">
              <label className="summit-pick">
                Acronyms
                <select value={section} onChange={(event) => changeSection(event.target.value)}>
                  <option value="All">All acronyms ({ACRONYMS.length})</option>
                  {ACRONYM_SECTIONS.map((name) => (
                    <option key={name} value={name}>{name} ({sectionSize(name)})</option>
                  ))}
                </select>
              </label>
              <button type="button" className="btn btn-primary" onClick={startRace} disabled={raceSteps(section) < 1}>
                Start race
              </button>
            </div>
          )}

          {artState === 'ready' && phase === 'play' && card && (
            <div className="summit-dock">
              <div className="summit-options">
                {options.map((opt, index) => {
                  let cls = 'summit-option';
                  if (showMarks && opt === card.acronym) cls += ' is-correct';
                  else if (showMarks && index === picked) cls += ' is-wrong';
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={cls}
                      disabled={locked}
                      onClick={() => answer(index)}
                    >
                      <span>{index + 1}.</span> {opt}
                    </button>
                  );
                })}
              </div>
              {feedback && <p className="summit-feedback">{feedback}</p>}
              {locked && picked !== null && options[picked] !== card.acronym && (
                <button type="button" className="btn btn-primary summit-next" onClick={deal}>
                  Next acronym
                </button>
              )}
              <div className="summit-throws">
                {BABIES.map((baby, index) => (
                  <button
                    key={baby.name}
                    type="button"
                    className="btn btn-sm summit-throw"
                    disabled={birds <= 0}
                    onClick={() => throwAt(index)}
                  >
                    <span className="summit-dot" style={{ background: baby.color }} />
                    Bird at {baby.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {artState === 'ready' && (phase === 'won' || phase === 'lost') && (
            <div className="summit-dock">
              {feedback && <p className="summit-feedback">{feedback}</p>}
              <button type="button" className="btn btn-primary" onClick={startRace}>Race again</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
