import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { buildVocabPool, isAcronymPair, isMultiWordPhrase, parseTermLabel, shufflePool, type VocabPair } from '../lib/asteroidVocab';
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
const MAX_ENEMY_BULLETS = 16;
const SAUCER_BURST_SPOKES = 8;
const SAUCER_EXTRA_RANDOM_SHOTS = 1;
const ROUND_TIMEOUT_MS = 18000;
const ROUNDS_PER_GAME = 20;
const MAX_ASTEROID_SPLIT_GENERATION = 4;
const ASTEROID_SPLIT_SCALE = 0.62;
const LARGE_ASTEROID_RADIUS = 42;
const DECOYS_PER_ROUND = 5;
/** Large rocks added after each correct answer (1 target + decoys). */
const ASTEROIDS_ON_ADVANCE = 4;
const ASTEROID_MERGE_DELAY_MS = 3000;

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
  const margin = radius + 24;
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

function spawnRound(pair: VocabPair, pool: VocabPair[], bounds: { w: number; h: number }): Asteroid[] {
  const decoys = shufflePool(pool.filter((p) => p.id !== pair.id)).slice(0, DECOYS_PER_ROUND);
  const asteroids: Asteroid[] = [];
  const shipSafe = { x: bounds.w / 2, y: bounds.h / 2 };

  const placeAsteroid = (word: string, isTarget: boolean) => {
    for (let attempt = 0; attempt < 30; attempt++) {
      const a = makeAsteroid(word, isTarget, LARGE_ASTEROID_RADIUS, bounds);
      if (dist(a.x, a.y, shipSafe.x, shipSafe.y) > a.radius + 90) {
        asteroids.push(a);
        return;
      }
    }
    asteroids.push(makeAsteroid(word, isTarget, LARGE_ASTEROID_RADIUS, bounds));
  };

  placeAsteroid(pair.word, true);
  for (const decoy of decoys) {
    placeAsteroid(decoy.word, false);
  }

  return asteroids;
}

function placeAsteroidSafe(
  word: string,
  isTarget: boolean,
  radius: number,
  bounds: { w: number; h: number },
  ship: Ship,
  existing: Asteroid[],
): Asteroid {
  for (let attempt = 0; attempt < 40; attempt++) {
    const a = makeAsteroid(word, isTarget, radius, bounds);
    const clearOfShip = dist(a.x, a.y, ship.x, ship.y) > radius + 72;
    const clearOfOthers = existing.every(
      (e) => dist(a.x, a.y, e.x, e.y) > radius + e.radius + 24,
    );
    if (clearOfShip && clearOfOthers) return a;
  }
  return makeAsteroid(word, isTarget, radius, bounds);
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

/** Arcade-style spray: full 360° burst plus extra random shots (never aimed at the player). */
function fireSaucerVolley(
  enemy: EnemyShip,
  bullets: EnemyBullet[],
  maxBullets: number,
): void {
  const baseRotation = Math.random() * Math.PI * 2;
  for (let i = 0; i < SAUCER_BURST_SPOKES; i++) {
    if (bullets.length >= maxBullets) return;
    const angle = baseRotation + (i / SAUCER_BURST_SPOKES) * Math.PI * 2;
    bullets.push({
      id: uid(),
      x: enemy.x,
      y: enemy.y,
      vx: Math.cos(angle) * ENEMY_BULLET_SPEED,
      vy: Math.sin(angle) * ENEMY_BULLET_SPEED,
      life: 140,
    });
  }
  for (let i = 0; i < SAUCER_EXTRA_RANDOM_SHOTS; i++) {
    if (bullets.length >= maxBullets) return;
    const angle = Math.random() * Math.PI * 2;
    bullets.push({
      id: uid(),
      x: enemy.x,
      y: enemy.y,
      vx: Math.cos(angle) * ENEMY_BULLET_SPEED,
      vy: Math.sin(angle) * ENEMY_BULLET_SPEED,
      life: 140,
    });
  }
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

export default function VocabularyAsteroids({ flashcards, questions }: Props) {
  const [customVocab, setCustomVocab] = useState(() => loadCustomVocabSettings());

  const pool = useMemo(
    () => buildVocabPool(flashcards, questions, {
      includeBuiltIn: customVocab.includeBuiltIn,
      includeCustom: customVocab.includeCustom,
      customSections: customVocab.customSections,
      customEntries: customVocab.entries,
    }),
    [flashcards, questions, customVocab],
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
    enemy: null as EnemyShip | null,
    enemyBullets: [] as EnemyBullet[],
    lastShot: 0,
    invulnUntil: 0,
    running: true,
    roundStartedAt: 0,
    nextEnemySpawnAt: 0,
    enemyWarningShown: false,
  });

  const resetRoundPressure = useCallback((now: number) => {
    const s = stateRef.current;
    s.enemy = null;
    s.enemyBullets = [];
    s.roundStartedAt = now;
    s.nextEnemySpawnAt = now + ROUND_TIMEOUT_MS;
    s.enemyWarningShown = false;
  }, []);

  const [roundIndex, setRoundIndex] = useState(0);
  const [order, setOrder] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [complete, setComplete] = useState(false);

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
    stateRef.current.ship = {
      x: CANVAS_W / 2,
      y: CANVAS_H / 2,
      vx: 0,
      vy: 0,
      angle: -Math.PI / 2,
    };
    stateRef.current.bullets = [];
    stateRef.current.asteroids = spawnRound(pair, pool, { w: CANVAS_W, h: CANVAS_H });
    stateRef.current.invulnUntil = performance.now() + 1800;
    stateRef.current.running = true;
    resetRoundPressure(performance.now());
    setFeedback('');
  }, [pool, resetRoundPressure]);

  const startGame = useCallback(() => {
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

    const bounds = { w: CANVAS_W, h: CANVAS_H };
    const s = stateRef.current;
    const ship = s.ship;

    // Keep chipped decoys on the board; strip any leftover target flags so they cannot auto-complete a round.
    s.asteroids = s.asteroids.map((a) => (a.isTarget ? { ...a, isTarget: false } : a));

    const spawned: Asteroid[] = [
      placeAsteroidSafe(pair.word, true, LARGE_ASTEROID_RADIUS, bounds, ship, s.asteroids),
    ];

    const advanceDecoys = shufflePool(pool.filter((p) => p.id !== pair.id)).slice(
      0,
      ASTEROIDS_ON_ADVANCE - 1,
    );
    for (const decoy of advanceDecoys) {
      spawned.push(
        placeAsteroidSafe(
          decoy.word,
          false,
          LARGE_ASTEROID_RADIUS,
          bounds,
          ship,
          [...s.asteroids, ...spawned],
        ),
      );
    }

    s.asteroids.push(...spawned);
    resetRoundPressure(performance.now());
  }, [pool, resetRoundPressure]);

  const goToNextRound = useCallback((pairOrder: number[]) => {
    const nextRound = roundRef.current + 1;
    if (nextRound >= pairOrder.length) {
      advancingRef.current = false;
      setComplete(true);
      stateRef.current.running = false;
      setFeedback('Mission complete! All vocabulary terms cleared.');
      return;
    }
    advanceTerm(nextRound, pairOrder);
  }, [advanceTerm]);

  useEffect(() => {
    if (pool.length === 0) return;
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

      if (!advancingRef.current && now >= s.nextEnemySpawnAt && !s.enemy) {
        const answerWord = targetWordRef.current;
        if (answerWord) {
          s.enemy = spawnEnemy({ w: CANVAS_W, h: CANVAS_H }, answerWord);
          s.nextEnemySpawnAt = now + ROUND_TIMEOUT_MS;
          if (!s.enemyWarningShown) {
            s.enemyWarningShown = true;
            setFeedback(`Flying saucer inbound with "${answerWord}" — it sprays shots in all directions. Shoot the matching asteroid yourself!`);
          }
        }
      }

      const enemy = s.enemy;
      if (enemy) {
        enemy.answerWord = targetWordRef.current || enemy.answerWord;
        enemy.x += enemy.vx;
        enemy.y = wrap(enemy.y + enemy.vy, CANVAS_H);

        const offScreen = enemy.x < -42 || enemy.x > CANVAS_W + 42;
        if (offScreen) {
          s.enemy = null;
        } else if (
          now - enemy.lastShot > ENEMY_FIRE_COOLDOWN
          && s.enemyBullets.length < MAX_ENEMY_BULLETS
        ) {
          enemy.lastShot = now;
          fireSaucerVolley(enemy, s.enemyBullets, MAX_ENEMY_BULLETS);
        }
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
            setFeedback('Game over — review the term and try again.');
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
      for (const b of s.bullets) {
        if (b.life <= 0) continue;

        if (s.enemy && dist(b.x, b.y, s.enemy.x, s.enemy.y) < saucerCollisionRadius(s.enemy.size)) {
          const points = saucerDestroyPoints(s.enemy.size);
          b.life = 0;
          s.enemy = null;
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
              s.enemy = null;
              s.enemyBullets = [];
              goToNextRound(orderRef.current);
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
        const fontSize = Math.max(10, Math.min(14, a.radius * 0.38));
        ctx.font = `600 ${fontSize}px 'Segoe UI', system-ui, sans-serif`;
        const label = a.word.length > 18 ? `${a.word.slice(0, 16)}…` : a.word;
        ctx.fillText(label, 0, 0);
        ctx.restore();
      }

      for (const b of s.bullets) {
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (s.enemy) {
        const hostile = s.enemy;
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

  if (pool.length === 0) {
    return (
      <div className="page astro-page">
        <h1>Vocab Asteroids</h1>
        <p className="subtitle">Read the definition, then shoot the matching word — SIE acronyms and vocabulary terms, plus your own custom cards.</p>
        <CustomVocabPanel settings={customVocab} onChange={handleCustomVocabChange} />
        <div className="card">
          <p>No vocabulary available. Enable the built-in SIE deck or add custom terms above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page astro-page">
      <h1>Vocab Asteroids</h1>
      <p className="subtitle">Read the definition, then shoot the matching word — SIE acronyms (MSRB, FINRA) and vocabulary terms (cumulative preferred, market order, etc.).</p>

      <CustomVocabPanel settings={customVocab} onChange={handleCustomVocabChange} />

      <div className="astro-canvas-wrap card">
        <div className="astro-screen-hud">
          {currentPair && isMultiWordPhrase(currentPair) ? (
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
          ) : currentPair && isAcronymPair(currentPair) ? (
            <>
              <span className="astro-label">What acronym is this?</span>
              <p className="astro-term">{currentPair.term}</p>
              <span className="astro-label">Shoot the matching acronym</span>
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
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="astro-canvas"
          aria-label="Vocabulary asteroids game"
        />

        {(gameOver || complete) && (
          <div className="astro-overlay">
            <p>{complete ? 'All terms cleared!' : 'Game Over'}</p>
            <button type="button" className="btn btn-primary" onClick={startGame}>Play Again</button>
          </div>
        )}
      </div>

      {feedback && <p className="astro-feedback">{feedback}</p>}

      <div className="astro-controls card">
        <p><strong>Controls:</strong> ← → or A/D rotate • ↑ or W thrust • Space or J fire — you fly the triangle; the gold flying saucer is the hint enemy.</p>
        <p className="match-hint">
          {pool.length} definitions across {new Set(pool.map((p) => p.phrase)).size} terms
          ({new Set(pool.filter((p) => isAcronymPair(p)).map((p) => p.phrase)).size} acronyms
          {customTermCount > 0 ? `, ${customTermCount} custom` : ''}). New games spawn {DECOYS_PER_ROUND + 1} large asteroids; each correct answer adds {ASTEROIDS_ON_ADVANCE} more — read the labels, not the rock size. Wrong asteroids split up to {MAX_ASTEROID_SPLIT_GENERATION} times; matching fragments rejoin after {ASTEROID_MERGE_DELAY_MS / 1000}s if they collide.
          Stall {ROUND_TIMEOUT_MS / 1000}s+ and a gold saucer appears with the answer, firing in all directions — shoot it for bonus points (it cannot hurt you); only the correct asteroid completes the round.
        </p>
        <button type="button" className="btn" onClick={startGame}>New Game</button>
      </div>
    </div>
  );
}