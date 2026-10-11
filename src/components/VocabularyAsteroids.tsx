import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ACRONYM_SECTIONS, ACRONYMS, sectionSize } from '../lib/acronyms';
import { buildVocabPool, isAcronymPair, isMultiWordPhrase, parseTermLabel, pickDecoys, shufflePool, type VocabPair } from '../lib/asteroidVocab';
import {
  drawClassicSaucer,
  drawSaucerAnswerLabel,
  saucerCollisionRadius,
  saucerDestroyPoints,
  type SaucerSize,
} from '../lib/classicAsteroidsSaucer';
import { loadCustomVocabSettings, saveCustomVocabSettings } from '../lib/customVocabStorage';
import type { CustomVocabSettings, Flashcard, Question } from '../types';
import CustomVocabPanel from './CustomVocabPanel';

interface Props {
  flashcards: Flashcard[];
  questions: Question[];
}

interface Point {
  x: number;
  y: number;
}

interface Asteroid {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  vertices: Point[];
  word: string;
  isTarget: boolean;
  /** 1 = largest; splits up to MAX_ASTEROID_SPLIT_GENERATION on player hits */
  splitGeneration: number;
  /** Earliest timestamp (ms) this fragment may merge with a matching sibling. */
  mergeEligibleAt: number;
}

interface Bullet {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface Ship {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
}

interface EnemyShip {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  lastShot: number;
  size: SaucerSize;
  /** Correct answer for this round — shown on saucer, not a substitute for shooting the asteroid */
  answerWord: string;
}

interface EnemyBullet {
  id: string;
  ownerId: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const CANVAS_W = 900;
const CANVAS_H = 560;
const SHIP_SIZE = 14;
const BULLET_SPEED = 7;
const ENEMY_BULLET_SPEED = 4.8;
const MAX_BULLETS = 6;
const FIRE_COOLDOWN = 220;
const ENEMY_FIRE_COOLDOWN = 1500;
const ROUNDS_PER_GAME = 20;
const MAX_ASTEROID_SPLIT_GENERATION = 4;
const ASTEROID_SPLIT_SCALE = 0.62;
const LARGE_ASTEROID_RADIUS = 42;
/** One correct acronym plus decoys. A short group uses as many unique acronyms as it has. */
const ROCKS_PER_BOARD = 8;
const ASTEROID_MERGE_DELAY_MS = 3000;
/** First boards wait longer. By board 8 the wait is at the floor and a second saucer joins. */
const SAUCER_SLOW_MS = 16000;
const SAUCER_FAST_MS = 5500;
const SAUCER_RAMP_BOARDS = 8;
const SAUCER_SPAWN_GAP_MS = 2200;
const ADVANCE_INVULN_MS = 800;

function acronymLines(word: string): string[] {
  if (word.length <= 12) return [word];
  const parts = word.split(/\s*\/\s*/).map((part) => part.trim()).filter(Boolean);
  if (parts.length > 1 && parts.length <= 4) return parts;
  const splitAt = word.lastIndexOf(' ', Math.ceil(word.length / 2));
  if (splitAt > 2) return [word.slice(0, splitAt), word.slice(splitAt + 1)];
  return [word];
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function wrap(value: number, max: number) {
  if (value < 0) return max + value;
  if (value > max) return value - max;
  return value;
}

function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(ax - bx, ay - by);
}

function makeVertices(radius: number): Point[] {
  const sides = 8 + Math.floor(Math.random() * 3);
  const verts: Point[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    const r = radius * (0.78 + Math.random() * 0.38);
    verts.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
  }
  return verts;
}

function radiusForSplitGeneration(generation: number): number {
  return Math.max(11, LARGE_ASTEROID_RADIUS * ASTEROID_SPLIT_SCALE ** (generation - 1));
}

function makeAsteroid(
  word: string,
  isTarget: boolean,
  radius: number,
  bounds: { w: number; h: number },
  position?: { x: number; y: number },
  splitGeneration = 1,
  mergeEligibleAt = 0,
): Asteroid {
  const margin = radius + 40;
  const x = position?.x ?? margin + Math.random() * (bounds.w - margin * 2);
  const y = position?.y ?? margin + Math.random() * (bounds.h - margin * 2);
  const speed = 0.45 + Math.random() * 0.75;
  const angle = Math.random() * Math.PI * 2;
  return {
    id: uid(),
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius,
    vertices: makeVertices(radius),
    word,
    isTarget,
    splitGeneration,
    mergeEligibleAt,
  };
}

function rockFits(rock: Asteroid, ship: { x: number; y: number }, others: Asteroid[]): boolean {
  const clearOfShip = dist(rock.x, rock.y, ship.x, ship.y) > rock.radius + 90;
  const clearOfOthers = others.every(
    (other) => dist(rock.x, rock.y, other.x, other.y) > rock.radius + other.radius + 36,
  );
  return clearOfShip && clearOfOthers;
}

function spawnRound(
  pair: VocabPair,
  decoys: VocabPair[],
  bounds: { w: number; h: number },
  ship: { x: number; y: number },
): Asteroid[] {
  const asteroids: Asteroid[] = [];
  const words = [
    { word: pair.word, isTarget: true },
    ...decoys.map((decoy) => ({ word: decoy.word, isTarget: false })),
  ];

  const placeAsteroid = (word: string, isTarget: boolean) => {
    for (let attempt = 0; attempt < 80; attempt++) {
      const rock = makeAsteroid(word, isTarget, LARGE_ASTEROID_RADIUS, bounds);
      if (rockFits(rock, ship, asteroids)) {
        asteroids.push(rock);
        return;
      }
    }

    const margin = LARGE_ASTEROID_RADIUS + 40;
    let best: Asteroid | null = null;
    let bestScore = -Infinity;
    for (let slot = 0; slot < 24; slot++) {
      const col = slot % 6;
      const row = Math.floor(slot / 6);
      const rock = makeAsteroid(word, isTarget, LARGE_ASTEROID_RADIUS, bounds, {
        x: margin + ((col + 0.5) * (bounds.w - margin * 2)) / 6,
        y: margin + ((row + 0.5) * (bounds.h - margin * 2)) / 4,
      });
      const shipGap = dist(rock.x, rock.y, ship.x, ship.y) - (rock.radius + 90);
      const otherGap = asteroids.reduce((gap, other) => Math.min(
        gap,
        dist(rock.x, rock.y, other.x, other.y) - (rock.radius + other.radius + 36),
      ), Infinity);
      const score = Math.min(shipGap, otherGap);
      if (score > bestScore) {
        bestScore = score;
        best = rock;
      }
    }
    if (best) asteroids.push(best);
  };

  for (const entry of words) placeAsteroid(entry.word, entry.isTarget);
  return asteroids;
}

function saucerCountForBoard(boardIndex: number): number {
  return boardIndex >= SAUCER_RAMP_BOARDS ? 2 : 1;
}

function saucerBaseDelay(boardIndex: number): number {
  const ramp = Math.min(1, boardIndex / SAUCER_RAMP_BOARDS);
  return SAUCER_SLOW_MS + (SAUCER_FAST_MS - SAUCER_SLOW_MS) * ramp;
}

function randomSaucerDelay(base: number): number {
  return base * (0.55 + Math.random() * 0.7);
}

function separateSpawnTime(when: number, others: number[]): number {
  let next = when;
  for (let guard = 0; guard < 6; guard++) {
    const close = others.find((other) => Math.abs(next - other) < SAUCER_SPAWN_GAP_MS);
    if (close === undefined) return next;
    next = Math.max(next, close) + SAUCER_SPAWN_GAP_MS + Math.random() * 2800;
  }
  return next;
}

function scheduleSaucerSpawns(now: number, boardIndex: number): number[] {
  const base = saucerBaseDelay(boardIndex);
  const times: number[] = [];
  for (let i = 0; i < saucerCountForBoard(boardIndex); i++) {
    times.push(separateSpawnTime(now + randomSaucerDelay(base), times));
  }
  times.sort((a, b) => a - b);
  return times;
}

function queueSaucerReplacement(
  pending: number[],
  now: number,
  boardIndex: number,
  activeCount: number,
): void {
  if (activeCount + pending.length >= saucerCountForBoard(boardIndex)) return;
  pending.push(separateSpawnTime(now + randomSaucerDelay(saucerBaseDelay(boardIndex)), pending));
}

function spawnEnemy(bounds: { w: number; h: number }, answerWord: string): EnemyShip {
  const fromLeft = Math.random() < 0.5;
  const y = 50 + Math.random() * (bounds.h - 100);
  const speed = 1.1 + Math.random() * 0.5;
  const size: SaucerSize = Math.random() < 0.72 ? 'large' : 'small';
  return {
    id: uid(),
    x: fromLeft ? -30 : bounds.w + 30,
    y,
    vx: fromLeft ? speed : -speed,
    vy: (Math.random() - 0.5) * 0.35,
    lastShot: 0,
    size,
    answerWord,
  };
}

function damageAsteroidFromSaucer(
  asteroids: Asteroid[],
  asteroid: Asteroid,
  bounds: { w: number; h: number },
  now: number,
): Asteroid[] {
  if (asteroid.splitGeneration >= MAX_ASTEROID_SPLIT_GENERATION) {
    if (asteroid.isTarget) return asteroids;
    return asteroids.filter((a) => a.id !== asteroid.id);
  }
  const fragments = splitAsteroid(asteroid, bounds, now);
  if (fragments.length === 0) return asteroids;
  return asteroids.filter((a) => a.id !== asteroid.id).concat(fragments);
}

/** One shot in a random direction. This saucer waits until its own bullet is gone. */
function fireSaucerShot(enemy: EnemyShip, bullets: EnemyBullet[]): void {
  if (bullets.some((bullet) => bullet.ownerId === enemy.id)) return;
  const angle = Math.random() * Math.PI * 2;
  bullets.push({
    id: uid(),
    ownerId: enemy.id,
    x: enemy.x,
    y: enemy.y,
    vx: Math.cos(angle) * ENEMY_BULLET_SPEED,
    vy: Math.sin(angle) * ENEMY_BULLET_SPEED,
    life: 140,
  });
}

function splitAsteroid(asteroid: Asteroid, bounds: { w: number; h: number }, now: number): Asteroid[] {
  if (asteroid.splitGeneration >= MAX_ASTEROID_SPLIT_GENERATION) return [];

  const nextGeneration = asteroid.splitGeneration + 1;
  const newRadius = radiusForSplitGeneration(nextGeneration);
  const offset = newRadius + 4;
  const mergeEligibleAt = now + ASTEROID_MERGE_DELAY_MS;

  return [
    makeAsteroid(asteroid.word, asteroid.isTarget, newRadius, bounds, {
      x: wrap(asteroid.x + offset, bounds.w),
      y: asteroid.y,
    }, nextGeneration, mergeEligibleAt),
    makeAsteroid(asteroid.word, asteroid.isTarget, newRadius, bounds, {
      x: wrap(asteroid.x - offset, bounds.w),
      y: asteroid.y,
    }, nextGeneration, mergeEligibleAt),
  ].map((a) => ({
    ...a,
    vx: a.vx + (Math.random() - 0.5) * 0.8,
    vy: a.vy + (Math.random() - 0.5) * 0.8,
  }));
}

function midpointWrapped(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  bounds: { w: number; h: number },
): { x: number; y: number } {
  let dx = bx - ax;
  if (dx > bounds.w / 2) dx -= bounds.w;
  if (dx < -bounds.w / 2) dx += bounds.w;
  let dy = by - ay;
  if (dy > bounds.h / 2) dy -= bounds.h;
  if (dy < -bounds.h / 2) dy += bounds.h;
  return {
    x: wrap(ax + dx / 2, bounds.w),
    y: wrap(ay + dy / 2, bounds.h),
  };
}

function canMergeAsteroids(a: Asteroid, b: Asteroid, now: number): boolean {
  return (
    a.word === b.word
    && a.isTarget === b.isTarget
    && a.splitGeneration === b.splitGeneration
    && a.splitGeneration > 1
    && a.mergeEligibleAt <= now
    && b.mergeEligibleAt <= now
    && dist(a.x, a.y, b.x, b.y) < a.radius + b.radius
  );
}

function mergeAsteroids(
  a: Asteroid,
  b: Asteroid,
  bounds: { w: number; h: number },
  now: number,
): Asteroid {
  const prevGeneration = a.splitGeneration - 1;
  const radius = radiusForSplitGeneration(prevGeneration);
  const { x, y } = midpointWrapped(a.x, a.y, b.x, b.y, bounds);
  return {
    id: uid(),
    x,
    y,
    vx: (a.vx + b.vx) / 2,
    vy: (a.vy + b.vy) / 2,
    radius,
    vertices: makeVertices(radius),
    word: a.word,
    isTarget: a.isTarget,
    splitGeneration: prevGeneration,
    mergeEligibleAt: now + ASTEROID_MERGE_DELAY_MS,
  };
}

/** Rejoin split fragments that share the same word and size when they collide. */
function reconcileAsteroidMerges(
  asteroids: Asteroid[],
  bounds: { w: number; h: number },
  now: number,
): Asteroid[] {
  let list = asteroids;
  let didMerge = true;
  while (didMerge) {
    didMerge = false;
    outer: for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        if (canMergeAsteroids(a, b, now)) {
          const merged = mergeAsteroids(a, b, bounds, now);
          list = list.filter((_, idx) => idx !== i && idx !== j).concat(merged);
          didMerge = true;
          break outer;
        }
      }
    }
  }
  return list;
}

interface SeenAcronym {
  id: string;
  acronym: string;
  meaning: string;
  section: string;
  asked: boolean;
}

export default function VocabularyAsteroids({ flashcards, questions }: Props) {
  const [customVocab, setCustomVocab] = useState(() => loadCustomVocabSettings());
  const [section, setSection] = useState('All');

  const pool = useMemo(
    () => buildVocabPool(flashcards, questions, {
      includeBuiltIn: customVocab.includeBuiltIn,
      includeCustom: customVocab.includeCustom,
      customSections: customVocab.customSections,
      customEntries: customVocab.entries,
      acronymSection: section,
    }),
    [flashcards, questions, customVocab, section],
  );

  const handleCustomVocabChange = useCallback((settings: CustomVocabSettings) => {
    setCustomVocab(settings);
    saveCustomVocabSettings(settings);
  }, []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const orderRef = useRef<number[]>([]);
  const roundRef = useRef(0);
  const advancingRef = useRef(false);

  const stateRef = useRef({
    ship: { x: CANVAS_W / 2, y: CANVAS_H / 2, vx: 0, vy: 0, angle: -Math.PI / 2 } as Ship,
    asteroids: [] as Asteroid[],
    bullets: [] as Bullet[],
    enemies: [] as EnemyShip[],
    enemyBullets: [] as EnemyBullet[],
    pendingSpawns: [] as number[],
    lastShot: 0,
    invulnUntil: 0,
    running: true,
    roundStartedAt: 0,
    enemyWarningShown: false,
  });

  const resetRoundPressure = useCallback((now: number) => {
    const s = stateRef.current;
    s.enemies = [];
    s.enemyBullets = [];
    s.pendingSpawns = scheduleSaucerSpawns(now, roundRef.current);
    s.roundStartedAt = now;
    s.enemyWarningShown = false;
  }, []);

  const [roundIndex, setRoundIndex] = useState(0);
  const [order, setOrder] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [complete, setComplete] = useState(false);
  const [seen, setSeen] = useState<SeenAcronym[]>([]);
  const seenRef = useRef<SeenAcronym[]>([]);

  const rememberRound = useCallback((target: VocabPair, decoys: VocabPair[]) => {
    const list = seenRef.current;
    const note = (pair: VocabPair, asked: boolean) => {
      const found = list.find((item) => item.id === pair.id);
      if (found) {
        if (asked) found.asked = true;
        return;
      }
      list.push({
        id: pair.id,
        acronym: pair.word,
        meaning: pair.term,
        section: pair.hint,
        asked,
      });
    };
    note(target, true);
    for (const decoy of decoys) note(decoy, false);
    setSeen(list.map((item) => ({ ...item })));
  }, []);

  const currentPair = pool[order[roundIndex] ?? 0];
  const targetWordRef = useRef('');

  useEffect(() => {
    targetWordRef.current = currentPair?.word ?? '';
  }, [currentPair]);

  const initRound = useCallback((index: number, pairOrder: number[]) => {
    const pair = pool[pairOrder[index]];
    if (!pair) return;
    advancingRef.current = false;
    roundRef.current = index;
    const ship: Ship = {
      x: CANVAS_W / 2,
      y: CANVAS_H / 2,
      vx: 0,
      vy: 0,
      angle: -Math.PI / 2,
    };
    stateRef.current.ship = ship;
    stateRef.current.bullets = [];
    const decoys = pickDecoys(pool, pair, ROCKS_PER_BOARD - 1);
    stateRef.current.asteroids = spawnRound(pair, decoys, { w: CANVAS_W, h: CANVAS_H }, ship);
    rememberRound(pair, decoys);
    stateRef.current.invulnUntil = performance.now() + 1800;
    stateRef.current.running = true;
    resetRoundPressure(performance.now());
    setFeedback('');
  }, [pool, resetRoundPressure, rememberRound]);

  const startGame = useCallback(() => {
    seenRef.current = [];
    setSeen([]);
    const shuffled = shufflePool(pool.map((_, i) => i)).slice(0, Math.min(ROUNDS_PER_GAME, pool.length));
    orderRef.current = shuffled;
    setOrder(shuffled);
    setRoundIndex(0);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setComplete(false);
    initRound(0, shuffled);
  }, [pool, initRound]);

  const advanceTerm = useCallback((nextIndex: number, pairOrder: number[]) => {
    const pair = pool[pairOrder[nextIndex]];
    if (!pair) return;

    advancingRef.current = false;
    roundRef.current = nextIndex;
    setRoundIndex(nextIndex);
    setFeedback('Correct!');

    const s = stateRef.current;
    const decoys = pickDecoys(pool, pair, ROCKS_PER_BOARD - 1);
    s.bullets = [];
    s.asteroids = spawnRound(pair, decoys, { w: CANVAS_W, h: CANVAS_H }, s.ship);
    rememberRound(pair, decoys);
    s.invulnUntil = Math.max(s.invulnUntil, performance.now() + ADVANCE_INVULN_MS);
    resetRoundPressure(performance.now());
  }, [pool, resetRoundPressure, rememberRound]);

  const goToNextRound = useCallback((pairOrder: number[]) => {
    const nextRound = roundRef.current + 1;
    if (nextRound >= pairOrder.length) {
      advancingRef.current = false;
      setComplete(true);
      stateRef.current.running = false;
      setFeedback('Mission complete. Study the acronyms that were on the screen.');
      return;
    }
    advanceTerm(nextRound, pairOrder);
  }, [advanceTerm]);

  useEffect(() => {
    if (pool.length === 0) return;
    seenRef.current = [];
    setSeen([]);
    const shuffled = shufflePool(pool.map((_, i) => i)).slice(0, Math.min(ROUNDS_PER_GAME, pool.length));
    orderRef.current = shuffled;
    setOrder(shuffled);
    setRoundIndex(0);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setComplete(false);
    initRound(0, shuffled);
  }, [pool, initRound]);

  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    };
    const onUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, []);

  const pressControl = (code: string) => (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    keysRef.current[code] = true;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* The button still receives pointerup. */
    }
  };

  const releaseControl = (code: string) => () => {
    keysRef.current[code] = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const s = stateRef.current;
      if (!s.running) return;

      const keys = keysRef.current;
      const ship = s.ship;

      if (keys.ArrowLeft || keys.KeyA) ship.angle -= 0.065;
      if (keys.ArrowRight || keys.KeyD) ship.angle += 0.065;
      if (keys.ArrowUp || keys.KeyW) {
        ship.vx += Math.cos(ship.angle) * 0.18;
        ship.vy += Math.sin(ship.angle) * 0.18;
      }

      ship.vx *= 0.992;
      ship.vy *= 0.992;
      ship.x = wrap(ship.x + ship.vx, CANVAS_W);
      ship.y = wrap(ship.y + ship.vy, CANVAS_H);

      if ((keys.Space || keys.KeyJ) && now - s.lastShot > FIRE_COOLDOWN && s.bullets.length < MAX_BULLETS) {
        s.lastShot = now;
        s.bullets.push({
          id: uid(),
          x: ship.x + Math.cos(ship.angle) * SHIP_SIZE,
          y: ship.y + Math.sin(ship.angle) * SHIP_SIZE,
          vx: Math.cos(ship.angle) * BULLET_SPEED,
          vy: Math.sin(ship.angle) * BULLET_SPEED,
          life: 90,
        });
      }

      s.bullets = s.bullets
        .map((b) => ({
          ...b,
          x: wrap(b.x + b.vx, CANVAS_W),
          y: wrap(b.y + b.vy, CANVAS_H),
          life: b.life - 1,
        }))
        .filter((b) => b.life > 0);

      for (const a of s.asteroids) {
        a.x = wrap(a.x + a.vx, CANVAS_W);
        a.y = wrap(a.y + a.vy, CANVAS_H);
      }

      s.asteroids = reconcileAsteroidMerges(s.asteroids, { w: CANVAS_W, h: CANVAS_H }, now);

      if (!advancingRef.current && s.pendingSpawns.some((at) => now >= at)) {
        const answerWord = targetWordRef.current;
        const waiting: number[] = [];
        for (const at of s.pendingSpawns) {
          if (now < at || !answerWord) {
            waiting.push(at);
            continue;
          }
          s.enemies.push(spawnEnemy({ w: CANVAS_W, h: CANVAS_H }, answerWord));
          if (!s.enemyWarningShown) {
            s.enemyWarningShown = true;
            setFeedback(`Flying saucer inbound with "${answerWord}" — each ship fires one shot at a time. Shoot the matching asteroid yourself!`);
          }
        }
        s.pendingSpawns = waiting;
      }

      const staying: EnemyShip[] = [];
      for (const enemy of s.enemies) {
        enemy.answerWord = targetWordRef.current || enemy.answerWord;
        enemy.x += enemy.vx;
        enemy.y = wrap(enemy.y + enemy.vy, CANVAS_H);
        if (enemy.x < -42 || enemy.x > CANVAS_W + 42) continue;
        const hasOwnBullet = s.enemyBullets.some((bullet) => bullet.ownerId === enemy.id);
        if (now - enemy.lastShot > ENEMY_FIRE_COOLDOWN && !hasOwnBullet) {
          enemy.lastShot = now;
          fireSaucerShot(enemy, s.enemyBullets);
        }
        staying.push(enemy);
      }
      const departed = s.enemies.length - staying.length;
      s.enemies = staying;
      for (let i = 0; i < departed; i++) {
        queueSaucerReplacement(s.pendingSpawns, now, roundRef.current, s.enemies.length);
      }

      s.enemyBullets = s.enemyBullets
        .map((b) => ({
          ...b,
          x: wrap(b.x + b.vx, CANVAS_W),
          y: wrap(b.y + b.vy, CANVAS_H),
          life: b.life - 1,
        }))
        .filter((b) => b.life > 0);

      const saucerBulletHits = new Set<string>();
      const bounds = { w: CANVAS_W, h: CANVAS_H };
      for (const b of s.enemyBullets) {
        if (b.life <= 0) continue;
        for (const a of s.asteroids) {
          if (dist(b.x, b.y, a.x, a.y) < a.radius) {
            saucerBulletHits.add(b.id);
            if (a.isTarget) {
              s.asteroids = damageAsteroidFromSaucer(s.asteroids, a, bounds, now);
              setFeedback('Saucer chipped the answer asteroid — you still must shoot it yourself!');
            } else {
              s.asteroids = damageAsteroidFromSaucer(s.asteroids, a, bounds, now);
              setFeedback(`Saucer scattered "${a.word}" — keep hunting the correct asteroid.`);
            }
            break;
          }
        }
      }
      s.enemyBullets = s.enemyBullets.filter((b) => !saucerBulletHits.has(b.id) && b.life > 0);

      const damagePlayer = () => {
        setLives((l) => {
          const next = l - 1;
          if (next <= 0) {
            setGameOver(true);
            s.running = false;
            setFeedback('Game over. The acronyms from this game are listed below.');
          } else {
            setFeedback('Ship hit! Match the definition above to the correct word.');
            s.ship = { x: CANVAS_W / 2, y: CANVAS_H / 2, vx: 0, vy: 0, angle: -Math.PI / 2 };
            s.invulnUntil = now + 1800;
          }
          return Math.max(0, next);
        });
      };

      const invuln = now < s.invulnUntil;
      if (!invuln) {
        let playerHit = false;

        for (const a of s.asteroids) {
          if (dist(ship.x, ship.y, a.x, a.y) < a.radius + SHIP_SIZE * 0.6) {
            playerHit = true;
            break;
          }
        }

        if (playerHit) damagePlayer();
      }

      const destroyed: string[] = [];
      const playerBounds = { w: CANVAS_W, h: CANVAS_H };
      let roundCleared = false;
      for (const b of s.bullets) {
        if (roundCleared || b.life <= 0) continue;

        const enemyIndex = s.enemies.findIndex(
          (enemy) => dist(b.x, b.y, enemy.x, enemy.y) < saucerCollisionRadius(enemy.size),
        );
        if (enemyIndex >= 0) {
          const points = saucerDestroyPoints(s.enemies[enemyIndex].size);
          b.life = 0;
          s.enemies.splice(enemyIndex, 1);
          queueSaucerReplacement(s.pendingSpawns, now, roundRef.current, s.enemies.length);
          setScore((sc) => sc + points);
          setFeedback(`Saucer destroyed (+${points}) — shoot the answer asteroid to complete the round.`);
          continue;
        }

        for (const a of s.asteroids) {
          if (destroyed.includes(a.id)) continue;
          if (dist(b.x, b.y, a.x, a.y) < a.radius) {
            destroyed.push(a.id);
            b.life = 0;

            const answerWord = targetWordRef.current;
            const isCorrectHit = a.isTarget && a.word === answerWord;
            if (isCorrectHit && !advancingRef.current) {
              advancingRef.current = true;
              setScore((sc) => sc + 100);
              s.asteroids = s.asteroids.filter(
                (ast) => !(ast.isTarget && ast.word === answerWord),
              );
              s.enemies = [];
              s.pendingSpawns = [];
              s.enemyBullets = [];
              goToNextRound(orderRef.current);
              roundCleared = true;
            } else if (a.splitGeneration < MAX_ASTEROID_SPLIT_GENERATION) {
              const fragments = splitAsteroid(a, playerBounds, now);
              if (fragments.length > 0) {
                s.asteroids = s.asteroids.filter((ast) => ast.id !== a.id).concat(fragments);
                setFeedback(`Wrong word "${a.word}" — find the match for the term above.`);
              } else {
                s.asteroids = s.asteroids.filter((ast) => ast.id !== a.id);
                setFeedback(`"${a.word}" destroyed.`);
              }
            } else {
              s.asteroids = s.asteroids.filter((ast) => ast.id !== a.id);
              setFeedback(`"${a.word}" destroyed.`);
            }
            break;
          }
        }
      }

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.07)';
      for (let x = 0; x < CANVAS_W; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_H);
        ctx.stroke();
      }
      for (let y = 0; y < CANVAS_H; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_W, y);
        ctx.stroke();
      }

      for (const a of s.asteroids) {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        const v0 = a.vertices[0];
        ctx.moveTo(v0.x, v0.y);
        for (let i = 1; i < a.vertices.length; i++) {
          ctx.lineTo(a.vertices[i].x, a.vertices[i].y);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const lines = acronymLines(a.word);
        let fontSize = Math.min(16, Math.max(12, a.radius * 0.38));
        const maxWidth = a.radius * 1.85;
        ctx.font = `600 ${fontSize}px 'Segoe UI', system-ui, sans-serif`;
        const linesFit = () => lines.every((line) => ctx.measureText(line).width <= maxWidth);
        while (fontSize > 9 && !linesFit()) {
          fontSize -= 1;
          ctx.font = `600 ${fontSize}px 'Segoe UI', system-ui, sans-serif`;
        }
        const lineHeight = fontSize + 2;
        const startY = -((lines.length - 1) * lineHeight) / 2;
        lines.forEach((line, index) => {
          ctx.fillText(line, 0, startY + index * lineHeight);
        });
        ctx.restore();
      }

      for (const b of s.bullets) {
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const hostile of s.enemies) {
        ctx.save();
        ctx.translate(hostile.x, hostile.y);
        drawClassicSaucer(ctx, hostile.size, hostile.vx >= 0);
        if (hostile.answerWord) {
          drawSaucerAnswerLabel(ctx, hostile.answerWord, hostile.size);
        }
        ctx.restore();
      }

      for (const b of s.enemyBullets) {
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!invuln || Math.floor(now / 120) % 2 === 0) {
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.angle);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(SHIP_SIZE, 0);
        ctx.lineTo(-SHIP_SIZE * 0.8, SHIP_SIZE * 0.65);
        ctx.lineTo(-SHIP_SIZE * 0.45, 0);
        ctx.lineTo(-SHIP_SIZE * 0.8, -SHIP_SIZE * 0.65);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [goToNextRound]);

  const customTermCount = customVocab.includeCustom
    ? new Set(customVocab.entries.map((e) => e.id)).size
    : 0;

  const ended = gameOver || complete;
  const studyList = [
    ...seen.filter((item) => item.asked),
    ...seen.filter((item) => !item.asked),
  ];

  const controlButton = (code: string, label: string) => (
    <button
      type="button"
      className="astro-pad-btn"
      onPointerDown={pressControl(code)}
      onPointerUp={releaseControl(code)}
      onPointerCancel={releaseControl(code)}
      onContextMenu={(event) => event.preventDefault()}
    >
      {label}
    </button>
  );

  if (pool.length === 0) {
    return (
      <div className="page astro-page">
        <h1>Vocab Asteroids</h1>
        <p className="subtitle">Shoot the acronym that matches the meaning. The list is the same one Gorilla Summit uses.</p>
        <CustomVocabPanel settings={customVocab} onChange={handleCustomVocabChange} />
        <div className="card">
          <p>No acronyms available. Turn the built-in list back on, or add your own terms above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`page astro-page${ended ? ' astro-ended' : ''}`}>
      <h1>Vocab Asteroids</h1>
      <p className="subtitle">
        Read the meaning, then shoot that acronym. After the game, study every acronym that was on the screen.
      </p>

      <CustomVocabPanel settings={customVocab} onChange={handleCustomVocabChange} />

      <div className="astro-board">
        <div className="astro-canvas-wrap card">
          <div className="astro-screen-hud">
            {currentPair && isAcronymPair(currentPair) ? (
              <>
                <span className="astro-label">What acronym is this?</span>
                <p className="astro-term">{currentPair.term}</p>
                <span className="astro-label">Shoot the matching acronym</span>
              </>
            ) : currentPair && isMultiWordPhrase(currentPair) ? (
              <>
                <span className="astro-label">Complete the term</span>
                <p className="astro-phrase">
                  {parseTermLabel(currentPair.termLabel).map((segment, i) =>
                    segment.type === 'blank' ? (
                      <span key={i} className="astro-blank" aria-label="missing word">___</span>
                    ) : (
                      <span key={i} className="astro-context">{segment.value}</span>
                    ),
                  )}
                </p>
                <span className="astro-label">Definition</span>
                <p className="astro-term">{currentPair.term}</p>
              </>
            ) : (
              <>
                <span className="astro-label">Definition</span>
                <p className="astro-term">{currentPair?.term ?? 'Loading…'}</p>
              </>
            )}
            <div className="astro-stats">
              <span>Score: {score}</span>
              <span>Lives: {lives}</span>
              <span>Round: {Math.min(roundIndex + 1, order.length)}/{order.length}</span>
              <label className="astro-pick">
                Acronyms
                <select value={section} onChange={(event) => setSection(event.target.value)}>
                  <option value="All">All acronyms ({ACRONYMS.length})</option>
                  {ACRONYM_SECTIONS.map((name) => (
                    <option key={name} value={name}>{name} ({sectionSize(name)})</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="astro-stage">
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="astro-canvas"
              aria-label="Vocabulary asteroids game"
            />

            {ended && (
              <div className="astro-overlay">
                <p>{complete ? 'All acronyms cleared!' : 'Game Over'}</p>
                <button type="button" className="btn btn-primary" onClick={startGame}>Play Again</button>
              </div>
            )}
          </div>
        </div>

        <div className="astro-pad" aria-label="Ship controls">
          {controlButton('ArrowLeft', 'Left')}
          {controlButton('ArrowUp', 'Thrust')}
          {controlButton('ArrowRight', 'Right')}
          {controlButton('Space', 'Fire')}
        </div>

        {feedback && <p className="astro-feedback">{feedback}</p>}

        {ended && (
          <section className="card astro-study" aria-label="Acronyms from this game">
            <div className="astro-study-head">
              <h2>Acronyms from this game</h2>
              <button type="button" className="btn btn-primary" onClick={startGame}>Play again</button>
            </div>
            <p>These acronyms were on the screen. Read the meaning for each one.</p>
            <ul>
              {studyList.map((item) => (
                <li key={item.id}>
                  <div className="astro-study-title">
                    <strong>{item.acronym}</strong>
                    {item.asked && <span className="astro-asked">Asked</span>}
                    <span className="astro-study-section">{item.section}</span>
                  </div>
                  <p>{item.meaning}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="astro-controls card">
          <p><strong>Controls:</strong> On a keyboard, ← → or A/D rotate, ↑ or W thrust, Space or J fire. On a tablet, use the Left, Thrust, Right, and Fire buttons.</p>
          <p className="match-hint">
            {pool.length} acronyms in this group
            {customTermCount > 0 ? `, plus ${customTermCount} custom` : ''}. Each board starts with 8 full rocks, and one of them is the acronym. A smaller group uses every acronym it has. Later boards bring the gold saucer in sooner, then add a second saucer. Each saucer starts on its own timer and fires one shot at a time. Wrong rocks split. When the game ends, the list below has the meaning of every acronym that appeared.
          </p>
          <button type="button" className="btn" onClick={startGame}>New Game</button>
        </div>
      </div>
    </div>
  );
}