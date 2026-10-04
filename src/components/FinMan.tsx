import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FIN_MAN_DATA,
  FIN_MAN_SECTIONS,
  type FinManQuestion,
  type FinManSectionId,
} from '../data/finManData';
import { getFinManSounds } from '../lib/finManSounds';

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

function pickSectionQuestion(section: FinManSectionId, seed: number): FinManQuestion {
  const questions = FIN_MAN_DATA.levels[section].questions;
  return questions[Math.abs(seed) % questions.length];
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

function releaseGhostFromPen(g: Ghost): void {
  g.mode = 'chase';
  g.dir = 'up';
}

function scatterGhosts(ghosts: Ghost[]): void {
  const corners = [
    tileCenter(1, 1),
    tileCenter(17, 1),
    tileCenter(1, 19),
    tileCenter(17, 19),
  ];
  ghosts.forEach((g, i) => {
    const c = corners[i % corners.length];
    g.x = c.x;
    g.y = c.y;
    g.dir = i % 2 === 0 ? 'right' : 'left';
    g.mode = 'chase';
  });
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

function resetGhostsToPen(ghosts: Ghost[], gameTime: number): Ghost[] {
  ghosts.forEach((g, i) => {
    placeGhostInPen(g, gameTime, GHOST_RESET_BASE_MS + i * GHOST_RESET_STAGGER_MS);
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
  const bannerPendingRef = useRef('');
  const bannerFlushRef = useRef(0);
  const overlayRef = useRef<OverlayMode>('none');
  const pendingSecAuditRef = useRef(false);
  const wrongLoseLifeRef = useRef(false);
  const wasFrightenedRef = useRef(false);
  const sounds = useMemo(() => getFinManSounds(), []);

  const [hud, setHud] = useState<HudState>({
    score: 0,
    lives: 3,
    section: '1',
    sectionName: FIN_MAN_DATA.levels['1'].name,
  });
  const [flashcardBanner, setFlashcardBanner] = useState('Eat pellets to reveal SIE flashcards…');
  const [overlay, setOverlay] = useState<OverlayMode>('none');
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
    wrongLoseLifeRef.current = false;

    if (loseLife) {
      s.lives -= 1;
      if (s.lives <= 0) {
        s.phase = 'game_over';
        s.running = false;
        setEndPhase('game_over');
        setGameMsg('Game Over — review weak sections and try again.');
      } else {
        resetGhostsToPen(s.ghosts, s.gameTime);
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

  const handleAnswer = useCallback((index: number) => {
    const s = stateRef.current;
    const q = activeQuestion;
    if (!q || wrongReview || s.phase !== 'paused') return;

    if (index === q.correct) {
      sounds.playCorrect();
      if (overlayRef.current === 'sec_audit') {
        scatterGhosts(s.ghosts);
        setGameMsg('SEC Audit passed — life saved!');
      } else {
        s.score += CHECKPOINT_SCORE;
        setGameMsg('Checkpoint cleared!');
      }
      s.phase = 'playing';
      s.running = true;
      overlayRef.current = 'none';
      setOverlay('none');
      setActiveQuestion(null);
      setSelectedOption(null);
      syncHud(s);
      return;
    }

    startWrongReview(q, index, overlayRef.current === 'sec_audit');
  }, [activeQuestion, wrongReview, startWrongReview, syncHud, sounds]);

  const advanceSection = useCallback((s: GameState) => {
    const idx = FIN_MAN_SECTIONS.indexOf(s.section);
    if (idx < FIN_MAN_SECTIONS.length - 1) {
      s.section = FIN_MAN_SECTIONS[idx + 1];
      s.tiles = buildTiles();
      s.visitedCheckpoints = new Set();
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

  const startGame = useCallback(() => {
    wrongLoseLifeRef.current = false;
    const s = freshState('1');
    stateRef.current = s;
    overlayRef.current = 'none';
    pendingSecAuditRef.current = false;
    setOverlay('none');
    setActiveQuestion(null);
    setWrongReview(false);
    setWrongBorder(false);
    setSelectedOption(null);
    setStatusMsg('');
    setGameMsg('Use arrow keys or WASD. Eat dots, hit checkpoints, dodge market risks!');
    setFlashcardBanner('Eat pellets to reveal SIE flashcards…');
    setEndPhase('none');
    syncHud(s);
    sounds.unlock();
    sounds.playGameStart();
    requestAnimationFrame(() => canvasRef.current?.focus());
  }, [syncHud, sounds]);

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
      }

      if (!s.running) {
        drawMaze(ctx, s.tiles, s.frame);
        drawBull(ctx, s.player);
        for (const g of s.ghosts) {
          const frightened = s.powerUntil > now && g.mode !== 'eaten' && g.mode !== 'house';
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
            s.powerUntil = now + POWER_MS;
            for (const g of s.ghosts) {
              if (g.mode !== 'eaten' && g.mode !== 'house') g.mode = 'frightened';
            }
            sounds.playPowerPellet();
            setGameMsg('Power Pellet! Market risks are vulnerable.');
          } else {
            s.score += DOT_SCORE;
            sounds.playWaka();
          }
          const cards = FIN_MAN_DATA.levels[s.section].flashcards;
          const card = cards[Math.floor(Math.random() * cards.length)];
          bannerPendingRef.current = `${card.term}: ${card.def}`;
          if (now - bannerFlushRef.current > 200) {
            bannerFlushRef.current = now;
            setFlashcardBanner(bannerPendingRef.current);
          }
        }

        if (cell?.base === 3) {
          const cpKey = `${col},${row}`;
          if (!s.visitedCheckpoints.has(cpKey)) {
            s.visitedCheckpoints.add(cpKey);
            const questions = FIN_MAN_DATA.levels[s.section].questions;
            const q = questions[s.visitedCheckpoints.size % questions.length];
            pauseForQuestion('checkpoint', q, `Question Checkpoint (${s.visitedCheckpoints.size}/${countCheckpoints()})`);
          }
        }
      }

      const frightenedActive = s.powerUntil > now;
      if (wasFrightenedRef.current && !frightenedActive) {
        sounds.stopFrightenedSiren();
      }
      wasFrightenedRef.current = frightenedActive;

      for (let i = 0; i < s.ghosts.length; i++) {
        const g = s.ghosts[i];
        if (g.mode === 'house') {
          if (s.gameTime >= g.releaseAt) {
            releaseGhostFromPen(g);
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

        if (atTileCenter(g.x, g.y)) {
          let target = posToTile(s.player.x, s.player.y);
          if (g.mode === 'frightened' && frightenedActive) {
            target = { col: COLS - 1 - target.col, row: ROWS - 1 - target.row };
          } else if (g.id === 'blinky') target = blinkyTarget(s.player);
          else if (g.id === 'pinky') target = pinkyTarget(s.player);
          else if (g.id === 'inky') target = inkyTarget(s.player, s.score, i);
          else target = clydeTarget(s.player, g);

          const fright = frightenedActive && g.mode === 'frightened';
          g.dir = chooseGhostDir(g, target, s.tiles, fright);
        }

        const speed = frightenedActive && g.mode === 'frightened' ? FRIGHTENED_SPEED : GHOST_SPEED;
        const gStep = moveEntity(g.x, g.y, g.dir, speed, s.tiles);
        g.x = gStep.x;
        g.y = gStep.y;
        g.dir = gStep.dir;

        if (!frightenedActive && g.mode === 'frightened') g.mode = 'chase';

        if (dist(g.x, g.y, s.player.x, s.player.y) < TILE * 0.55) {
          if (frightenedActive && g.mode === 'frightened') {
            g.mode = 'eaten';
            s.score += GHOST_SCORE;
            sounds.playEatGhost();
            setGameMsg(`${g.risk} neutralized (+${GHOST_SCORE})`);
          } else if (!pendingSecAuditRef.current && overlayRef.current === 'none') {
            pendingSecAuditRef.current = true;
            s.running = false;
            const q = pickSectionQuestion(s.section, s.score + s.lives * 17);
            pauseForQuestion('sec_audit', q, 'SEC Audit — Save Your Life!');
            pendingSecAuditRef.current = false;
          }
        }
      }

      if (dotsRemaining(s.tiles) === 0) {
        advanceSection(s);
      }

      s.frame += 1;
      if (bannerPendingRef.current && now - bannerFlushRef.current > 200) {
        bannerFlushRef.current = now;
        setFlashcardBanner(bannerPendingRef.current);
      }
      if (s.frame % 15 === 0) syncHud(s);

      drawMaze(ctx, s.tiles, s.frame);
      drawBull(ctx, s.player);
      for (const g of s.ghosts) {
        const fright = frightenedActive && g.mode === 'frightened';
        drawGhost(ctx, g, fright, Math.floor(s.frame / 8) % 2 === 0);
      }
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pauseForQuestion, advanceSection, syncHud, sounds]);

  return (
    <div className="page finman-page">
      <h1>FIN-MAN</h1>
      <p className="subtitle">Pac-Man meets SIE active recall — dodge market risks, eat pellets, pass checkpoints &amp; SEC audits.</p>

      <div className={`finman-container ${wrongBorder ? 'finman-wrong' : ''}`}>
        <div className="finman-hud">
          <span>Score: {hud.score}</span>
          <span>Lives: {hud.lives}</span>
          <span>Section {hud.section}: {hud.sectionName}</span>
        </div>

        <div id="flashcard-banner" className="finman-flashcard-banner" aria-live="polite">
          {flashcardBanner}
        </div>

        <div className="finman-stage">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="finman-canvas"
            tabIndex={0}
            aria-label="FIN-MAN maze game"
            onPointerDown={() => {
              sounds.unlock();
              canvasRef.current?.focus();
            }}
          />

          {overlay !== 'none' && activeQuestion && (
            <div className="finman-overlay" role="dialog" aria-modal="true">
              <div className="finman-modal card">
                <h2>{overlayTitle}</h2>
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
                    <p className="finman-read-timer">Take your time — click Continue when you&apos;re ready.</p>
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

          {endPhase !== 'none' && overlay === 'none' && (
            <div className="finman-end-overlay">
              <p>{gameMsg}</p>
              <button type="button" className="btn btn-primary" onClick={startGame}>Play Again</button>
            </div>
          )}
        </div>

        {statusMsg && !wrongReview && <p className="finman-status">{statusMsg}</p>}
        {gameMsg && <p className="finman-feedback">{gameMsg}</p>}
      </div>

      <div className="card finman-legend">
        <p><strong>Ghosts:</strong> 🔴 Inflation (direct chase) · 🩷 Interest Rate (intercept) · 🩵 Liquidity (corner patrol when ahead) · 🟠 Regulatory (chaotic) — eaten ghosts wait in the pen ~1.4s before re-entering.</p>
        <p><strong>Checkpoints:</strong> {countCheckpoints()} gold gateways per section trigger unique SIE questions.</p>
        <p><strong>Controls:</strong> Arrow keys or WASD to move the Bull 🐂 · Power pellets turn ghosts vulnerable · Checkpoints &amp; SEC audits pause for MCQs.</p>
        <p><strong>Sound:</strong> Classic arcade waka-waka, power pellet, ghost, and death effects — click the maze or press a key once to enable audio.</p>
        <button type="button" className="btn" onClick={startGame}>New Game</button>
      </div>
    </div>
  );
}