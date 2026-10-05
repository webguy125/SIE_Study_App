import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FIN_MAN_DATA,
  FIN_MAN_SECTIONS,
  TOPIC_READ_MS,
  topicById,
  type FinManQuestion,
  type FinManSectionId,
} from '../data/finManData';
import { drawFinManQuestion, resetMazeQuestions, sectionPoolSize } from '../lib/finManDeck';
import { getFinManSounds } from '../lib/finManSounds';
import {
  lessonForQuestion,
  notesDocument,
  retentionQuiz,
  type StudyLesson,
} from '../lib/finManStudy';

/* ─── Maze & layout ─────────────────────────────────────────────── */
const TILE = 50;
const BOARD_SCALE = TILE / 30;
const COLS = 19;
const ROWS = 21;
const CANVAS_W = COLS * TILE;
const CANVAS_H = ROWS * TILE;
const TUNNEL_ROWS = new Set([7, 11]);
const PLAYER_SPEED = 2.2 * BOARD_SCALE;
const TURN_LEEWAY = 8 * BOARD_SCALE;
const TICK_MS = 1000 / 60;
const GHOST_SPEED = 2.15 * BOARD_SCALE;
const FRIGHTENED_SPEED = 1.1 * BOARD_SCALE;
const EATEN_SPEED = 3.5 * BOARD_SCALE;

function px(n: number): number {
  return n * BOARD_SCALE;
}
const GHOST_RELEASE_BASE_MS = 1200;
const GHOST_RELEASE_STAGGER_MS = 500;
const GHOST_REENTER_PEN_MS = 1400;
const GHOST_RESET_BASE_MS = 900;
const GHOST_RESET_STAGGER_MS = 400;
/** After a catch, keep every ghost in the pen long enough to answer and move away. */
const AUDIT_JAIL_BASE_MS = 2500;
const AUDIT_JAIL_STAGGER_MS = 600;
const POWER_MS = 8000;

const LOW_SCORE_INKY = 600;
const DOT_SCORE = 10;
const POWER_SCORE = 50;
const GHOST_SCORE = 200;
const CHECKPOINT_SCORE = 100;

/** 0 empty path, 1 wall, 2 dot, 3 question checkpoint, 4 power pellet */
const MAZE_TEMPLATE: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 4, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 4, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 3, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 3, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1],
  [1, 2, 3, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 3, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 3, 2, 2, 1, 2, 2, 2, 2, 3, 2, 2, 2, 2, 1, 2, 2, 3, 1],
  [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 3, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

/** Walkable tiles inside the ghost pen (center col 9 row 10 is a wall). */
const PEN_SLOTS = [
  { col: 8, row: 10 },
  { col: 11, row: 10 },
  { col: 8, row: 11 },
  { col: 11, row: 11 },
] as const;

const GHOST_PEN_SLOT: Record<string, number> = {
  blinky: 0,
  pinky: 1,
  inky: 2,
  clyde: 3,
};

type Dir = 'up' | 'down' | 'left' | 'right' | 'none';
type GhostMode = 'house' | 'scatter' | 'chase' | 'frightened' | 'eaten';
type GamePhase = 'playing' | 'paused' | 'wrong_review' | 'complete' | 'game_over';

const DIR_VEC: Record<Exclude<Dir, 'none'>, { dc: number; dr: number }> = {
  up: { dc: 0, dr: -1 },
  down: { dc: 0, dr: 1 },
  left: { dc: -1, dr: 0 },
  right: { dc: 1, dr: 0 },
};

const OPPOSITE: Record<Exclude<Dir, 'none'>, Dir> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

interface Player {
  x: number;
  y: number;
  dir: Dir;
  nextDir: Dir;
  mouth: number;
}

interface Ghost {
  id: string;
  name: string;
  risk: string;
  color: string;
  emoji: string;
  x: number;
  y: number;
  dir: Dir;
  mode: GhostMode;
  releaseAt: number;
  penEnteredAt: number;
}

interface TileCell {
  base: number;
  hasDot: boolean;
}

interface GameState {
  tiles: TileCell[][];
  player: Player;
  ghosts: Ghost[];
  score: number;
  lives: number;
  section: FinManSectionId;
  phase: GamePhase;
  powerUntil: number;
  visitedCheckpoints: Set<string>;
  running: boolean;
  frame: number;
  /** Active play time (ms) — pauses while MCQ overlays are open. */
  gameTime: number;
}

type OverlayMode = 'none' | 'checkpoint' | 'sec_audit';

interface HudState {
  score: number;
  lives: number;
  section: FinManSectionId;
  sectionName: string;
}

interface TopicBanner {
  index: number;
  total: number;
  title: string;
  brief: string;
  secondsLeft: number;
}

function bannerFor(section: FinManSectionId, index: number, elapsedMs: number): TopicBanner {
  const topics = FIN_MAN_DATA.levels[section].topics;
  const topic = topics[index % topics.length];
  return {
    index: index % topics.length,
    total: topics.length,
    title: topic.title,
    brief: topic.brief,
    secondsLeft: Math.max(1, Math.ceil((TOPIC_READ_MS - elapsedMs) / 1000)),
  };
}

function tileCenter(col: number, row: number) {
  return { x: col * TILE + TILE / 2, y: row * TILE + TILE / 2 };
}

function posToTile(x: number, y: number) {
  return { col: Math.floor(x / TILE), row: Math.floor(y / TILE) };
}

function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(ax - bx, ay - by);
}

function canEnter(tiles: TileCell[][], col: number, row: number): boolean {
  if (TUNNEL_ROWS.has(row)) {
    if (col < 0 || col >= COLS) return true;
  }
  if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return false;
  return tiles[row][col].base !== 1;
}

function wrapCol(col: number): number {
  if (col < 0) return COLS - 1;
  if (col >= COLS) return 0;
  return col;
}

function atTileCenter(x: number, y: number): boolean {
  const cx = Math.floor(x / TILE) * TILE + TILE / 2;
  const cy = Math.floor(y / TILE) * TILE + TILE / 2;
  return Math.abs(x - cx) < px(1.5) && Math.abs(y - cy) < px(1.5);
}

function dirFromKey(code: string): Dir | null {
  if (code === 'ArrowUp' || code === 'KeyW') return 'up';
  if (code === 'ArrowDown' || code === 'KeyS') return 'down';
  if (code === 'ArrowLeft' || code === 'KeyA') return 'left';
  if (code === 'ArrowRight' || code === 'KeyD') return 'right';
  return null;
}

function canTurn(player: Player, nextDir: Dir, tiles: TileCell[][]): boolean {
  if (nextDir === 'none') return false;
  const { col, row } = posToTile(player.x, player.y);
  const { dc, dr } = DIR_VEC[nextDir as Exclude<Dir, 'none'>];
  if (!canEnter(tiles, col + dc, row + dr)) return false;

  if (atTileCenter(player.x, player.y)) return true;

  const center = tileCenter(col, row);
  if (player.dir === 'left' || player.dir === 'right') {
    return Math.abs(player.y - center.y) <= TURN_LEEWAY;
  }
  if (player.dir === 'up' || player.dir === 'down') {
    return Math.abs(player.x - center.x) <= TURN_LEEWAY;
  }
  return false;
}

function alignToCorridor(player: Player): void {
  const { col, row } = posToTile(player.x, player.y);
  const center = tileCenter(col, row);
  if (player.dir === 'up' || player.dir === 'down') {
    player.x = center.x;
  } else if (player.dir === 'left' || player.dir === 'right') {
    player.y = center.y;
  }
}

function applyQueuedDirection(player: Player, tiles: TileCell[][]): void {
  if (player.nextDir === 'none' || player.nextDir === player.dir) return;
  if (!canTurn(player, player.nextDir, tiles)) return;

  const { col, row } = posToTile(player.x, player.y);
  const center = tileCenter(col, row);
  if (player.nextDir === 'up' || player.nextDir === 'down') {
    player.x = center.x;
  } else {
    player.y = center.y;
  }
  player.dir = player.nextDir;
}

function movePlayer(player: Player, speed: number, tiles: TileCell[][]): void {
  if (player.dir === 'none') return;

  const { col, row } = posToTile(player.x, player.y);
  const center = tileCenter(col, row);
  const { dc, dr } = DIR_VEC[player.dir as Exclude<Dir, 'none'>];

  if (player.dir === 'up' || player.dir === 'down') {
    if (Math.abs(player.x - center.x) <= TURN_LEEWAY) player.x = center.x;
  } else {
    if (Math.abs(player.y - center.y) <= TURN_LEEWAY) player.y = center.y;
  }

  const nextCol = col + dc;
  const nextRow = row + dr;

  if (TUNNEL_ROWS.has(row) && dc !== 0) {
    const nextX = player.x + dc * speed;
    if (nextX < TILE / 2) {
      player.x = CANVAS_W - TILE / 2;
      player.y = center.y;
      return;
    }
    if (nextX > CANVAS_W - TILE / 2) {
      player.x = TILE / 2;
      player.y = center.y;
      return;
    }
  }

  if (!canEnter(tiles, nextCol, nextRow)) {
    player.x = center.x;
    player.y = center.y;
    return;
  }

  const nextCenter = tileCenter(
    dc !== 0 ? col + dc : col,
    dr !== 0 ? row + dr : row,
  );
  const nx = player.x + dc * speed;
  const ny = player.y + dr * speed;

  if (dc > 0 && nx >= nextCenter.x) {
    player.x = nextCenter.x;
    player.y = center.y;
  } else if (dc < 0 && nx <= nextCenter.x) {
    player.x = nextCenter.x;
    player.y = center.y;
  } else if (dr > 0 && ny >= nextCenter.y) {
    player.x = center.x;
    player.y = nextCenter.y;
  } else if (dr < 0 && ny <= nextCenter.y) {
    player.x = center.x;
    player.y = nextCenter.y;
  } else {
    player.x = nx;
    player.y = ny;
  }
}

const PICKUP_RADIUS = TILE * 0.55;

function canCollectFromTile(player: Player, col: number, row: number): boolean {
  if (col < 0 || row < 0 || col >= COLS || row >= ROWS) return false;
  const center = tileCenter(col, row);
  return (
    Math.abs(player.x - center.x) <= PICKUP_RADIUS
    && Math.abs(player.y - center.y) <= PICKUP_RADIUS
  );
}

/** Tiles to check for pellets — current tile plus the one ahead along movement. */
function pickupTilesForPlayer(player: Player): { col: number; row: number }[] {
  const { col, row } = posToTile(player.x, player.y);
  const results = [{ col, row }];
  if (player.dir === 'none') return results;

  const { dc, dr } = DIR_VEC[player.dir as Exclude<Dir, 'none'>];
  const center = tileCenter(col, row);
  if (dc !== 0 && Math.abs(player.x - center.x) > TILE * 0.2) {
    results.push({ col: col + dc, row });
  }
  if (dr !== 0 && Math.abs(player.y - center.y) > TILE * 0.2) {
    results.push({ col, row: row + dr });
  }
  return results;
}

function rescuePlayerIfLost(player: Player, tiles: TileCell[][]): void {
  const { col, row } = posToTile(player.x, player.y);
  // Tunnel rows wrap horizontally — don't snap the player while crossing the edge
  if (TUNNEL_ROWS.has(row) && (col < 0 || col >= COLS)) return;
  const oob = row < 0 || row >= ROWS || col < 0 || col >= COLS;
  const inWall = !oob && tiles[row][col].base === 1;
  if (oob || inWall) {
    const start = tileCenter(9, 15);
    player.x = start.x;
    player.y = start.y;
    player.dir = 'left';
    player.nextDir = 'left';
  }
}

function countCheckpoints(): number {
  let n = 0;
  for (const row of MAZE_TEMPLATE) {
    for (const cell of row) {
      if (cell === 3) n++;
    }
  }
  return n;
}

function teachLine(rationale: string): string {
  const sentence = rationale.split(/(?<=\.)\s/)[0] ?? rationale;
  return sentence.length > 180 ? `${sentence.slice(0, 177)}...` : sentence;
}

function buildTiles(): TileCell[][] {
  return MAZE_TEMPLATE.map((row) =>
    row.map((base) => ({
      base,
      hasDot: base === 2 || base === 4,
    })),
  );
}

function penSlotCenter(ghostId: string) {
  const slot = PEN_SLOTS[GHOST_PEN_SLOT[ghostId] ?? 0];
  return tileCenter(slot.col, slot.row);
}

function placeGhostInPen(g: Ghost, gameTime: number, releaseDelayMs: number): void {
  const c = penSlotCenter(g.id);
  g.x = c.x;
  g.y = c.y;
  g.dir = 'up';
  g.mode = 'house';
  g.penEnteredAt = gameTime;
  g.releaseAt = gameTime + releaseDelayMs;
}

function releaseGhostFromPen(g: Ghost, frightened: boolean): void {
  g.mode = frightened ? 'frightened' : 'chase';
  g.dir = 'up';
}

function makeGhosts(gameTime: number): Ghost[] {
  const ghosts: Ghost[] = [
    { id: 'blinky', name: 'Blinky', risk: 'Inflation Risk', color: '#ef4444', emoji: '🔴', x: 0, y: 0, dir: 'up', mode: 'house', releaseAt: 0, penEnteredAt: 0 },
    { id: 'pinky', name: 'Pinky', risk: 'Interest Rate Risk', color: '#f472b6', emoji: '🩷', x: 0, y: 0, dir: 'up', mode: 'house', releaseAt: 0, penEnteredAt: 0 },
    { id: 'inky', name: 'Inky', risk: 'Liquidity Risk', color: '#22d3ee', emoji: '🩵', x: 0, y: 0, dir: 'up', mode: 'house', releaseAt: 0, penEnteredAt: 0 },
    { id: 'clyde', name: 'Clyde', risk: 'Regulatory Risk', color: '#fb923c', emoji: '🟠', x: 0, y: 0, dir: 'up', mode: 'house', releaseAt: 0, penEnteredAt: 0 },
  ];
  ghosts.forEach((g, i) => {
    placeGhostInPen(g, gameTime, GHOST_RELEASE_BASE_MS + i * GHOST_RELEASE_STAGGER_MS);
  });
  return ghosts;
}

function freshState(section: FinManSectionId = '1'): GameState {
  const start = tileCenter(9, 15);
  return {
    tiles: buildTiles(),
    player: { x: start.x, y: start.y, dir: 'left', nextDir: 'left', mouth: 0 },
    ghosts: makeGhosts(0),
    score: 0,
    lives: 3,
    section,
    phase: 'playing',
    powerUntil: 0,
    visitedCheckpoints: new Set(),
    running: true,
    frame: 0,
    gameTime: 0,
  };
}

function validDirs(tiles: TileCell[][], col: number, row: number, forbid?: Dir): Dir[] {
  const out: Dir[] = [];
  for (const d of ['up', 'down', 'left', 'right'] as const) {
    if (forbid && d === forbid) continue;
    const { dc, dr } = DIR_VEC[d];
    const nc = col + dc;
    const nr = row + dr;
    if (canEnter(tiles, nc, nr)) out.push(d);
  }
  return out;
}

function moveEntity(
  x: number,
  y: number,
  dir: Dir,
  speed: number,
  tiles: TileCell[][],
): { x: number; y: number; dir: Dir } {
  if (dir === 'none') return { x, y, dir };

  const player = { x, y, dir, nextDir: dir, mouth: 0 };
  movePlayer(player, speed, tiles);
  return { x: player.x, y: player.y, dir: player.dir };
}

function blinkyTarget(player: Player): { col: number; row: number } {
  return posToTile(player.x, player.y);
}

function pinkyTarget(player: Player): { col: number; row: number } {
  const { col, row } = posToTile(player.x, player.y);
  if (player.dir === 'none') return { col, row };
  const { dc, dr } = DIR_VEC[player.dir as Exclude<Dir, 'none'>];
  return { col: col + dc * 2, row: row + dr * 2 };
}

const CORNERS = [
  { col: 1, row: 1 },
  { col: 17, row: 1 },
  { col: 1, row: 19 },
  { col: 17, row: 19 },
];

function inkyTarget(player: Player, score: number, ghostIndex: number): { col: number; row: number } {
  if (score < LOW_SCORE_INKY) return posToTile(player.x, player.y);
  return CORNERS[ghostIndex % CORNERS.length];
}

function clydeTarget(player: Player, ghost: Ghost): { col: number; row: number } {
  const { col, row } = posToTile(player.x, player.y);
  const g = posToTile(ghost.x, ghost.y);
  if (Math.hypot(g.col - col, g.row - row) > 5) return { col, row };
  return CORNERS[3];
}

function chooseGhostDir(
  ghost: Ghost,
  target: { col: number; row: number },
  tiles: TileCell[][],
  frightened: boolean,
): Dir {
  const { col, row } = posToTile(ghost.x, ghost.y);
  const forbid = ghost.dir !== 'none' ? OPPOSITE[ghost.dir as Exclude<Dir, 'none'>] : undefined;
  const options = validDirs(tiles, col, row, forbid);
  if (options.length === 0) {
    const fallback = validDirs(tiles, col, row);
    return fallback[0] ?? 'left';
  }

  if (frightened) {
    return options[Math.floor(Math.random() * options.length)];
  }

  if (ghost.id === 'clyde' && Math.random() < 0.35) {
    return options[Math.floor(Math.random() * options.length)];
  }

  let best = options[0];
  let bestDist = Infinity;
  for (const d of options) {
    const { dc, dr } = DIR_VEC[d as Exclude<Dir, 'none'>];
    const tc = wrapCol(col + dc);
    const tr = row + dr;
    const d2 = dist(tc, tr, target.col, target.row);
    if (d2 < bestDist) {
      bestDist = d2;
      best = d;
    }
  }
  return best;
}

function resetGhostsToPen(
  ghosts: Ghost[],
  gameTime: number,
  baseMs = GHOST_RESET_BASE_MS,
  staggerMs = GHOST_RESET_STAGGER_MS,
): Ghost[] {
  ghosts.forEach((g, i) => {
    placeGhostInPen(g, gameTime, baseMs + i * staggerMs);
  });
  return ghosts;
}

function dotsRemaining(tiles: TileCell[][]): number {
  let n = 0;
  for (const row of tiles) {
    for (const cell of row) {
      if (cell.hasDot) n++;
    }
  }
  return n;
}

function drawMaze(ctx: CanvasRenderingContext2D, tiles: TileCell[][], frame: number) {
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = tiles[row][col];
      const x = col * TILE;
      const y = row * TILE;

      if (cell.base === 1) {
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(x + 1, y + 1, TILE - 2, TILE - 2);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = px(1.5);
        ctx.strokeRect(x + 2, y + 2, TILE - 4, TILE - 4);
      } else if (cell.base === 3) {
        const cx = x + TILE / 2;
        const cy = y + TILE / 2;
        const gate = px(7);
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(cx, cy - gate);
        ctx.lineTo(cx + gate, cy);
        ctx.lineTo(cx, cy + gate);
        ctx.lineTo(cx - gate, cy);
        ctx.closePath();
        ctx.fill();
      }

      if (cell.hasDot) {
        const cx = x + TILE / 2;
        const cy = y + TILE / 2;
        if (cell.base === 4) {
          const pulse = 0.5 + 0.5 * Math.sin(frame * 0.12);
          ctx.fillStyle = `rgba(251, 191, 36, ${0.55 + pulse * 0.45})`;
          ctx.beginPath();
          ctx.arc(cx, cy, px(5 + pulse * 2), 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#e2e8f0';
          ctx.beginPath();
          ctx.arc(cx, cy, px(2.5), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
}

function drawBull(ctx: CanvasRenderingContext2D, player: Player) {
  const { x, y } = player;
  ctx.save();
  ctx.translate(x, y);
  let rotation = 0;
  if (player.dir === 'right') rotation = 0;
  if (player.dir === 'down') rotation = Math.PI / 2;
  if (player.dir === 'left') rotation = Math.PI;
  if (player.dir === 'up') rotation = -Math.PI / 2;
  ctx.rotate(rotation);

  const r = px(11);
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  const mouth = 0.25 + Math.abs(Math.sin(player.mouth)) * 0.35;
  ctx.arc(0, 0, r, mouth * Math.PI, (2 - mouth) * Math.PI);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = px(1.5);
  ctx.stroke();

  ctx.fillStyle = '#ca8a04';
  ctx.beginPath();
  ctx.moveTo(px(-4), px(-12));
  ctx.lineTo(px(-8), px(-17));
  ctx.lineTo(px(-1), px(-11));
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(px(4), px(-12));
  ctx.lineTo(px(8), px(-17));
  ctx.lineTo(px(1), px(-11));
  ctx.closePath();
  ctx.fill();

  ctx.font = `${px(14)}px Segoe UI Emoji, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🐂', 0, 1);
  ctx.restore();
}

function drawGhost(ctx: CanvasRenderingContext2D, ghost: Ghost, frightened: boolean, flash: boolean) {
  const { x, y } = ghost;
  const bodyColor = frightened
    ? flash ? '#f8fafc' : '#2563eb'
    : ghost.color;

  const gr = px(11);
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.arc(x, y - px(2), gr, Math.PI, 0);
  ctx.lineTo(x + gr, y + px(9));
  for (let i = 0; i < 4; i++) {
    const fx = x + gr - i * px(5.5);
    ctx.lineTo(fx - px(2.75), y + (i % 2 === 0 ? px(12) : px(9)));
  }
  ctx.lineTo(x - gr, y + px(9));
  ctx.closePath();
  ctx.fill();

  if (!frightened || flash) {
    ctx.fillStyle = frightened ? '#1e3a8a' : '#fff';
    ctx.beginPath();
    ctx.arc(x - px(4), y - px(2), px(3), 0, Math.PI * 2);
    ctx.arc(x + px(4), y - px(2), px(3), 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = frightened ? '#fff' : '#1e40af';
    ctx.beginPath();
    ctx.arc(x - px(4), y - px(2), px(1.5), 0, Math.PI * 2);
    ctx.arc(x + px(4), y - px(2), px(1.5), 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.strokeStyle = '#bfdbfe';
    ctx.lineWidth = px(1.5);
    ctx.beginPath();
    ctx.moveTo(x - px(5), y - px(1));
    ctx.lineTo(x - px(2), y + px(1));
    ctx.lineTo(x - px(5), y + px(3));
    ctx.moveTo(x + px(5), y - px(1));
    ctx.lineTo(x + px(2), y + px(1));
    ctx.lineTo(x + px(5), y + px(3));
    ctx.stroke();
  }

  ctx.font = `${px(11)}px Segoe UI Emoji, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0f172a';
  ctx.fillText(ghost.emoji, x, y - px(14));
}

export default function FinMan() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(freshState());
  const keysRef = useRef<Record<string, boolean>>({});
  const lastInputDirRef = useRef<Dir>('left');
  const bannerFlushRef = useRef(0);
  const topicIndexRef = useRef(0);
  const topicClockRef = useRef(0);
  const reviewActiveRef = useRef(false);
  const onMazeClearedRef = useRef<() => void>(() => {});
  const answeredIdsRef = useRef<string[]>([]);
  const notesBodyRef = useRef<HTMLDivElement>(null);
  const notesPopRef = useRef<Window | null>(null);
  const overlayRef = useRef<OverlayMode>('none');
  const pendingSecAuditRef = useRef(false);
  const wrongLoseLifeRef = useRef(false);
  const wasFrightenedRef = useRef(false);
  const swipeOriginRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const sounds = useMemo(() => getFinManSounds(), []);

  const [hud, setHud] = useState<HudState>({
    score: 0,
    lives: 3,
    section: '1',
    sectionName: FIN_MAN_DATA.levels['1'].name,
  });
  const [topicBanner, setTopicBanner] = useState<TopicBanner>(() => bannerFor('1', 0, 0));
  const [overlay, setOverlay] = useState<OverlayMode>('none');
  const [lessons, setLessons] = useState<StudyLesson[]>([]);
  const [notesWidth, setNotesWidth] = useState(360);
  const [notesOpen, setNotesOpen] = useState(() => (
    window.matchMedia('(min-width: 1401px) and (hover: hover) and (pointer: fine)').matches
  ));
  const [notesPopped, setNotesPopped] = useState(false);
  const [retention, setRetention] = useState<FinManQuestion[] | null>(null);
  const [retentionIndex, setRetentionIndex] = useState(0);
  const [retentionPick, setRetentionPick] = useState<number | null>(null);
  const [retentionScore, setRetentionScore] = useState(0);
  const [retentionSummary, setRetentionSummary] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<FinManQuestion | null>(null);
  const [overlayTitle, setOverlayTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [wrongReview, setWrongReview] = useState(false);
  const [wrongBorder, setWrongBorder] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [gameMsg, setGameMsg] = useState('');
  const [endPhase, setEndPhase] = useState<'none' | 'game_over' | 'complete'>('none');

  const syncHud = useCallback((s: GameState) => {
    setHud({
      score: s.score,
      lives: s.lives,
      section: s.section,
      sectionName: FIN_MAN_DATA.levels[s.section].name,
    });
  }, []);

  const pauseForQuestion = useCallback((mode: OverlayMode, question: FinManQuestion, title: string) => {
    const s = stateRef.current;
    s.phase = 'paused';
    s.running = false;
    sounds.stopFrightenedSiren();
    overlayRef.current = mode;
    setOverlay(mode);
    setActiveQuestion(question);
    setOverlayTitle(title);
    setSelectedOption(null);
    setWrongReview(false);
    const topic = topicById(s.section, question.topicId);
    if (topic) {
      const topics = FIN_MAN_DATA.levels[s.section].topics;
      const idx = topics.findIndex((item) => item.id === topic.id);
      if (idx >= 0) {
        topicIndexRef.current = idx;
        topicClockRef.current = 0;
        setTopicBanner(bannerFor(s.section, idx, 0));
      }
    }
    if (mode === 'checkpoint') sounds.playCheckpoint();
    if (mode === 'sec_audit') sounds.playDeath();
  }, [sounds]);

  const continueAfterWrong = useCallback(() => {
    const s = stateRef.current;
    const loseLife = wrongLoseLifeRef.current;

    setWrongBorder(false);
    setWrongReview(false);
    setOverlay('none');
    setActiveQuestion(null);
    setSelectedOption(null);
    setStatusMsg('');
    overlayRef.current = 'none';
    pendingSecAuditRef.current = false;
    wrongLoseLifeRef.current = false;

    if (loseLife) {
      s.lives -= 1;
      if (s.lives <= 0) {
        s.phase = 'game_over';
        s.running = false;
        setEndPhase('game_over');
        setGameMsg('Game Over — review weak sections and try again.');
      } else {
        resetGhostsToPen(s.ghosts, s.gameTime, AUDIT_JAIL_BASE_MS, AUDIT_JAIL_STAGGER_MS);
        s.phase = 'playing';
        s.running = true;
        setGameMsg('SEC Audit failed — life lost. Ghosts reset.');
      }
    } else {
      s.phase = 'playing';
      s.running = true;
      setGameMsg('Back to the maze — good luck!');
    }
    syncHud(s);
    requestAnimationFrame(() => canvasRef.current?.focus());
  }, [syncHud]);

  const startWrongReview = useCallback((question: FinManQuestion, picked: number, loseLife: boolean) => {
    const s = stateRef.current;
    s.phase = 'wrong_review';
    s.running = false;
    wrongLoseLifeRef.current = loseLife;
    setWrongReview(true);
    setWrongBorder(true);
    setSelectedOption(picked);
    setStatusMsg(question.rationale);
    sounds.playWrong();
  }, [sounds]);

  const addLesson = useCallback((question: FinManQuestion, correct: boolean, source: 'maze' | 'retention') => {
    if (source === 'maze' && !answeredIdsRef.current.includes(question.id)) {
      answeredIdsRef.current.push(question.id);
    }
    const lesson = lessonForQuestion(question.id, correct, source);
    if (!lesson) return;
    setLessons((prev) => (prev.some((item) => item.key === lesson.key) ? prev : [...prev, lesson]));
  }, []);

  const handleAnswer = useCallback((index: number) => {
    const s = stateRef.current;
    const q = activeQuestion;
    if (!q || wrongReview || s.phase !== 'paused') return;

    if (index === q.correct) {
      sounds.playCorrect();
      addLesson(q, true, 'maze');
      if (overlayRef.current === 'sec_audit') {
        resetGhostsToPen(s.ghosts, s.gameTime, AUDIT_JAIL_BASE_MS, AUDIT_JAIL_STAGGER_MS);
        setGameMsg('SEC Audit passed — life saved! Risks stay in the pen.');
      } else {
        s.score += CHECKPOINT_SCORE;
        setGameMsg(`Checkpoint cleared. ${teachLine(q.rationale)}`);
      }
      s.phase = 'playing';
      s.running = true;
      overlayRef.current = 'none';
      pendingSecAuditRef.current = false;
      setOverlay('none');
      setActiveQuestion(null);
      setSelectedOption(null);
      syncHud(s);
      return;
    }

    addLesson(q, false, 'maze');
    startWrongReview(q, index, overlayRef.current === 'sec_audit');
  }, [activeQuestion, wrongReview, startWrongReview, syncHud, sounds, addLesson]);

  const advanceSection = useCallback((s: GameState) => {
    const idx = FIN_MAN_SECTIONS.indexOf(s.section);
    if (idx < FIN_MAN_SECTIONS.length - 1) {
      s.section = FIN_MAN_SECTIONS[idx + 1];
      s.tiles = buildTiles();
      s.visitedCheckpoints = new Set();
      resetMazeQuestions();
      const start = tileCenter(9, 15);
      s.player = { x: start.x, y: start.y, dir: 'left', nextDir: 'left', mouth: 0 };
      s.ghosts = makeGhosts(s.gameTime);
      setGameMsg(`Section complete! Entering: ${FIN_MAN_DATA.levels[s.section].name}`);
    } else {
      s.phase = 'complete';
      s.running = false;
      setEndPhase('complete');
      setGameMsg('FIN-MAN complete! You cleared all four SIE sections.');
    }
    syncHud(s);
  }, [syncHud]);

  const finishSection = useCallback(() => {
    const s = stateRef.current;
    advanceSection(s);
    topicIndexRef.current = 0;
    topicClockRef.current = 0;
    if (s.phase !== 'complete') {
      s.phase = 'playing';
      s.running = true;
      setTopicBanner(bannerFor(s.section, 0, 0));
    }
  }, [advanceSection]);

  const completeRetention = useCallback(() => {
    reviewActiveRef.current = false;
    setRetention(null);
    setRetentionSummary(false);
    setRetentionPick(null);
    answeredIdsRef.current = [];
    finishSection();
  }, [finishSection]);

  const startGame = useCallback(() => {
    wrongLoseLifeRef.current = false;
    resetMazeQuestions();
    const s = freshState('1');
    stateRef.current = s;
    overlayRef.current = 'none';
    pendingSecAuditRef.current = false;
    reviewActiveRef.current = false;
    answeredIdsRef.current = [];
    topicIndexRef.current = 0;
    topicClockRef.current = 0;
    setRetention(null);
    setRetentionSummary(false);
    setRetentionPick(null);
    setTopicBanner(bannerFor('1', 0, 0));
    setOverlay('none');
    setActiveQuestion(null);
    setWrongReview(false);
    setWrongBorder(false);
    setSelectedOption(null);
    setStatusMsg('');
    setGameMsg('Swipe the maze, or use arrow keys / WASD. Each subject stays up for 20 seconds.');
    setEndPhase('none');
    syncHud(s);
    sounds.unlock();
    sounds.playGameStart();
    requestAnimationFrame(() => canvasRef.current?.focus());
  }, [syncHud, sounds]);

  onMazeClearedRef.current = () => {
    const s = stateRef.current;
    if (reviewActiveRef.current || overlayRef.current !== 'none') return;
    s.running = false;
    s.phase = 'paused';
    const quiz = retentionQuiz(s.section, answeredIdsRef.current, 5);
    if (quiz.length === 0) {
      answeredIdsRef.current = [];
      finishSection();
      return;
    }
    reviewActiveRef.current = true;
    setRetention(quiz);
    setRetentionIndex(0);
    setRetentionPick(null);
    setRetentionScore(0);
    setRetentionSummary(false);
    setGameMsg('Section clear. A short retention check is next, using different questions on the same ideas.');
  };

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    const movementKeys = new Set([
      'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
      'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space',
    ]);

    const onDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;
      if (movementKeys.has(e.code)) e.preventDefault();
      sounds.unlock();

      const dir = dirFromKey(e.code);
      if (dir) {
        lastInputDirRef.current = dir;
        const s = stateRef.current;
        if (s.running && s.phase === 'playing') {
          s.player.nextDir = dir;
          applyQueuedDirection(s.player, s.tiles);
        }
      }
    };
    const onUp = (e: KeyboardEvent) => { keysRef.current[e.code] = false; };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [sounds]);

  useEffect(() => {
    const body = notesBodyRef.current;
    if (!body) return;
    body.scrollTop = body.scrollHeight;
  }, [lessons]);

  useEffect(() => {
    const popup = notesPopRef.current;
    if (!popup || popup.closed) return;
    popup.document.open();
    popup.document.write(notesDocument(lessons));
    popup.document.close();
  }, [lessons]);

  useEffect(() => {
    if (!notesPopped) return;
    const watch = window.setInterval(() => {
      if (!notesPopRef.current || notesPopRef.current.closed) {
        notesPopRef.current = null;
        setNotesPopped(false);
        setNotesOpen(true);
      }
    }, 400);
    return () => window.clearInterval(watch);
  }, [notesPopped]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let lastTick = performance.now();

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const elapsed = now - lastTick;
      if (elapsed < TICK_MS - 1) return;
      lastTick = now;

      const s = stateRef.current;
      if (s.running && s.phase === 'playing') {
        s.gameTime += elapsed;
        const topics = FIN_MAN_DATA.levels[s.section].topics;
        topicClockRef.current += elapsed;
        if (topicClockRef.current >= TOPIC_READ_MS) {
          topicClockRef.current = 0;
          topicIndexRef.current = (topicIndexRef.current + 1) % topics.length;
        }
        if (now - bannerFlushRef.current > 200) {
          bannerFlushRef.current = now;
          setTopicBanner(bannerFor(s.section, topicIndexRef.current, topicClockRef.current));
        }
      }

      if (!s.running) {
        drawMaze(ctx, s.tiles, s.frame);
        drawBull(ctx, s.player);
        for (const g of s.ghosts) {
          const frightened = s.powerUntil > s.gameTime && g.mode !== 'eaten';
          drawGhost(ctx, g, frightened, Math.floor(s.frame / 8) % 2 === 0);
        }
        return;
      }

      const keys = keysRef.current;
      const anyMoveKey =
        keys.ArrowUp || keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight
        || keys.KeyW || keys.KeyA || keys.KeyS || keys.KeyD;
      if (anyMoveKey) {
        s.player.nextDir = lastInputDirRef.current;
      }

      applyQueuedDirection(s.player, s.tiles);

      if (s.player.dir === 'none' && s.player.nextDir !== 'none') {
        s.player.dir = s.player.nextDir;
        alignToCorridor(s.player);
      }

      movePlayer(s.player, PLAYER_SPEED, s.tiles);
      rescuePlayerIfLost(s.player, s.tiles);
      s.player.mouth += 0.35;

      const checkedTiles = new Set<string>();
      for (const { col, row } of pickupTilesForPlayer(s.player)) {
        const key = `${col},${row}`;
        if (checkedTiles.has(key) || !canCollectFromTile(s.player, col, row)) continue;
        checkedTiles.add(key);

        const cell = s.tiles[row]?.[col];
        if (cell?.hasDot) {
          cell.hasDot = false;
          if (cell.base === 4) {
            s.score += POWER_SCORE;
            s.powerUntil = s.gameTime + POWER_MS;
            for (const g of s.ghosts) {
              if (g.mode !== 'eaten' && g.mode !== 'house') g.mode = 'frightened';
            }
            sounds.playPowerPellet();
            setGameMsg('Power Pellet! Market risks are vulnerable.');
          } else {
            s.score += DOT_SCORE;
            sounds.playWaka();
          }
        }

        if (cell?.base === 3) {
          const cpKey = `${col},${row}`;
          if (!s.visitedCheckpoints.has(cpKey)) {
            s.visitedCheckpoints.add(cpKey);
            const drawn = drawFinManQuestion(s.section);
            const topicLabel = drawn.question.topicTitle ? ` — ${drawn.question.topicTitle}` : '';
            pauseForQuestion(
              'checkpoint',
              drawn.question,
              `Checkpoint ${s.visitedCheckpoints.size}/${countCheckpoints()}${topicLabel} · ${drawn.position} of ${drawn.total}`,
            );
          }
        }
      }

      const frightenedActive = s.powerUntil > s.gameTime;
      if (wasFrightenedRef.current && !frightenedActive) {
        sounds.stopFrightenedSiren();
      }
      wasFrightenedRef.current = frightenedActive;

      for (let i = 0; i < s.ghosts.length; i++) {
        const g = s.ghosts[i];
        if (g.mode === 'house') {
          if (s.gameTime >= g.releaseAt) {
            releaseGhostFromPen(g, frightenedActive);
          } else {
            continue;
          }
        }

        if (g.mode === 'eaten') {
          const pen = penSlotCenter(g.id);
          const dx = pen.x - g.x;
          const dy = pen.y - g.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < TILE * 0.5) {
            placeGhostInPen(g, s.gameTime, GHOST_REENTER_PEN_MS);
            continue;
          }
          g.x += (dx / d) * EATEN_SPEED;
          g.y += (dy / d) * EATEN_SPEED;
          continue;
        }

        if (frightenedActive) g.mode = 'frightened';
        else if (g.mode === 'frightened') g.mode = 'chase';

        if (atTileCenter(g.x, g.y)) {
          let target = posToTile(s.player.x, s.player.y);
          if (frightenedActive) {
            target = { col: COLS - 1 - target.col, row: ROWS - 1 - target.row };
          } else if (g.id === 'blinky') target = blinkyTarget(s.player);
          else if (g.id === 'pinky') target = pinkyTarget(s.player);
          else if (g.id === 'inky') target = inkyTarget(s.player, s.score, i);
          else target = clydeTarget(s.player, g);

          g.dir = chooseGhostDir(g, target, s.tiles, frightenedActive);
        }

        const speed = frightenedActive ? FRIGHTENED_SPEED : GHOST_SPEED;
        const gStep = moveEntity(g.x, g.y, g.dir, speed, s.tiles);
        g.x = gStep.x;
        g.y = gStep.y;
        g.dir = gStep.dir;

        if (dist(g.x, g.y, s.player.x, s.player.y) < TILE * 0.55) {
          if (frightenedActive) {
            placeGhostInPen(g, s.gameTime, GHOST_REENTER_PEN_MS);
            s.score += GHOST_SCORE;
            sounds.playEatGhost();
            setGameMsg(`${g.risk} sent back to the pen (+${GHOST_SCORE})`);
          } else if (!pendingSecAuditRef.current && overlayRef.current === 'none') {
            resetGhostsToPen(s.ghosts, s.gameTime, AUDIT_JAIL_BASE_MS, AUDIT_JAIL_STAGGER_MS);
            pendingSecAuditRef.current = true;
            s.running = false;
            const drawn = drawFinManQuestion(s.section);
            const topicLabel = drawn.question.topicTitle ? ` — ${drawn.question.topicTitle}` : '';
            pauseForQuestion(
              'sec_audit',
              drawn.question,
              `SEC Audit — Save Your Life!${topicLabel} · ${drawn.position} of ${drawn.total}`,
            );
            break;
          }
        }
      }

      if (dotsRemaining(s.tiles) === 0 && overlayRef.current === 'none' && !reviewActiveRef.current) {
        onMazeClearedRef.current();
      }

      s.frame += 1;
      if (s.frame % 15 === 0) syncHud(s);

      drawMaze(ctx, s.tiles, s.frame);
      drawBull(ctx, s.player);
      for (const g of s.ghosts) {
        const fright = frightenedActive && g.mode !== 'eaten';
        drawGhost(ctx, g, fright, Math.floor(s.frame / 8) % 2 === 0);
      }
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pauseForQuestion, syncHud, sounds]);

  const queueDirection = useCallback((dir: Dir) => {
    lastInputDirRef.current = dir;
    const s = stateRef.current;
    if (s.running && s.phase === 'playing') {
      s.player.nextDir = dir;
      applyQueuedDirection(s.player, s.tiles);
    }
  }, []);

  const onCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    sounds.unlock();
    canvasRef.current?.focus();
    if (e.pointerType === 'mouse') return;
    swipeOriginRef.current = { x: e.clientX, y: e.clientY, pointerId: e.pointerId };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* Swipe still follows pointermove while the finger is on the maze. */
    }
  };

  const onCanvasPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const origin = swipeOriginRef.current;
    if (!origin || origin.pointerId !== e.pointerId) return;
    const dx = e.clientX - origin.x;
    const dy = e.clientY - origin.y;
    if (Math.hypot(dx, dy) < 24) return;
    const dir: Dir = Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? 'right' : 'left')
      : (dy > 0 ? 'down' : 'up');
    queueDirection(dir);
    origin.x = e.clientX;
    origin.y = e.clientY;
  };

  const endCanvasSwipe = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (swipeOriginRef.current?.pointerId === e.pointerId) swipeOriginRef.current = null;
  };

  const openNotesWindow = () => {
    const popup = window.open('', 'finman-learned', 'popup=yes,width=560,height=780,resizable=yes');
    if (!popup) {
      setGameMsg('Allow pop-up windows to break the notes out of the game.');
      return;
    }
    notesPopRef.current = popup;
    popup.document.open();
    popup.document.write(notesDocument(lessons));
    popup.document.close();
    setNotesPopped(true);
    setNotesOpen(false);
  };

  const dockNotes = () => {
    if (notesPopRef.current && !notesPopRef.current.closed) notesPopRef.current.close();
    notesPopRef.current = null;
    setNotesPopped(false);
    setNotesOpen(true);
  };

  const startNotesResize = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const panel = event.currentTarget.parentElement;
    if (!panel) return;
    const right = panel.getBoundingClientRect().right;
    const move = (ev: PointerEvent) => {
      const next = Math.min(720, Math.max(280, right - ev.clientX));
      setNotesWidth(next);
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const answerRetention = (index: number) => {
    if (!retention || retentionPick !== null || retentionSummary) return;
    const question = retention[retentionIndex];
    const correct = index === question.correct;
    setRetentionPick(index);
    if (correct) setRetentionScore((score) => score + 1);
    addLesson(question, correct, 'retention');
  };

  const nextRetention = () => {
    if (!retention) return;
    if (retentionIndex + 1 >= retention.length) {
      setRetentionSummary(true);
      return;
    }
    setRetentionIndex((index) => index + 1);
    setRetentionPick(null);
  };

  const retentionQuestion = retention && !retentionSummary ? retention[retentionIndex] : null;

  return (
    <div className={`page finman-page ${notesOpen && !notesPopped ? '' : 'notes-closed'} ${notesPopped ? 'notes-popped' : ''}`}>
      <div className="finman-workspace">
      <div className="finman-play">
      <h1>FIN-MAN</h1>
      <p className="subtitle">Same maze and ghosts. Subject cards stay up for 20 seconds. Each checkpoint is a new question from the full practice bank.</p>

      <div className={`finman-container ${wrongBorder ? 'finman-wrong' : ''}`}>
        <div className="finman-hud">
          <span>Score: {hud.score}</span>
          <span>Lives: {hud.lives}</span>
          <span>Section {hud.section}: {hud.sectionName}</span>
          <button type="button" className="btn btn-sm finman-new" onClick={startGame}>New Game</button>
        </div>

        <div id="flashcard-banner" className="finman-flashcard-banner" aria-live="polite">
          <div className="finman-topic-meta">
            <span>Subject {topicBanner.index + 1} of {topicBanner.total}</span>
            <span>{topicBanner.secondsLeft}s</span>
          </div>
          <strong>{topicBanner.title}</strong>
          <p>{topicBanner.brief}</p>
          <div className="finman-topic-track" aria-hidden="true">
            <div
              className="finman-topic-fill"
              style={{ width: `${((20 - topicBanner.secondsLeft) / 20) * 100}%` }}
            />
          </div>
        </div>

        <div className="finman-stage">
          <div className="finman-board">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="finman-canvas"
            tabIndex={0}
            aria-label="FIN-MAN maze. Swipe to turn, or use the keyboard."
            onPointerDown={onCanvasPointerDown}
            onPointerMove={onCanvasPointerMove}
            onPointerUp={endCanvasSwipe}
            onPointerCancel={endCanvasSwipe}
          />

          {overlay !== 'none' && activeQuestion && (
            <div className="finman-overlay" role="dialog" aria-modal="true">
              <div className="finman-modal card">
                <h2>{overlayTitle}</h2>
                {(() => {
                  const matched = topicById(stateRef.current.section, activeQuestion.topicId);
                  const cardTopic = activeQuestion.topicTitle || matched?.title;
                  const cardNote = activeQuestion.studyNote || matched?.brief;
                  if (!cardTopic && !cardNote) return null;
                  return (
                    <p className="finman-brief">
                      {cardTopic && <strong>{cardTopic}. </strong>}
                      {cardNote}
                    </p>
                  );
                })()}
                <p className="finman-question">{activeQuestion.text}</p>
                <div className="finman-options">
                  {activeQuestion.opts.map((opt, i) => {
                    let cls = 'finman-option';
                    if (wrongReview) {
                      if (i === activeQuestion.correct) cls += ' finman-option-correct';
                      else if (i === selectedOption) cls += ' finman-option-wrong';
                    }
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={cls}
                        disabled={wrongReview}
                        onClick={() => handleAnswer(i)}
                      >
                        <span className="finman-opt-key">{String.fromCharCode(65 + i)}.</span> {opt}
                      </button>
                    );
                  })}
                </div>
                {wrongReview && (
                  <>
                    <p className="finman-rationale"><strong>Rationale:</strong> {activeQuestion.rationale}</p>
                    <p className="finman-read-timer">Take your time — tap Continue when you&apos;re ready.</p>
                    <button
                      type="button"
                      className="btn btn-primary finman-continue"
                      onClick={continueAfterWrong}
                    >
                      Continue
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {retention && overlay === 'none' && (
            <div className="finman-overlay" role="dialog" aria-modal="true">
              <div className="finman-modal card">
                {retentionSummary ? (
                  <>
                    <h2>Retention check</h2>
                    <p className="finman-question">
                      You kept {retentionScore} of {retention.length}. The write-ups are in What you learned.
                    </p>
                    <button type="button" className="btn btn-primary finman-continue" onClick={completeRetention}>
                      Continue
                    </button>
                  </>
                ) : retentionQuestion && (
                  <>
                    <h2>Retention check · {retentionIndex + 1} of {retention.length}</h2>
                    <p className="finman-brief">
                      <strong>{retentionQuestion.topicTitle}. </strong>
                      A new question on an idea you just practiced.
                    </p>
                    <p className="finman-question">{retentionQuestion.text}</p>
                    <div className="finman-options">
                      {retentionQuestion.opts.map((opt, i) => {
                        let cls = 'finman-option';
                        if (retentionPick !== null) {
                          if (i === retentionQuestion.correct) cls += ' finman-option-correct';
                          else if (i === retentionPick) cls += ' finman-option-wrong';
                        }
                        return (
                          <button
                            key={`${retentionQuestion.id}-${i}`}
                            type="button"
                            className={cls}
                            disabled={retentionPick !== null}
                            onClick={() => answerRetention(i)}
                          >
                            <span className="finman-opt-key">{String.fromCharCode(65 + i)}.</span> {opt}
                          </button>
                        );
                      })}
                    </div>
                    {retentionPick !== null && (
                      <>
                        <p className="finman-rationale"><strong>Rationale:</strong> {retentionQuestion.rationale}</p>
                        <button type="button" className="btn btn-primary finman-continue" onClick={nextRetention}>
                          {retentionIndex + 1 >= retention.length ? 'See result' : 'Next'}
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {endPhase !== 'none' && overlay === 'none' && !retention && (
            <div className="finman-end-overlay">
              <p>{gameMsg}</p>
              <button type="button" className="btn btn-primary" onClick={startGame}>Play Again</button>
            </div>
          )}
          </div>
        </div>

        {statusMsg && !wrongReview && <p className="finman-status">{statusMsg}</p>}
        {gameMsg && <p className="finman-feedback">{gameMsg}</p>}
      </div>

      <div className="card finman-legend">
        <p><strong>Ghosts:</strong> 🔴 Inflation (direct chase) · 🩷 Interest Rate (intercept) · 🩵 Liquidity (corner patrol when ahead) · 🟠 Regulatory (chaotic). A catch sends every ghost back to the pen before the question. Eating one sends that ghost straight to the pen.</p>
        <p><strong>Subjects:</strong> The bar above the maze holds each outline topic for 20 seconds, then moves to the next. Clearing a section opens a short retention check made of different questions on the ideas you just answered. What you learned, on the right, writes those items up like a study chapter. Drag its edge to resize it, or open it in its own window.</p>
        <p><strong>Checkpoints:</strong> {countCheckpoints()} gold gateways per section. Each one deals a different question from that section’s practice bank ({sectionPoolSize('1')} + {sectionPoolSize('2')} + {sectionPoolSize('3')} + {sectionPoolSize('4')} items, {sectionPoolSize('1') + sectionPoolSize('2') + sectionPoolSize('3') + sectionPoolSize('4')} total). The 75-question practice exam is drawn from this same bank. A question stays out until the rest of its section has been asked. The subject cards above the maze still teach each outline topic.</p>
        <p><strong>Controls:</strong> On a keyboard, arrow keys or WASD. On a tablet, swipe the maze. Power pellets turn every ghost blue. Touching a blue ghost sends it to the pen. Checkpoints and SEC audits pause for questions.</p>
        <p><strong>Sound:</strong> Classic arcade waka-waka, power pellet, ghost, and death effects — tap the maze or press a key once to enable audio.</p>
        <button type="button" className="btn" onClick={startGame}>New Game</button>
      </div>
      </div>

      {notesPopped ? (
        <aside className="finman-notes-dock">
          <p>What you learned is open in its own window.</p>
          <button type="button" className="btn btn-sm" onClick={() => notesPopRef.current?.focus()}>Show window</button>
          <button type="button" className="btn btn-sm" onClick={dockNotes}>Dock</button>
        </aside>
      ) : notesOpen && (
        <aside className="finman-learned is-open" style={{ width: notesWidth }} aria-label="What you learned">
          <div
            className="finman-learned-resize"
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize notes"
            onPointerDown={startNotesResize}
          />
          <header className="finman-learned-head">
            <h2>What you learned</h2>
            <div className="finman-learned-actions">
              <button type="button" className="btn btn-sm" onClick={openNotesWindow}>Open in a window</button>
              <button type="button" className="btn btn-sm" onClick={() => setNotesOpen(false)}>Hide</button>
            </div>
          </header>
          <div className="finman-learned-body" ref={notesBodyRef}>
            {lessons.length === 0 ? (
              <p className="finman-learned-empty">
                Answer a checkpoint or an SEC audit. Each one is written up here, in plain study-book language, and kept for this session.
              </p>
            ) : lessons.map((lesson) => (
              <article key={lesson.key} className="finman-lesson">
                <p className="finman-lesson-kicker">{lesson.kicker}</p>
                <h3>{lesson.heading}</h3>
                {lesson.paragraphs.map((paragraph, index) => (
                  <p key={`${lesson.key}-${index}`}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </aside>
      )}
      </div>
      <button type="button" className="finman-notes-tab" onClick={dockNotes}>
        What you learned
      </button>
    </div>
  );
}