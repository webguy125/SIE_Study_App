/**
 * Compliance Defender — Williams Defender (1981) homage
 * Pure TypeScript + Canvas. No external dependencies.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

interface IShip {
  x: number;
  y: number;
  lives: number;
  score: number;
}

type LanderPhase = 'hunt' | 'beam' | 'ascend';
type EnemyKind = 'lander' | 'mutant' | 'bomber';

interface Enemy {
  id: string;
  kind: EnemyKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: LanderPhase;
  targetHumanId: string | null;
  carryingHuman: boolean;
  beamTimer: number;
  bombTimer: number;
}

interface Human {
  id: string;
  x: number;
  y: number;
  onGround: boolean;
  walkDir: number;
}

interface FallingHuman {
  id: string;
  x: number;
  y: number;
  vy: number;
}

interface Bullet {
  id: string;
  x: number;
  y: number;
  vx: number;
  fromPlayer: boolean;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

type GamePhase = 'playing' | 'game_over' | 'paused_start';

// ─── Constants (tuned to original feel) ────────────────────────────────────

const BUILD_VERSION = 25;

/** Playfield — classic 4:3 proportions scaled up */
const VIEW_W = 800;
const VIEW_H = 600;
const SCANNER_H = 36;
const PLAY_TOP = SCANNER_H + 4;
const GROUND_Y = VIEW_H - 14;
const SKY_MIN = PLAY_TOP + 8;

const WORLD_W = 3200;
const SHIP_ACCEL = 720;
const SHIP_MAX_SPEED = 380;
const SHIP_DRAG = 0.93;
const LANDER_SPEED = 26;
const LANDER_ASCEND_MULT = 0.55;
const MUTANT_MAX_SPEED = 68;
const MUTANT_ACCEL = 85;
const MUTANT_DRAG = 0.94;
const MUTANT_WARMUP_S = 2.2;
const BOMBER_SPEED = 42;
const MINE_FALL_SPEED = 85;
const BULLET_SPEED = 680;
const FIRE_INTERVAL_MS = 130;
const BEAM_DURATION_S = 3.5;
const MAX_BEAM_ASCEND_LANDERS = 1;
const HUMAN_COUNT = 10;
const START_LANDERS = 3;
const START_BOMBERS = 1;
const SMART_BOMBS_START = 3;
const EXTRA_LIFE_SCORE = 10000;
const INVULN_MS = 2600;
const PLANET_RESTORE_KILLS = 6;
const PLANET_DESTROYED_MUTANTS = 3;

const C = {
  bg: '#000000',
  terrain: '#39ff14',
  ship: '#ffffff',
  lander: '#39ff14',
  mutant: '#ff4444',
  bomber: '#66ccff',
  human: '#ff66cc',
  laser: '#ffffff',
  bomb: '#ffaa00',
  scannerBorder: '#aaaaaa',
  starDim: '#333333',
  starBright: '#cccccc',
};

// ─── Utilities ─────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function wrapX(x: number): number {
  return ((x % WORLD_W) + WORLD_W) % WORLD_W;
}

function worldDelta(ax: number, bx: number): number {
  const d = bx - ax;
  if (d > WORLD_W / 2) return d - WORLD_W;
  if (d < -WORLD_W / 2) return d + WORLD_W;
  return d;
}

function worldToScreenX(wx: number, cameraX: number): number {
  const cam = wrapX(cameraX);
  let sx = wrapX(wx) - cam;
  if (sx < -WORLD_W / 2) sx += WORLD_W;
  if (sx > WORLD_W / 2) sx -= WORLD_W;
  return sx;
}

// ─── UI shell ────────────────────────────────────────────────────────────────

class GameUI {
  private startOverlay: HTMLElement;
  private gameOverOverlay: HTMLElement;
  onStart: (() => void) | null = null;
  onRestart: (() => void) | null = null;
  onFire: (() => void) | null = null;
  onSmartBomb: (() => void) | null = null;
  onHyperspace: (() => void) | null = null;

  constructor(root: HTMLElement) {
    this.startOverlay = root.querySelector('#start-overlay') as HTMLElement;
    this.gameOverOverlay = root.querySelector('#game-over-overlay') as HTMLElement;
    (root.querySelector('#btn-start') as HTMLButtonElement).addEventListener('click', () => this.onStart?.());
    (root.querySelector('#btn-restart') as HTMLButtonElement).addEventListener('click', () => this.onRestart?.());
    (root.querySelector('#btn-fire') as HTMLButtonElement | null)?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.onFire?.();
    });
    (root.querySelector('#btn-bomb') as HTMLButtonElement | null)?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.onSmartBomb?.();
    });
    (root.querySelector('#btn-hyperspace') as HTMLButtonElement | null)?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.onHyperspace?.();
    });
  }

  bindStart(cb: () => void): void { this.onStart = cb; }
  bindRestart(cb: () => void): void { this.onRestart = cb; }

  showStart(show: boolean): void {
    this.startOverlay.classList.toggle('hidden', !show);
  }

  showGameOver(show: boolean, score: number): void {
    const el = this.gameOverOverlay.querySelector('#final-score') as HTMLElement;
    el.textContent = String(score);
    this.gameOverOverlay.classList.toggle('hidden', !show);
  }
}

// ─── Game ────────────────────────────────────────────────────────────────────

class ComplianceDefenderGame {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private ui: GameUI;

  private ship = { x: WORLD_W / 2, y: GROUND_Y - 48, vx: 0, vy: 0, lives: 3, score: 0, facing: 1 };
  private enemies: Enemy[] = [];
  private humans: Human[] = [];
  private falling: FallingHuman[] = [];
  private bullets: Bullet[] = [];
  private particles: Particle[] = [];
  private stars: { x: number; y: number; speed: number; bright: boolean }[] = [];

  private cameraX = WORLD_W / 2 - VIEW_W / 2;
  private phase: GamePhase = 'paused_start';
  private lastTime = 0;
  private lastFireAt = 0;
  private invulnUntil = 0;
  private smartBombs = SMART_BOMBS_START;
  private planetDestroyed = false;
  private planetRestoreKills = 0;
  private wave = 1;
  private highScore = 0;
  private thrustUp = false;
  private thrustDown = false;
  private thrustLeft = false;
  private thrustRight = false;
  private frame = 0;

  constructor(canvas: HTMLCanvasElement, ui: GameUI) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D unavailable');
    this.ctx = ctx;
    this.canvas = canvas;
    this.ui = ui;

    ui.bindStart(() => this.startGame());
    ui.bindRestart(() => this.startGame());
    ui.onFire = () => this.fire();
    ui.onSmartBomb = () => this.smartBomb();
    ui.onHyperspace = () => this.hyperspace();

    const kd = (e: KeyboardEvent) => this.onKeyDown(e);
    const ku = (e: KeyboardEvent) => this.onKeyUp(e);
    const opts: AddEventListenerOptions = { capture: true };
    window.addEventListener('keydown', kd, opts);
    window.addEventListener('keyup', ku, opts);
    document.addEventListener('keydown', kd, opts);
    document.addEventListener('keyup', ku, opts);
    canvas.tabIndex = 0;
    canvas.addEventListener('pointerdown', () => canvas.focus());
    this.bindTouchPad();

    this.initStars();
    this.ui.showStart(true);
    requestAnimationFrame((t) => this.loop(t));
  }

  private initStars(): void {
    this.stars = [];
    for (let i = 0; i < 120; i++) {
      this.stars.push({
        x: Math.random() * VIEW_W,
        y: PLAY_TOP + Math.random() * (GROUND_Y - PLAY_TOP - 10),
        speed: 0.15 + Math.random() * 0.5,
        bright: Math.random() < 0.25,
      });
    }
  }

  private initHumans(): void {
    this.humans = [];
    for (let i = 0; i < HUMAN_COUNT; i++) {
      this.humans.push({
        id: uid(),
        x: (WORLD_W / HUMAN_COUNT) * i + WORLD_W / (HUMAN_COUNT * 2),
        y: GROUND_Y - 2,
        onGround: true,
        walkDir: Math.random() < 0.5 ? -1 : 1,
      });
    }
  }

  private spawnWave(): void {
    this.enemies = [];
    const landerCount = START_LANDERS + Math.floor((this.wave - 1) / 2);
    const bomberCount = START_BOMBERS + Math.floor((this.wave - 1) / 4);
    for (let i = 0; i < landerCount; i++) {
      this.enemies.push(this.makeLander(wrapX(Math.random() * WORLD_W)));
    }
    for (let i = 0; i < bomberCount; i++) {
      this.enemies.push(this.makeBomber(wrapX(Math.random() * WORLD_W)));
    }
  }

  private makeLander(x: number): Enemy {
    return {
      id: uid(),
      kind: 'lander',
      x,
      y: PLAY_TOP + 20 + Math.random() * 80,
      vx: 0,
      vy: 0,
      phase: 'hunt',
      targetHumanId: null,
      carryingHuman: false,
      beamTimer: 0,
      bombTimer: 0,
    };
  }

  private makeBomber(x: number): Enemy {
    return {
      id: uid(),
      kind: 'bomber',
      x,
      y: PLAY_TOP + 30 + Math.random() * 60,
      vx: Math.random() < 0.5 ? -BOMBER_SPEED : BOMBER_SPEED,
      vy: 0,
      phase: 'hunt',
      targetHumanId: null,
      carryingHuman: false,
      beamTimer: 0,
      bombTimer: 1.5 + Math.random() * 2,
    };
  }

  private startGame(): void {
    this.ship = { x: WORLD_W / 2, y: GROUND_Y - 48, vx: 0, vy: 0, lives: 3, score: 0, facing: 1 };
    this.bullets = [];
    this.particles = [];
    this.falling = [];
    this.smartBombs = SMART_BOMBS_START;
    this.planetDestroyed = false;
    this.planetRestoreKills = 0;
    this.wave = 1;
    this.invulnUntil = 0;
    this.phase = 'playing';
    this.cameraX = WORLD_W / 2 - VIEW_W / 2;
    this.initHumans();
    this.spawnWave();
    this.canvas.focus();
    this.ui.showStart(false);
    this.ui.showGameOver(false, 0);
  }

  private humansAlive(): number {
    return this.humans.filter((h) => h.onGround).length;
  }

  private bindTouchPad(): void {
    const bind = (id: string, key: 'up' | 'down' | 'left' | 'right') => {
      const el = document.getElementById(id);
      if (!el) return;
      const press = (e: Event) => {
        e.preventDefault();
        if (key === 'up') this.thrustUp = true;
        if (key === 'down') this.thrustDown = true;
        if (key === 'left') this.thrustLeft = true;
        if (key === 'right') this.thrustRight = true;
      };
      const release = () => {
        if (key === 'up') this.thrustUp = false;
        if (key === 'down') this.thrustDown = false;
        if (key === 'left') this.thrustLeft = false;
        if (key === 'right') this.thrustRight = false;
      };
      el.addEventListener('pointerdown', press);
      el.addEventListener('pointerup', release);
      el.addEventListener('pointerleave', release);
    };
    bind('pad-up', 'up');
    bind('pad-down', 'down');
    bind('pad-left', 'left');
    bind('pad-right', 'right');
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      e.stopImmediatePropagation();
      this.fire();
      return;
    }
    if (e.code === 'KeyB' || e.key === 'b' || e.key === 'B') {
      e.preventDefault();
      this.smartBomb();
      return;
    }
    if (e.code === 'KeyH' || e.key === 'h' || e.key === 'H') {
      e.preventDefault();
      this.hyperspace();
      return;
    }
    if (e.code === 'ArrowUp') { e.preventDefault(); this.thrustUp = true; }
    if (e.code === 'ArrowDown') { e.preventDefault(); this.thrustDown = true; }
    if (e.code === 'ArrowLeft') { e.preventDefault(); this.thrustLeft = true; }
    if (e.code === 'ArrowRight') { e.preventDefault(); this.thrustRight = true; }
  }

  private onKeyUp(e: KeyboardEvent): void {
    if (e.code === 'ArrowUp') this.thrustUp = false;
    if (e.code === 'ArrowDown') this.thrustDown = false;
    if (e.code === 'ArrowLeft') this.thrustLeft = false;
    if (e.code === 'ArrowRight') this.thrustRight = false;
  }

  private fire(): void {
    if (this.phase !== 'playing') return;
    const now = performance.now();
    if (now - this.lastFireAt < FIRE_INTERVAL_MS) return;
    this.lastFireAt = now;
    this.bullets.push({
      id: uid(),
      x: wrapX(this.ship.x + this.ship.facing * 10),
      y: this.ship.y,
      vx: this.ship.facing * BULLET_SPEED,
      fromPlayer: true,
    });
  }

  private smartBomb(): void {
    if (this.phase !== 'playing' || this.smartBombs <= 0) return;
    this.smartBombs--;
    const now = performance.now();
    for (const e of [...this.enemies]) {
      const sx = worldToScreenX(e.x, this.cameraX);
      if (sx < -20 || sx > VIEW_W + 20) continue;
      this.destroyEnemy(e, now, true);
    }
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        id: uid(),
        x: this.ship.x + (Math.random() - 0.5) * VIEW_W * 0.8,
        y: this.ship.y + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 200,
        vy: (Math.random() - 0.5) * 200,
        life: 0.4 + Math.random() * 0.3,
        color: i % 2 ? '#ffaa00' : '#ffff66',
      });
    }
  }

  private hyperspace(): void {
    if (this.phase !== 'playing') return;
    const now = performance.now();
    this.ship.x = wrapX(Math.random() * WORLD_W);
    this.ship.y = SKY_MIN + 20 + Math.random() * (GROUND_Y - SKY_MIN - 40);
    this.ship.vx = 0;
    this.ship.vy = 0;
    if (Math.random() < 0.12) {
      this.loseLife(now);
    } else {
      this.invulnUntil = now + 800;
      for (let i = 0; i < 12; i++) {
        this.particles.push({
          id: uid(), x: this.ship.x, y: this.ship.y,
          vx: (Math.random() - 0.5) * 300, vy: (Math.random() - 0.5) * 300,
          life: 0.35, color: '#88ccff',
        });
      }
    }
  }

  private addScore(pts: number): void {
    const prev = Math.floor(this.ship.score / EXTRA_LIFE_SCORE);
    this.ship.score += pts;
    const next = Math.floor(this.ship.score / EXTRA_LIFE_SCORE);
    const gained = next - prev;
    if (gained > 0) {
      this.ship.lives += gained;
      this.smartBombs += gained;
    }
    if (this.ship.score > this.highScore) this.highScore = this.ship.score;
  }

  private burst(x: number, y: number, color: string, count = 14): void {
    for (let i = 0; i < count; i++) {
      const a = (Math.PI * 2 * i) / count;
      this.particles.push({
        id: uid(), x, y,
        vx: Math.cos(a) * (60 + Math.random() * 120),
        vy: Math.sin(a) * (60 + Math.random() * 120),
        life: 0.35 + Math.random() * 0.25,
        color,
      });
    }
  }

  private destroyEnemy(e: Enemy, _now: number, silent = false): void {
    const pts = e.kind === 'mutant' ? 300 : e.kind === 'bomber' ? 250 : 150;
    this.addScore(pts);
    this.burst(e.x, e.y, e.kind === 'mutant' ? '#ff6644' : '#66ff44');

    if (e.carryingHuman && e.targetHumanId) {
      const h = this.humans.find((human) => human.id === e.targetHumanId);
      if (h) {
        this.falling.push({ id: h.id, x: e.x, y: e.y + 8, vy: 0 });
        h.onGround = false;
      }
    }

    this.enemies = this.enemies.filter((en) => en.id !== e.id);

    if (this.planetDestroyed) {
      this.planetRestoreKills++;
      if (this.planetRestoreKills >= PLANET_RESTORE_KILLS) {
        this.planetDestroyed = false;
        this.planetRestoreKills = 0;
        this.initHumans();
        this.spawnWave();
      }
    } else if (this.enemies.length === 0 && !silent) {
      this.wave++;
      this.addScore(500);
      this.spawnWave();
    }
  }

  private loseLife(now: number): void {
    this.ship.lives--;
    this.invulnUntil = now + INVULN_MS;
    this.burst(this.ship.x, this.ship.y, '#ffffff', 20);
    if (this.ship.lives <= 0) {
      this.phase = 'game_over';
      this.ui.showGameOver(true, this.ship.score);
    }
  }

  private screenPos(wx: number, wy: number): { x: number; y: number; vis: boolean } {
    const x = worldToScreenX(wx, this.cameraX);
    return { x, y: wy, vis: x > -40 && x < VIEW_W + 40 };
  }

  private updateShip(dt: number): void {
    if (this.thrustLeft) { this.ship.vx -= SHIP_ACCEL * dt; this.ship.facing = -1; }
    if (this.thrustRight) { this.ship.vx += SHIP_ACCEL * dt; this.ship.facing = 1; }
    if (this.thrustUp) this.ship.vy -= SHIP_ACCEL * dt;
    if (this.thrustDown) this.ship.vy += SHIP_ACCEL * dt;

    this.ship.vx *= SHIP_DRAG;
    this.ship.vy *= SHIP_DRAG;
    const spd = Math.hypot(this.ship.vx, this.ship.vy);
    if (spd > SHIP_MAX_SPEED) {
      this.ship.vx = (this.ship.vx / spd) * SHIP_MAX_SPEED;
      this.ship.vy = (this.ship.vy / spd) * SHIP_MAX_SPEED;
    }

    this.ship.x = wrapX(this.ship.x + this.ship.vx * dt);
    this.ship.y += this.ship.vy * dt;
    this.ship.y = Math.max(SKY_MIN, Math.min(GROUND_Y - 10, this.ship.y));

    const margin = 120;
    const sx = worldToScreenX(this.ship.x, this.cameraX);
    if (sx < margin) this.cameraX = wrapX(this.ship.x - margin);
    else if (sx > VIEW_W - margin) this.cameraX = wrapX(this.ship.x - (VIEW_W - margin));
  }

  private updateHumans(dt: number): void {
    for (const h of this.humans) {
      if (!h.onGround) continue;
      h.x = wrapX(h.x + h.walkDir * 18 * dt);
      if (Math.random() < 0.004) h.walkDir *= -1;
    }
  }

  private updateEnemies(dt: number, now: number): void {
    for (const e of this.enemies) {
      if (e.kind === 'bomber') {
        e.x = wrapX(e.x + e.vx * dt);
        e.bombTimer -= dt;
        if (e.bombTimer <= 0) {
          e.bombTimer = 2 + Math.random() * 2.5;
          this.bullets.push({
            id: uid(), x: e.x, y: e.y + 6, vx: 0, fromPlayer: false,
          });
        }
        continue;
      }

      if (e.kind === 'mutant') {
        let chase = 1;
        if (e.beamTimer > 0) {
          e.beamTimer -= dt;
          chase = 0.25;
        }
        const dx = worldDelta(e.x, this.ship.x);
        const dy = this.ship.y - e.y;
        const len = Math.hypot(dx, dy) || 1;
        const wantVx = (dx / len) * MUTANT_MAX_SPEED * chase;
        const wantVy = (dy / len) * MUTANT_MAX_SPEED * chase;
        const steer = MUTANT_ACCEL * dt;
        e.vx += Math.max(-steer, Math.min(steer, wantVx - e.vx));
        e.vy += Math.max(-steer, Math.min(steer, wantVy - e.vy));
        e.vx *= MUTANT_DRAG;
        e.vy *= MUTANT_DRAG;
        const spd = Math.hypot(e.vx, e.vy);
        if (spd > MUTANT_MAX_SPEED) {
          e.vx = (e.vx / spd) * MUTANT_MAX_SPEED;
          e.vy = (e.vy / spd) * MUTANT_MAX_SPEED;
        }
        e.x = wrapX(e.x + e.vx * dt);
        e.y += e.vy * dt;
        e.y = Math.max(PLAY_TOP + 4, Math.min(GROUND_Y - 20, e.y));
        continue;
      }

      // Lander
      if (e.phase === 'hunt') {
        const activeAbductors = this.enemies.filter(
          (en) => en.kind === 'lander' && (en.phase === 'beam' || en.phase === 'ascend'),
        ).length;
        const target = this.nearestHuman(e.x, activeAbductors >= MAX_BEAM_ASCEND_LANDERS);
        if (target) {
          e.targetHumanId = target.id;
          const dy = target.y - 14 - e.y;
          const dx = worldDelta(e.x, target.x);
          const len = Math.hypot(dx, dy) || 1;
          e.x = wrapX(e.x + (dx / len) * LANDER_SPEED * dt);
          e.y += (dy / len) * LANDER_SPEED * dt;
          if (Math.abs(dy) < 10 && Math.abs(dx) < 14 && activeAbductors < MAX_BEAM_ASCEND_LANDERS) {
            e.phase = 'beam';
            e.beamTimer = BEAM_DURATION_S;
          }
        } else {
          e.x = wrapX(e.x + (Math.random() < 0.5 ? -1 : 1) * LANDER_SPEED * 0.35 * dt);
          e.y += Math.sin(this.frame * 0.02 + e.x * 0.01) * LANDER_SPEED * 0.15 * dt;
        }
      } else if (e.phase === 'beam') {
        e.beamTimer -= dt;
        if (e.beamTimer <= 0) {
          const h = this.humans.find((human) => human.id === e.targetHumanId);
          if (h?.onGround) {
            h.onGround = false;
            e.carryingHuman = true;
            e.phase = 'ascend';
          } else {
            e.phase = 'hunt';
          }
        }
      } else if (e.phase === 'ascend') {
        e.y -= LANDER_SPEED * LANDER_ASCEND_MULT * dt;
        const h = this.humans.find((human) => human.id === e.targetHumanId);
        if (h) h.y = e.y + 10;
        if (e.y <= PLAY_TOP + 4) {
          e.kind = 'mutant';
          e.carryingHuman = false;
          e.vx = (Math.random() - 0.5) * 30;
          e.vy = -18;
          e.beamTimer = MUTANT_WARMUP_S;
          if (h) h.onGround = false;
        }
      }
    }

    if (!this.planetDestroyed && this.humansAlive() === 0) {
      this.planetDestroyed = true;
      this.planetRestoreKills = 0;
      this.enemies = this.enemies.filter((en) => en.kind === 'mutant');
      for (let i = 0; i < PLANET_DESTROYED_MUTANTS; i++) {
        this.enemies.push({
          ...this.makeLander(wrapX(Math.random() * WORLD_W)),
          kind: 'mutant',
          y: PLAY_TOP + 40 + Math.random() * 120,
          vx: (Math.random() - 0.5) * 24,
          vy: 0,
          beamTimer: MUTANT_WARMUP_S + i * 0.8,
        });
      }
    }

    if (now >= this.invulnUntil) {
      for (const e of this.enemies) {
        const sp = this.screenPos(e.x, e.y);
        const ss = this.screenPos(this.ship.x, this.ship.y);
        const hitR = e.kind === 'mutant' ? 14 : e.kind === 'bomber' ? 12 : 11;
        if (Math.hypot(sp.x - ss.x, sp.y - ss.y) < hitR) {
          this.loseLife(now);
          return;
        }
      }
    }
  }

  private isHumanTargeted(humanId: string): boolean {
    return this.enemies.some(
      (e) => e.kind === 'lander'
        && (e.phase === 'beam' || e.phase === 'ascend')
        && e.targetHumanId === humanId,
    );
  }

  private nearestHuman(wx: number, allowClaimed = false): Human | null {
    let best: Human | null = null;
    let bestD = Infinity;
    for (const h of this.humans) {
      if (!h.onGround) continue;
      if (!allowClaimed && this.isHumanTargeted(h.id)) continue;
      const d = Math.abs(worldDelta(wx, h.x));
      if (d < bestD) { bestD = d; best = h; }
    }
    if (!best && !allowClaimed) return this.nearestHuman(wx, true);
    return best;
  }

  private updateFalling(dt: number, _now: number): void {
    const remaining: FallingHuman[] = [];
    for (const f of this.falling) {
      f.vy += 280 * dt;
      f.y += f.vy * dt;
      const ss = this.screenPos(this.ship.x, this.ship.y);
      const fs = this.screenPos(f.x, f.y);
      if (Math.hypot(ss.x - fs.x, ss.y - fs.y) < 18) {
        const h = this.humans.find((human) => human.id === f.id);
        if (h) {
          h.onGround = true;
          h.x = f.x;
          h.y = GROUND_Y - 2;
          this.addScore(500);
          this.burst(f.x, f.y, '#ff66cc', 8);
        }
        continue;
      }
      if (f.y >= GROUND_Y - 2) {
        this.burst(f.x, GROUND_Y, '#ff4444', 6);
        continue;
      }
      remaining.push(f);
    }
    this.falling = remaining;
  }

  private updateBullets(dt: number, now: number): void {
    const keep: Bullet[] = [];
    for (const b of this.bullets) {
      if (b.fromPlayer) {
        b.x = wrapX(b.x + b.vx * dt);
      } else {
        b.y += MINE_FALL_SPEED * dt;
      }
      const bs = this.screenPos(b.x, b.y);
      if (bs.y > GROUND_Y + 10 || (!bs.vis && b.fromPlayer)) continue;

      if (b.fromPlayer) {
        let hit = false;
        for (const e of this.enemies) {
          const es = this.screenPos(e.x, e.y);
          if (Math.hypot(bs.x - es.x, bs.y - es.y) < (e.kind === 'bomber' ? 16 : 12)) {
            this.destroyEnemy(e, now);
            hit = true;
            break;
          }
        }
        if (!hit) keep.push(b);
      } else {
        const ss = this.screenPos(this.ship.x, this.ship.y);
        if (now >= this.invulnUntil && Math.hypot(bs.x - ss.x, bs.y - ss.y) < 10) {
          this.loseLife(now);
        } else if (b.y < GROUND_Y + 20) {
          keep.push(b);
        }
      }
    }
    this.bullets = keep;
  }

  private updateParticles(dt: number): void {
    this.particles = this.particles
      .map((p) => ({ ...p, x: p.x + p.vx * dt, y: p.y + p.vy * dt, life: p.life - dt }))
      .filter((p) => p.life > 0);
  }

  private update(dt: number, now: number): void {
    this.frame++;
    this.updateShip(dt);
    this.updateHumans(dt);
    this.updateEnemies(dt, now);
    this.updateFalling(dt, now);
    this.updateBullets(dt, now);
    this.updateParticles(dt);
  }

  // ─── Drawing (pixel-art style) ─────────────────────────────────────────────

  private drawShip(x: number, y: number, blink: boolean): void {
    if (blink) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(this.ship.facing, 1);
    ctx.fillStyle = C.ship;
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-8, -5);
    ctx.lineTo(-6, 0);
    ctx.lineTo(-8, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  private drawLander(x: number, y: number): void {
    const ctx = this.ctx;
    ctx.fillStyle = C.lander;
    ctx.fillRect(x - 5, y - 3, 10, 6);
    ctx.fillRect(x - 7, y + 2, 3, 4);
    ctx.fillRect(x + 4, y + 2, 3, 4);
    ctx.fillRect(x - 2, y - 6, 4, 3);
  }

  private drawMutant(x: number, y: number): void {
    const ctx = this.ctx;
    ctx.fillStyle = C.mutant;
    ctx.beginPath();
    ctx.moveTo(x, y - 8);
    ctx.lineTo(x - 9, y + 6);
    ctx.lineTo(x + 9, y + 6);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x - 3, y - 2, 6, 4);
  }

  private drawBomber(x: number, y: number, vx: number): void {
    const ctx = this.ctx;
    ctx.fillStyle = C.bomber;
    const dir = vx > 0 ? 1 : -1;
    ctx.fillRect(x - 6 * dir, y - 2, 12 * dir, 4);
    ctx.fillRect(x - 2, y - 5, 4, 3);
  }

  private drawHuman(x: number, y: number): void {
    const ctx = this.ctx;
    ctx.fillStyle = C.human;
    ctx.fillRect(x - 1, y - 8, 2, 5);
    ctx.fillRect(x - 3, y - 3, 6, 2);
    ctx.fillRect(x - 3, y - 1, 2, 3);
    ctx.fillRect(x + 1, y - 1, 2, 3);
  }

  private drawScanner(): void {
    const ctx = this.ctx;
    const rx = VIEW_W / 2 - 180;
    const rw = 360;

    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, VIEW_W, SCANNER_H);
    ctx.strokeStyle = C.scannerBorder;
    ctx.strokeRect(rx, 4, rw, SCANNER_H - 8);

    const scale = rw / WORLD_W;
    const mid = SCANNER_H / 2 + 2;

    for (const h of this.humans) {
      if (!h.onGround) continue;
      ctx.fillStyle = C.human;
      ctx.fillRect(rx + wrapX(h.x) * scale, mid, 2, 2);
    }
    for (const e of this.enemies) {
      ctx.fillStyle = e.kind === 'mutant' ? C.mutant : e.kind === 'bomber' ? C.bomber : C.lander;
      const py = mid - 4 + (e.y / VIEW_H) * 8;
      ctx.fillRect(rx + wrapX(e.x) * scale, py, 2, 2);
    }
    ctx.fillStyle = C.ship;
    ctx.fillRect(rx + wrapX(this.ship.x) * scale, mid - 3 + (this.ship.y / VIEW_H) * 6, 3, 2);

    ctx.fillStyle = C.ship;
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText(`SCORE ${String(this.ship.score).padStart(6, '0')}`, 8, 22);
    ctx.fillText(`HI ${String(this.highScore).padStart(6, '0')}`, VIEW_W / 2 - 50, 22);

    ctx.textAlign = 'right';
    let lx = VIEW_W - 8;
    for (let i = 0; i < this.ship.lives; i++) {
      this.drawShip(lx, 18, false);
      lx -= 18;
    }
    ctx.textAlign = 'left';

    ctx.fillStyle = '#ffaa00';
    ctx.font = '12px "Courier New", monospace';
    ctx.fillText(`BOMBS ${this.smartBombs}`, VIEW_W - 90, SCANNER_H - 2);
  }

  private drawTerrain(): void {
    const ctx = this.ctx;
    ctx.strokeStyle = this.planetDestroyed ? '#ff2222' : C.terrain;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let sx = 0; sx <= VIEW_W; sx++) {
      const wx = wrapX(this.cameraX + sx);
      const h = 3 + Math.abs(Math.sin(wx * 0.018) * 4 + Math.sin(wx * 0.07) * 2);
      ctx.lineTo(sx, GROUND_Y - h);
    }
    ctx.stroke();
  }

  private render(now: number): void {
    const ctx = this.ctx;
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    this.drawScanner();

    for (const s of this.stars) {
      const sx = ((s.x - this.cameraX * s.speed * 0.02) % VIEW_W + VIEW_W) % VIEW_W;
      ctx.fillStyle = s.bright ? C.starBright : C.starDim;
      ctx.fillRect(sx, s.y, s.bright ? 2 : 1, s.bright ? 2 : 1);
    }

    this.drawTerrain();

    for (const h of this.humans) {
      if (!h.onGround) continue;
      const p = this.screenPos(h.x, h.y);
      if (!p.vis) continue;
      this.drawHuman(p.x, p.y);
    }

    for (const f of this.falling) {
      const p = this.screenPos(f.x, f.y);
      if (p.vis) this.drawHuman(p.x, p.y);
    }

    for (const e of this.enemies) {
      const p = this.screenPos(e.x, e.y);
      if (!p.vis) continue;
      if (e.kind === 'mutant') this.drawMutant(p.x, p.y);
      else if (e.kind === 'bomber') this.drawBomber(p.x, p.y, e.vx);
      else {
        this.drawLander(p.x, p.y);
        if (e.phase === 'beam' && e.targetHumanId) {
          const h = this.humans.find((human) => human.id === e.targetHumanId);
          if (h) {
            const hp = this.screenPos(h.x, h.y);
            ctx.strokeStyle = 'rgba(57,255,20,0.5)';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y + 4);
            ctx.lineTo(hp.x, hp.y - 4);
            ctx.stroke();
          }
        }
        if (e.carryingHuman) {
          this.drawHuman(p.x, p.y + 10);
        }
      }
    }

    for (const b of this.bullets) {
      const p = this.screenPos(b.x, b.y);
      if (!p.vis) continue;
      ctx.fillStyle = b.fromPlayer ? C.laser : C.bomb;
      if (b.fromPlayer) {
        ctx.fillRect(p.x - 3, p.y, 6, 1);
      } else {
        ctx.fillRect(p.x - 1, p.y - 1, 3, 3);
      }
    }

    for (const p of this.particles) {
      const sp = this.screenPos(p.x, p.y);
      if (!sp.vis) continue;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life * 2;
      ctx.fillRect(sp.x, sp.y, 2, 2);
      ctx.globalAlpha = 1;
    }

    const blink = now < this.invulnUntil && Math.floor(now / 80) % 2 === 0;
    const ss = this.screenPos(this.ship.x, this.ship.y);
    this.drawShip(ss.x, ss.y, blink);

    // CRT scanlines
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    for (let y = PLAY_TOP; y < VIEW_H; y += 3) {
      ctx.fillRect(0, y, VIEW_W, 1);
    }

    if (this.planetDestroyed) {
      const flash = Math.floor(now / 400) % 2 === 0;
      ctx.fillStyle = flash ? '#ff2222' : '#aa1111';
      ctx.font = 'bold 16px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PLANET DESTROYED', VIEW_W / 2, PLAY_TOP + 28);
      ctx.textAlign = 'left';
    }

    ctx.fillStyle = '#333';
    ctx.font = '10px "Courier New", monospace';
    ctx.fillText(`WAVE ${this.wave}`, VIEW_W - 70, VIEW_H - 4);
    ctx.fillText(`BUILD ${BUILD_VERSION}`, 8, VIEW_H - 4);
  }

  private loop(ts: number): void {
    if (!this.lastTime) this.lastTime = ts;
    const dt = Math.min(0.05, (ts - this.lastTime) / 1000);
    this.lastTime = ts;
    if (this.phase === 'playing') this.update(dt, ts);
    this.render(ts);
    requestAnimationFrame((t) => this.loop(t));
  }
}

function boot(): void {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement | null;
  const root = document.getElementById('game-root');
  if (!canvas || !root) return;
  canvas.width = VIEW_W;
  canvas.height = VIEW_H;
  const tag = document.getElementById('html-build-tag');
  if (tag) tag.textContent = `(BUILD ${BUILD_VERSION})`;
  const ui = new GameUI(root);
  new ComplianceDefenderGame(canvas, ui);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}